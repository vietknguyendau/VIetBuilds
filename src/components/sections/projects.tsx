import { ArrowRight } from "lucide-react";
import { projectCategories, projects } from "@/content/projects";
import { ProjectGrid } from "../project-grid";
import { ButtonLink, Section, SectionHeading } from "../ui";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section id="projects" labelledBy="projects-title" className="border-t border-line bg-bg-muted/60">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured projects"
          title="Real applications, built from real ideas."
          intro="Each project started as a problem I wanted to solve or a concept I wanted to see exist. Here's how they came together."
        />
        <ButtonLink href="/projects" variant="ghost" className="self-start px-0 sm:self-auto">
          All projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </ButtonLink>
      </div>
      <div className="mt-12">
        <ProjectGrid projects={featured} categories={projectCategories} />
      </div>
    </Section>
  );
}
