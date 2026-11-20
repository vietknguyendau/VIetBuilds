"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";
import { flushSync } from "react-dom";
import { withViewTransition } from "@/lib/view-transition";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./project-visual";
import { vtName, vtTitleStyle } from "@/lib/view-transition";

type Filter = "All" | ProjectCategory;

/**
 * Bento layout per number of visible projects. The first tile is the hero project.
 * Classes are written out in full so Tailwind can see them.
 */
const layouts: Record<number, string[]> = {
  1: ["sm:col-span-6 lg:col-span-12"],
  2: ["sm:col-span-3 lg:col-span-7", "sm:col-span-3 lg:col-span-5"],
  3: ["sm:col-span-6 lg:col-span-7 lg:row-span-2", "sm:col-span-3 lg:col-span-5", "sm:col-span-3 lg:col-span-5"],
  4: ["sm:col-span-6 lg:col-span-7 lg:row-span-2", "sm:col-span-3 lg:col-span-5", "sm:col-span-3 lg:col-span-5", "sm:col-span-6 lg:col-span-12"],
  5: [
    "sm:col-span-6 lg:col-span-7 lg:row-span-2",
    "sm:col-span-3 lg:col-span-5",
    "sm:col-span-3 lg:col-span-5",
    "sm:col-span-3 lg:col-span-6",
    "sm:col-span-3 lg:col-span-6",
  ],
};

export function ProjectGrid({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const spans = layouts[Math.min(visible.length, 5)] ?? layouts[5];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => withViewTransition(() => flushSync(() => setFilter(f)), "filter-vt")}
              className={cn(
                "rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
                active ? "bg-ink text-page" : "bg-tile-2 text-ink-2 hover:text-ink",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4 lg:auto-rows-[minmax(250px,auto)] lg:grid-cols-12">
        {visible.map((p, i) => (
          <li key={p.slug} className={cn("scroll-rise", spans[i % spans.length])}>
            <ProjectTile project={p} hero={i === 0 && visible.length >= 3} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectTile({ project, hero }: { project: Project; hero: boolean }) {
  const hasShot = !project.isPrivate && project.screenshots.length > 0;
  return (
    <article
      className={cn(
        "grain spotlight group relative flex h-full min-h-[320px] flex-col sm:min-h-[260px] overflow-hidden bg-tile p-6 transition-[background-color] duration-300 hover:bg-tile-2 sm:p-8",
        hero ? "rounded-tile-lg lg:min-h-[520px]" : "rounded-tile",
      )}
      // Shared names let this tile morph into the case-study page (and between filter layouts).
      style={{ viewTransitionName: vtName("project", project.slug) }}
    >
      <ProjectVisual
        project={project}
        className={
          hasShot
            ? cn("relative -mx-2 -mt-2 mb-6 flex-1 rounded-tile-sm border border-hair", hero ? "min-h-[300px]" : "min-h-[160px]")
            : "absolute inset-0"
        }
        priority={hero}
        sizes={hero ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 500px, 100vw"}
      />
      <div className="relative mt-auto max-w-[34ch]">
        <p className="text-sm font-medium text-ink-3">
          {project.category}
          {project.status && project.status !== "Private" ? <span className="text-signal"> / {project.status}</span> : null}
        </p>
        <h3
          style={vtTitleStyle(project.slug)}
          className={cn("mt-2 w-fit font-semibold text-balance", hero ? "text-[2.25rem] sm:text-[2.75rem]" : "text-2xl sm:text-[1.75rem]")}>
          {/* Stretched link: whole tile is clickable with a single tab stop */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.9875rem] leading-relaxed text-ink-2">{project.tagline}</p>
      </div>
    </article>
  );
}
