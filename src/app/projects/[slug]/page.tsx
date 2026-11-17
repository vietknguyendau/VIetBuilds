import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubIcon } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { Bento, ButtonLink, Container, Tile, Todo } from "@/components/ui";
import { getProject, projects } from "@/content/projects";
import { isPublicUrl } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.tagline, url: `/projects/${project.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const showLinks = !project.isPrivate;
  const live = showLinks && isPublicUrl(project.liveUrl) ? project.liveUrl : "";
  const repo = showLinks && isPublicUrl(project.repoUrl) ? project.repoUrl : "";
  const hasLessons = project.challenges.length > 0 || project.lessons.length > 0;

  return (
    <article className="pt-3 sm:pt-4">
      <Container>
        <Bento>
          {/* Title tile */}
          <Tile size="lg" className="flex min-h-[420px] flex-col justify-between gap-10 sm:col-span-6 lg:col-span-8 lg:row-span-2 lg:p-12" animate index={0}>
            <Link href="/projects" className="group inline-flex items-center gap-2 self-start text-[0.9375rem] text-ink-2 hover:text-ink">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> All projects
            </Link>
            <div>
              <p className="text-ink-3">{project.category}</p>
              <h1 className="mt-3 text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.025em] text-balance">
                {project.title}
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-2 text-pretty">{project.tagline}</p>
              {live || repo ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {live ? (
                    <ButtonLink href={live} external>
                      Open the live app <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </ButtonLink>
                  ) : null}
                  {repo ? (
                    <ButtonLink href={repo} external variant="secondary">
                      <GitHubIcon className="size-4" /> View the code
                      <span className="sr-only">(opens in a new tab)</span>
                    </ButtonLink>
                  ) : null}
                </div>
              ) : showLinks ? (
                <div className="mt-6 max-w-md">
                  <Todo>add liveUrl / repoUrl (public only) in src/content/projects.ts</Todo>
                </div>
              ) : null}
            </div>
          </Tile>

          {/* Art + facts */}
          <Tile tone="deep" className="min-h-[260px] sm:col-span-3 lg:col-span-4" animate index={1}>
            <ProjectVisual project={project} className="absolute inset-0" priority />
          </Tile>
          <Tile className="sm:col-span-3 lg:col-span-4" animate index={2}>
            <dl className="space-y-5">
              <Fact label="Status">{project.status || "Built"}</Fact>
              <Fact label="My role">Concept, design, and AI-assisted build</Fact>
              {project.technologies.length > 0 ? (
                <Fact label="Built with">{project.technologies.join(", ")}</Fact>
              ) : (
                <Todo>add verified `technologies`</Todo>
              )}
            </dl>
          </Tile>
        </Bento>

        {/* Story */}
        <Bento className="mt-3 sm:mt-4">
          <StoryTile title="Overview" className="sm:col-span-6 lg:col-span-7">
            <p>{project.overview}</p>
          </StoryTile>
          <StoryTile title="The problem or original concept" className="sm:col-span-6 lg:col-span-5">
            <p>{project.problem}</p>
          </StoryTile>
          <StoryTile title="My role" className="sm:col-span-6 lg:col-span-5">
            <p>{project.role}</p>
          </StoryTile>
          <StoryTile title="The solution" className="sm:col-span-6 lg:col-span-7">
            <p>{project.solution}</p>
            {project.features.length > 0 && !project.isPrivate ? (
              <>
                <h3 className="mt-7 text-lg font-semibold text-ink">Key features</h3>
                <List items={project.features} />
              </>
            ) : !project.isPrivate ? (
              <div className="mt-6">
                <Todo>list the app&apos;s real features in `features`</Todo>
              </div>
            ) : null}
          </StoryTile>
          <StoryTile title="What this project shows" className={hasLessons ? "sm:col-span-6 lg:col-span-6" : "sm:col-span-6 lg:col-span-12"}>
            <List items={project.focusAreas} />
          </StoryTile>
          {hasLessons ? (
            <StoryTile title="Challenges and lessons" className="sm:col-span-6 lg:col-span-6">
              {project.challenges.length > 0 ? <List items={project.challenges} /> : null}
              {project.lessons.length > 0 ? (
                <>
                  <h3 className="mt-7 text-lg font-semibold text-ink">What I learned</h3>
                  <List items={project.lessons} />
                </>
              ) : null}
            </StoryTile>
          ) : null}
        </Bento>
        {!hasLessons ? (
          <div className="mt-4">
            <Todo>add `challenges` and `lessons`; that tile appears once you do</Todo>
          </div>
        ) : null}

        {/* Screenshots / privacy */}
        <div className="mt-3 sm:mt-4">
          {project.isPrivate ? (
            <Tile tone="outline" className="flex items-start gap-3 text-ink-2">
              <Lock className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />
              <p className="max-w-[70ch]">{project.privacyNote}</p>
            </Tile>
          ) : project.screenshots.length > 0 ? (
            <Bento>
              {project.screenshots.map((s, i) => (
                <Tile
                  as="figure"
                  key={s.src}
                  className={i === 0 ? "p-3 sm:col-span-6 sm:p-3 lg:col-span-12" : "p-3 sm:col-span-3 sm:p-3 lg:col-span-6"}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes={i === 0 ? "(min-width: 1240px) 1200px, 100vw" : "(min-width: 1024px) 600px, 100vw"}
                    className="h-auto w-full rounded-tile-sm"
                  />
                  {s.caption ? <figcaption className="px-3 pb-2 pt-3 text-[0.9375rem] text-ink-2">{s.caption}</figcaption> : null}
                </Tile>
              ))}
            </Bento>
          ) : (
            <Todo>add screenshots to /public/images/projects/{project.slug}/ and list them in `screenshots`</Todo>
          )}
        </div>

        {/* Next */}
        <Link
          href={`/projects/${next.slug}`}
          className="grain group relative mt-16 flex flex-col gap-2 overflow-hidden rounded-tile-lg bg-tile p-8 transition-colors hover:bg-tile-2 sm:mt-24 sm:p-12"
        >
          <span className="text-ink-3">Next project</span>
          <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] transition-colors group-hover:text-signal">
            {next.title}
          </span>
        </Link>
      </Container>
    </article>
  );
}

function StoryTile({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <Tile as="section" className={className}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.75] text-ink-2">{children}</div>
    </Tile>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3">
      {items.map((item) => (
        <li key={item} className="border-t border-hair py-3 first:border-t-0">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-ink-3">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold tracking-tight">{children}</dd>
    </div>
  );
}
