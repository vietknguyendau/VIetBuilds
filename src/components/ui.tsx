import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn, isDev } from "@/lib/utils";

/* ---------- Layout ---------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent", className)}>
      <span className="h-px w-8 bg-accent-strong" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className,
  level = 2,
}: {
  level?: 1 | 2;
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <div className={cn("max-w-2xl", className)} data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H id={id} className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </H>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-fg-muted text-pretty">{intro}</p> : null}
    </div>
  );
}

/** Wrap anything to fade it up on scroll. `delay` in ms staggers siblings. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag data-reveal className={className} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/* ---------- Buttons ---------- */

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:shadow-[0_8px_30px_-8px_color-mix(in_srgb,var(--fg)_45%,transparent)] hover:-translate-y-0.5",
  secondary: "border border-line bg-bg-elevated text-fg hover:border-accent-strong hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  external,
  children,
  ...rest
}: { href: string; variant?: Variant; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(base, variants[variant], className);
  if (external || href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

/* ---------- Misc ---------- */

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "gold"
          ? "border-accent-strong/40 bg-accent-strong/10 text-accent"
          : "border-line bg-bg-muted text-fg-muted",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Editor hint for content that hasn't been filled in yet.
 * Visible ONLY in `npm run dev`. Renders nothing in production builds.
 */
export function Todo({ children }: { children: ReactNode }) {
  if (!isDev) return null;
  return (
    <p className="rounded-lg border border-dashed border-accent-strong/60 bg-accent-strong/5 px-3 py-2 font-mono text-xs text-accent">
      TODO · {children}
    </p>
  );
}
