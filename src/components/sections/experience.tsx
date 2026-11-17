import { ArrowUpRight } from "lucide-react";
import { experience, strengths } from "@/content/experience";
import { isPublicUrl } from "@/lib/utils";
import { Bento, Section, SectionIntro, Tile } from "../ui";

export function Experience() {
  const entries = experience.filter((e) => e.visible);
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionIntro
        id="experience-title"
        title="Where business and building meet"
        intro="The common thread: understanding people and processes, then making them work better."
      />
      <Bento>
        <Tile className="sm:col-span-6 lg:col-span-5">
          <h3 className="text-xl font-semibold">Strengths</h3>
          <ul className="mt-5">
            {strengths.map((s) => (
              <li key={s.title} className="border-t border-hair py-4">
                <p className="font-medium">{s.title}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{s.body}</p>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile size="lg" className="sm:col-span-6 lg:col-span-7">
          <h3 className="text-xl font-semibold">Timeline</h3>
          <ol className="relative mt-6 space-y-8 border-l border-hair pl-7">
            {entries.map((e) => (
              <li key={`${e.org}-${e.role}`} className="relative">
                <span aria-hidden="true" className="absolute -left-[33px] top-2 size-2.5 rounded-full bg-signal-fill ring-4 ring-tile" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-2xl font-semibold tracking-tight">{e.role}</h4>
                  {e.period ? <p className="text-sm text-ink-3">{e.period}</p> : null}
                </div>
                <p className="mt-1 text-[0.9375rem] font-medium text-signal">
                  {isPublicUrl(e.url) ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {e.org} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    e.org
                  )}
                  {e.location ? <span className="text-ink-3">, {e.location}</span> : null}
                </p>
                <p className="mt-3 max-w-[58ch] text-[0.9875rem] leading-relaxed text-ink-2">{e.summary}</p>
                {e.highlights.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {e.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-tile-2 px-3 py-1 text-[0.8125rem] text-ink-2">
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </Tile>
      </Bento>
    </Section>
  );
}
