import { projectCategories, projects } from "@/content/projects";
import { ProjectGrid } from "../project-grid";
import { ButtonLink, Section, SectionIntro } from "../ui";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionIntro
        id="projects-title"
        title="Things I've built"
        intro="Each one started as a problem I wanted solved or an idea I wanted to see exist. Open any project for the full story."
        action={
          <ButtonLink href="/projects" variant="ghost">
            See all projects
          </ButtonLink>
        }
      />
      <ProjectGrid projects={featured} categories={projectCategories} />
    </Section>
  );
}
