import { approach } from "@/content/tools";
import { Section, SectionIntro } from "../ui";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-title">
      <SectionIntro
        id="approach-title"
        title="How I work"
        intro="Whether it's an operational headache or an original idea, I follow the same five steps."
      />
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        {approach.map(({ step, body }, i) => (
          <li
            key={step}
            className="grain spotlight scroll-rise relative flex min-h-[220px] flex-col gap-8 overflow-hidden rounded-tile bg-tile p-6 sm:p-7 last:sm:col-span-2 last:lg:col-span-1"
          >
            {/* the steps are a true sequence, so they're numbered */}
            <span className="font-display text-[4.5rem] font-semibold leading-none tracking-tight text-signal/35" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className="text-2xl font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {step}
              </h3>
              <p className="mt-2 text-[0.9875rem] leading-relaxed text-ink-2">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
