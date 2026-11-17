import { tools } from "@/content/tools";
import { Bento, Section, SectionIntro, Tile } from "../ui";

export function Tools() {
  const visible = tools.filter((t) => t.visible);
  const using = visible.filter((t) => t.status === "Using");
  const exploring = visible.filter((t) => t.status === "Exploring");

  return (
    <Section id="tools" labelledBy="tools-title">
      <SectionIntro
        id="tools-title"
        title="What I build with"
        intro="Tools I use today, and tools I'm still learning. I'd rather be clear about the difference."
      />
      <Bento>
        <Tile size="lg" className="sm:col-span-6 lg:col-span-8">
          <h3 className="text-xl font-semibold">Using in my projects</h3>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {using.map((t) => (
              <li key={t.name} className="border-t border-hair py-4">
                <p className="font-display text-xl font-semibold tracking-tight">{t.name}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{t.description}</p>
              </li>
            ))}
          </ul>
        </Tile>
        {exploring.length > 0 ? (
          <Tile tone="outline" className="sm:col-span-6 lg:col-span-4 lg:self-start">
            <h3 className="text-xl font-semibold">Currently exploring</h3>
            <ul className="mt-6">
              {exploring.map((t) => (
                <li key={t.name} className="border-t border-dashed border-hair py-4">
                  <p className="font-display text-xl font-semibold tracking-tight">{t.name}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">{t.description}</p>
                </li>
              ))}
            </ul>
          </Tile>
        ) : null}
      </Bento>
    </Section>
  );
}
