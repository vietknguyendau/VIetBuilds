import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { Badge } from "./ui";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated transition-all duration-300 hover:-translate-y-1 hover:border-accent-strong/50 hover:shadow-[0_24px_60px_-30px_rgba(16,29,48,0.45)]">
      <ProjectVisual project={project} priority={priority} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{project.category}</Badge>
          {project.status ? <Badge tone="gold">{project.status}</Badge> : null}
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">
          {/* Stretched link makes the whole card clickable while keeping one tab stop */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-fg-muted">{project.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read case study
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
