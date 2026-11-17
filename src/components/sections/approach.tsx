import { Compass, FlaskConical, Hammer, PenTool, Rocket } from "lucide-react";
import { approach } from "@/content/tools";
import { Reveal, Section, SectionHeading } from "../ui";

const icons = [Compass, PenTool, Hammer, FlaskConical, Rocket];

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-title">
      <SectionHeading
        id="approach-title"
        eyebrow="My approach"
        title="A practical path from problem to product."
        intro="Whether it's an operational headache or an original idea, I follow the same five steps."
      />

      <ol className="relative mt-14 grid gap-4 md:grid-cols-5 md:gap-0">
        {/* connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-accent-strong/50 to-transparent md:block"
        />
        {approach.map(({ step, body }, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              as="li"
              key={step}
              delay={i * 90}
              className="relative flex gap-5 rounded-2xl border border-line bg-bg-elevated p-5 md:flex-col md:items-center md:gap-0 md:border-0 md:bg-transparent md:p-4 md:text-center"
            >
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-bg-elevated text-accent shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="md:mt-6">
                <p className="font-mono text-xs text-fg-subtle">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{step}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{body}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
