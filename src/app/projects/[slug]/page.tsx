import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { Badge, ButtonLink, Container, Eyebrow, Todo } from "@/components/ui";
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

  return (
    <article>
      {/* Header */}
      <Container className="pt-10 sm:pt-14">
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> All projects
        </Link>

        <div className="mt-10 max-w-3xl animate-fade-up">
          <div className="flex flex-wrap gap-2">
            <Badge>{project.category}</Badge>
            {project.status ? (
              <Badge tone="gold">
                {project.isPrivate ? <Lock className="size-3" aria-hidden="true" /> : null}
                {project.status}
              </Badge>
            ) : null}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-fg-muted text-pretty">{project.tagline}</p>

          {live || repo ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {live ? (
                <ButtonLink href={live} external>
                  View live demo <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              ) : null}
              {repo ? (
                <ButtonLink href={repo} external variant="secondary">
                  <GitHubIcon className="size-4" /> Source code
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              ) : null}
            </div>
          ) : showLinks ? (
            <div className="mt-6 max-w-md">
              <Todo>Add liveUrl / repoUrl (public only) in src/content/projects.ts</Todo>
            </div>
          ) : null}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-line">
          <ProjectVisual project={project} priority sizes="(min-width: 1152px) 1088px, 100vw" className="aspect-[16/8]" />
        </div>
      </Container>

      {/* Body */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-20">
          <div className="space-y-14">
            <Block title="Overview">
              <p>{project.overview}</p>
            </Block>

            <Block title="The problem or original concept">
              <p>{project.problem}</p>
            </Block>

            <Block title="My role">
              <p>{project.role}</p>
            </Block>

            <Block title="The solution">
              <p>{project.solution}</p>
              {project.features.length > 0 && !project.isPrivate ? (
                <>
                  <h3 className="mt-8 text-base font-semibold text-fg">Key features</h3>
                  <List items={project.features} />
                </>
              ) : !project.isPrivate ? (
                <div className="mt-6">
                  <Todo>List the app&apos;s real features in `features`</Todo>
                </div>
              ) : null}
            </Block>

            <Block title="What this project shows">
              <List items={project.focusAreas} />
            </Block>

            {project.challenges.length > 0 || project.lessons.length > 0 ? (
              <Block title="Challenges & lessons learned">
                {project.challenges.length > 0 ? (
                  <>
                    <h3 className="text-base font-semibold text-fg">Challenges</h3>
                    <List items={project.challenges} />
                  </>
                ) : null}
                {project.lessons.length > 0 ? (
                  <>
                    <h3 className="mt-8 text-base font-semibold text-fg">Lessons learned</h3>
                    <List items={project.lessons} />
                  </>
                ) : null}
              </Block>
            ) : (
              <Todo>Add `challenges` and `lessons` — this section appears once you do</Todo>
            )}

            {/* Screenshots */}
            {project.isPrivate ? (
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-bg-muted p-6 text-[15px] text-fg-muted">
                <Lock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <p>{project.privacyNote}</p>
              </div>
            ) : project.screenshots.length > 0 ? (
              <Block title="Screenshots">
                <div className="grid gap-6">
                  {project.screenshots.map((s) => (
                    <figure key={s.src} className="overflow-hidden rounded-2xl border border-line bg-bg-elevated">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={s.width}
                        height={s.height}
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="h-auto w-full"
                      />
                      {s.caption ? <figcaption className="px-5 py-3 text-sm text-fg-muted">{s.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </Block>
            ) : (
              <Todo>Add screenshots to /public/images/projects/{project.slug}/ and list them in `screenshots`</Todo>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="space-y-6 rounded-3xl border border-line bg-bg-elevated p-6">
              <Meta label="Category">{project.category}</Meta>
              {project.status ? <Meta label="Status">{project.status}</Meta> : null}
              <Meta label="Role">Concept · Design · AI-assisted build</Meta>
              {project.technologies.length > 0 ? (
                <Meta label="Technologies">
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li key={t} className="rounded-full bg-bg-muted px-3 py-1 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Meta>
              ) : (
                <Todo>Add verified `technologies`</Todo>
              )}
            </dl>
          </aside>
        </div>
      </Container>

      {/* Next project */}
      <Container className="pb-20">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col gap-4 rounded-3xl border border-line bg-bg-muted p-8 transition-colors hover:border-accent-strong/50 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <Eyebrow>Next project</Eyebrow>
            <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{next.title}</p>
          </div>
          <span className="flex size-12 items-center justify-center rounded-full bg-fg text-bg transition-transform group-hover:translate-x-1">
            <ArrowRight className="size-5" aria-hidden="true" />
          </span>
        </Link>
      </Container>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{title}</h2>
      <div className="mt-4 text-[17px] leading-[1.75] text-fg-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">{label}</dt>
      <dd className="mt-1.5 text-[15px] text-fg">{children}</dd>
    </div>
  );
}
