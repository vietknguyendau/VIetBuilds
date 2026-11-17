"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Filter = "All" | ProjectCategory;

/** Filterable project grid. Filters are real buttons with aria-pressed for screen readers. */
export function ProjectGrid({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                active
                  ? "border-fg bg-fg text-bg"
                  : "border-line bg-bg-elevated text-fg-muted hover:border-accent-strong/60 hover:text-fg",
              )}
            >
              {f}
              <span className={cn("ml-2 tabular-nums", active ? "opacity-70" : "text-fg-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.slug} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ProjectCard project={p} priority={i < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
