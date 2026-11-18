import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn, isDev } from "@/lib/utils";

/* ---------- Layout ---------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-3 sm:px-5", className)}>{children}</div>;
}

/** A page band holding a bento grid. Sections sit close together; the tiles carry the rhythm. */
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
    <section id={id} aria-labelledby={labelledBy} className={cn("py-1.5 sm:py-2", className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Bento grid: 1 col on phones, 6 on tablets, 12 on desktop. */
export function Bento({ className, children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: "div" | "ul" | "ol" }) {
  return <Tag className={cn("grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-12", className)}>{children}</Tag>;
}

type Tone = "tile" | "deep" | "signal" | "outline" | "cream";

const tones: Record<Tone, string> = {
  tile: "bg-tile text-ink",
  deep: "bg-spruce-950 text-frost dark:bg-spruce-950",
  signal: "bg-signal-fill text-on-signal",
  outline: "border border-hair bg-transparent text-ink",
  /** Warm bone tile. Resets the text tokens locally so anything inside reads dark-on-cream in either theme. */
  cream: "tone-cream bg-cream text-ink",
};

/**
 * A bento tile. `size` sets the corner radius so hierarchy reads at a glance:
 * big tiles get softer corners, small tiles tighter ones.
 */
export function Tile({
  children,
  className,
  tone = "tile",
  size = "md",
  as: Tag = "div",
  index,
  animate,
  style,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  size?: "lg" | "md" | "sm";
  as?: "div" | "li" | "article" | "aside" | "figure" | "section";
  /** stagger index for the hero load animation */
  index?: number;
  animate?: boolean;
  style?: CSSProperties;
}) {
  const radius = size === "lg" ? "rounded-tile-lg" : size === "sm" ? "rounded-tile-sm" : "rounded-tile";
  return (
    <Tag
      className={cn("grain relative overflow-hidden p-6 sm:p-8", radius, tones[tone], animate && "tile-in", className)}
      style={{ ...(index !== undefined ? ({ "--i": index } as CSSProperties) : null), ...style }}
    >
      {children}
    </Tag>
  );
}

/** Section title tile content: a display heading plus a short line of context. */
export function TileHeading({
  id,
  title,
  intro,
  level = 2,
  className,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  level?: 1 | 2;
  className?: string;
}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <div className={className}>
      <H id={id} className="text-[2rem] font-semibold text-balance sm:text-[2.6rem]">
        {title}
      </H>
      {intro ? <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2 text-pretty">{intro}</p> : null}
    </div>
  );
}

/** Small descriptive label inside a tile (sentence case, quiet). */
export function TileLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm font-medium text-ink-3", className)}>{children}</p>;
}

/* ---------- Buttons ---------- */

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-signal-fill text-on-signal hover:brightness-105 active:translate-y-px",
  secondary: "border border-hair bg-tile-2/60 text-ink hover:border-signal active:translate-y-px",
  ghost: "text-ink-2 underline decoration-hair underline-offset-4 hover:text-ink hover:decoration-signal",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-semibold transition-[filter,border-color,color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  external,
  children,
  ...rest
}: { href: string; variant?: Variant; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(variant === "ghost" ? "inline-flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors" : base, variants[variant], className);
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

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "signal" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-medium",
        tone === "signal" ? "bg-signal-fill/15 text-signal" : "bg-tile-2 text-ink-2",
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
    <p className="rounded-lg border border-dashed border-signal/60 bg-signal-fill/5 px-3 py-2 text-xs text-signal">
      To do: {children}
    </p>
  );
}

/** Heading that sits on the page between bento bands, giving the grid room to breathe. */
export function SectionIntro({
  id,
  title,
  intro,
  action,
  level = 2,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  level?: 1 | 2;
}) {
  return (
    <div className="flex flex-col gap-5 px-1 pb-5 pt-16 sm:flex-row sm:items-end sm:justify-between sm:px-2 sm:pt-24">
      <TileHeading id={id} title={title} intro={intro} level={level} />
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
