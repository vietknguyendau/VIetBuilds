"use client";

import { type InputHTMLAttributes, useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { type ContactFields, type ContactState, limits, projectTypes } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { buttonClass } from "./ui";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [renderedAt, setRenderedAt] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setRenderedAt(String(Date.now())), []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const errors = state.status === "error" ? state.errors ?? {} : {};
  const values: Partial<ContactFields> = state.status === "error" ? state.values ?? {} : {};

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-ink"
      >
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      {state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" maxLength={limits.name} error={errors.name} defaultValue={values.name} />
        <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={limits.email} error={errors.email} defaultValue={values.email} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" optional autoComplete="organization" maxLength={limits.company} error={errors.company} defaultValue={values.company} />
        <div>
          <label htmlFor="projectType" className="mb-2 block text-sm font-medium">
            Type of project
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue={values.projectType ?? ""}
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={inputClass(!!errors.projectType)}
          >
            <option value="" disabled>
              Select one…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id="projectType-error" error={errors.projectType} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Brief description
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={limits.minMessage}
          maxLength={limits.message}
          defaultValue={values.message}
          placeholder="What are you trying to solve, build, or improve?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(!!errors.message), "resize-y")}
        />
        <FieldError id="message-error" error={errors.message} />
      </div>

      {/* Spam protection: honeypot (hidden from people and assistive tech) + render timestamp */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={renderedAt} />

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full sm:w-auto")}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block w-full rounded-2xl border bg-page px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-3 transition-colors",
    "focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25",
    invalid ? "border-red-500/70" : "border-hair",
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
      {error}
    </p>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  ...props
}: {
  label: string;
  name: keyof ContactFields;
  error?: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-ink-3">(optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(!!error)}
        {...props}
      />
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}
