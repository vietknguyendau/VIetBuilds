import Link from "next/link";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-baseline gap-1 font-display text-lg font-semibold tracking-tight", className)}
      aria-label={`${profile.name} — home`}
    >
      <span>Viet</span>
      <span className="text-signal transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
        /
      </span>
      <span className="text-ink-2 transition-colors group-hover:text-ink">builds</span>
    </Link>
  );
}
