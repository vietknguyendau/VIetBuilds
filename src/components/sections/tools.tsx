import { Check, Telescope } from "lucide-react";
import { tools } from "@/content/tools";
import type { ToolStatus } from "@/content/types";
import { Reveal, Section, SectionHeading } from "../ui";

const groups: { status: ToolStatus; title: string; note: string }[] = [
  { status: "Using", title: "Tools I build with", note: "Used in my own projects" },
  { status: "Exploring", title: "Currently exploring", note: "Learning and evaluating" },
];

export function Tools() {
  const visible = tools.filter((t) => t.visible);
  return (
    <Section id="tools" labelledBy="tools-title" className="border-t border-line bg-bg-muted/60">
      <SectionHeading
        id="tools-title"
        eyebrow="Technology & tools"
        title="Modern tools, honestly labeled."
        intro="Here's what I actually build with today — and what I'm still learning. I'd rather be clear about the difference."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {groups.map(({ status, title, note }) => {
          const items = visible.filter((t) => t.status === status);
          if (items.length === 0) return null;
          const using = status === "Using";
          return (
            <div key={status} className="rounded-3xl border border-line bg-bg-elevated p-6 sm:p-8" data-reveal>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-fg-subtle">
                  {using ? <Check className="size-3.5 text-accent" aria-hidden="true" /> : <Telescope className="size-3.5" aria-hidden="true" />}
                  {note}
                </span>
              </div>
              <ul className={using ? "mt-6 grid gap-3 sm:grid-cols-2" : "mt-6 grid gap-3"}>
                {items.map((t, i) => (
                  <Reveal
                    as="li"
                    key={t.name}
                    delay={i * 50}
                    className={
                      using
                        ? "rounded-2xl border border-line p-4 transition-colors hover:border-accent-strong/50"
                        : "rounded-2xl border border-dashed border-line p-4"
                    }
                  >
                    <p className="font-medium">{t.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{t.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
