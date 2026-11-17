"use server";

import { headers } from "next/headers";
import { type ContactFields, type ContactState, validateContact } from "@/lib/contact-schema";

/**
 * Contact form server action.
 *
 * Protection layers:
 *  1. Feature flag — does nothing unless CONTACT_FORM_ENABLED=true and Resend is configured.
 *  2. Honeypot field ("website") — bots fill it, humans never see it.
 *  3. Time trap — submissions faster than 3s after render are rejected.
 *  4. Rate limit — 3 submissions per IP per 10 minutes.
 *  5. Server-side validation of every field (client checks are just UX).
 *
 * NOTE on rate limiting: this in-memory limiter is per server instance. On Vercel that's a
 * reasonable first line of defense, but before heavy public traffic, swap it for a shared store
 * (e.g. Upstash Redis) or enable Vercel Firewall rate-limit rules. See README → "Contact form".
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // keep the map from growing unbounded
  if (hits.size > 5000) hits.clear();
  return false;
}

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: ContactFields = {
    name: str(formData.get("name")),
    email: str(formData.get("email")).toLowerCase(),
    company: str(formData.get("company")),
    projectType: str(formData.get("projectType")),
    message: str(formData.get("message")),
  };

  // Honeypot / time trap: pretend success so bots don't learn anything.
  const honeypot = str(formData.get("website"));
  const renderedAt = Number(str(formData.get("renderedAt")));
  if (honeypot || !renderedAt || Date.now() - renderedAt < MIN_FILL_MS) {
    return { status: "success", message: "Thanks — your message has been received." };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages recently. Please try again in a few minutes.",
      values,
    };
  }

  const enabled = process.env.CONTACT_FORM_ENABLED === "true";
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!enabled || !apiKey || !to || !from) {
    return {
      status: "error",
      message: "The contact form isn't accepting messages yet. Please reach out on LinkedIn instead.",
      values,
    };
  }

  // Plain-text email only: nothing the visitor typed is ever rendered as HTML.
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    `Project type: ${values.projectType}`,
    "",
    values.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `New inquiry: ${values.projectType} — ${values.name}`.slice(0, 200),
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Contact form: email provider returned", res.status);
      throw new Error("send failed");
    }
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or reach out on LinkedIn.",
      values,
    };
  }

  return { status: "success", message: "Thanks for reaching out — I'll get back to you soon." };
}
