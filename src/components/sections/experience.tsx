import { ArrowUpRight } from "lucide-react";
import { experience, strengths } from "@/content/experience";
import { isPublicUrl } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "../ui";

export function Experience() {
  const entries = experience.filter((e) => e.visible);
  return (
    <Section id="experience" labelledBy="experience-title">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            id="experience-title"
            eyebrow="Professional experience"
            title="Where business and building meet."
            intro="The common thread: understanding people and processes, then making things work better."
          />
          <ul className="mt-10 space-y-4">
            {strengths.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="flex gap-4">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden="true" />
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-0.5 text-[15px] text-fg-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <ol className="relative space-y-6 border-l border-line pl-8 lg:mt-4">
          {entries.map((e, i) => (
            <Reveal as="li" key={`${e.org}-${e.role}`} delay={i * 80} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38.5px] top-7 size-3 rounded-full border-2 border-accent-strong bg-bg"
              />
              <div className="rounded-2xl border border-line bg-bg-elevated p-6 transition-colors hover:border-accent-strong/40">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">{e.role}</h3>
                  {e.period ? <p className="font-mono text-xs text-fg-subtle">{e.period}</p> : null}
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {isPublicUrl(e.url) ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {e.org} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    e.org
                  )}
                  {e.location ? <span className="text-fg-subtle"> · {e.location}</span> : null}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{e.summary}</p>
                {e.highlights.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {e.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-bg-muted px-3 py-1 text-xs text-fg-muted">
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
