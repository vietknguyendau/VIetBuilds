import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { Section, SectionHeading } from "@/components/ui";
import { projectCategories, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of applications Viet Nguyen-Dau has designed and built using AI-assisted development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeading
        id="projects-page-title"
        level={1}
        eyebrow="Projects"
        title={<span className="text-4xl sm:text-5xl">Ideas I&apos;ve turned into working software.</span>}
        intro="Every project here started with a real need or an original concept. Open any card for the full story — the problem, my role, how it came together, and what I learned."
      />
      <div className="mt-12">
        <ProjectGrid projects={projects} categories={projectCategories} />
      </div>
    </Section>
  );
}
