import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { Section, SectionIntro } from "@/components/ui";
import { projectCategories, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of applications Viet Nguyen-Dau has designed and built using AI-assisted development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Section>
      <SectionIntro
        id="projects-page-title"
        level={1}
        title="Ideas I've turned into working software"
        intro="Every project here started with a real need or an original concept. Open one for the problem, my role, how it came together, and what I learned."
      />
      <ProjectGrid projects={projects} categories={projectCategories} />
    </Section>
  );
}
