import Image from "next/image";
import { Dumbbell, Flag, HeartPulse, Lock, Trophy, Users } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export const projectIcons = {
  trophy: Trophy,
  dumbbell: Dumbbell,
  flag: Flag,
  users: Users,
  heart: HeartPulse,
} as const;

/** Leagues read warm (amber), health reads fresh green (moss). */
export function categoryHue(project: Project) {
  return project.category === "Leagues & Competition" ? "var(--color-amber-400)" : "var(--color-moss)";
}

/**
 * Project artwork. Uses the first screenshot when one exists; otherwise an oversized,
 * cropped line icon in the category hue (never fake UI with invented data).
 */
export function ProjectVisual({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 700px, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const shot = !project.isPrivate ? project.screenshots[0] : undefined;
  const Icon = projectIcons[project.icon];

  if (shot) {
    return (
      <div className={cn("overflow-hidden", className ?? "relative")}>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none overflow-hidden", className ?? "relative")} aria-hidden="true">
      <div
        className="absolute -right-[12%] -top-[20%] aspect-square h-[100%] rounded-full opacity-15 blur-3xl"
        style={{ background: categoryHue(project) }}
      />
      <Icon
        className="absolute -right-[6%] -top-[10%] h-[46%] max-h-[340px] sm:-top-[14%] sm:h-[78%] w-auto opacity-35 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-[1.04]"
        strokeWidth={0.9}
        style={{ color: categoryHue(project) }}
      />
      {project.isPrivate ? (
        <span className="absolute left-6 top-6 flex sm:left-8 sm:top-8 items-center gap-1.5 rounded-full bg-ink/10 px-2.5 py-1 text-xs font-medium text-ink-2">
          <Lock className="size-3" /> Private
        </span>
      ) : null}
    </div>
  );
}
