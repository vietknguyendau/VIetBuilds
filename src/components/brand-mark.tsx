import Link from "next/link";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-[0.18em]", className)}
      aria-label={`${profile.name} — home`}
    >
      <span>{profile.brand.left}</span>
      <span className="text-accent-strong transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
        /
      </span>
      <span className="text-fg-muted transition-colors group-hover:text-fg">{profile.brand.right}</span>
    </Link>
  );
}
