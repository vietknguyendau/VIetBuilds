import Image from "next/image";
import { Dumbbell, Flag, HeartPulse, Lock, Trophy, Users } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

const icons = {
  trophy: Trophy,
  dumbbell: Dumbbell,
  flag: Flag,
  users: Users,
  heart: HeartPulse,
} as const;

/**
 * Cover visual for a project. Uses the first screenshot when available,
 * otherwise a branded abstract placeholder (never fake UI with invented data).
 */
export function ProjectVisual({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const shot = !project.isPrivate ? project.screenshots[0] : undefined;
  const Icon = icons[project.icon];

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-navy-900", className)}>
      {shot ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_85%_10%,var(--color-navy-600),transparent_60%)]" />
          <div className="bg-grid absolute inset-0 opacity-60 [--fg:#f8fafc]" />
          <div className="absolute -bottom-10 -right-10 size-56 rounded-full border border-gold-500/25" />
          <div className="absolute -bottom-20 -right-20 size-80 rounded-full border border-gold-500/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-gold-500/40 bg-navy-800/80 text-gold-400 shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
              <Icon className="size-7" strokeWidth={1.6} />
            </div>
          </div>
          {project.isPrivate ? (
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
              <Lock className="size-3" /> Private project
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
