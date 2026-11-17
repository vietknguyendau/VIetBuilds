import { BookOpen, Handshake, Lightbulb } from "lucide-react";
import { Bento, Section, SectionIntro, Tile } from "../ui";

const pillars = [
  {
    icon: Handshake,
    title: "Business first",
    body: "Years in sales and business development taught me to start with people and problems, not technology.",
  },
  {
    icon: Lightbulb,
    title: "A builder's mindset",
    body: "I like taking something from a sketch or a frustration to an app people can actually use.",
  },
  {
    icon: BookOpen,
    title: "Always learning",
    body: "AI-assisted development opened a new door. I keep walking through it, one project at a time.",
  },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionIntro
        id="about-title"
        title="A business professional who builds"
        intro="I combine business experience, creative problem-solving, and AI-assisted development to build practical digital solutions."
      />
      <Bento>
        <Tile size="lg" className="sm:col-span-6 lg:col-span-7 lg:row-span-3 lg:p-12">
          <div className="max-w-[60ch] space-y-5 text-[1.0625rem] leading-[1.75] text-ink-2">
            <p>
              My career started in <strong className="font-semibold text-ink">sales and business development</strong>:
              listening closely, understanding what people actually need, and building relationships that last. Much of that
              work has been in the HOA and community association world.
            </p>
            <p>
              That experience led me to found <strong className="font-semibold text-ink">TrueNorth Community Management</strong>,
              a Minnesota-based community association management business. Running it has put me close to the real mechanics
              of a business (operations, customer service, financial processes) and kept me asking how each workflow could
              work better.
            </p>
            <p>
              Then I discovered <strong className="font-semibold text-ink">AI-assisted software development</strong>. For the
              first time I could take an idea, whether a league format, a fitness habit, or a tool for my family, and turn it
              into a working, deployed application. I&apos;m not a traditional software engineer, and I don&apos;t claim to
              be. I&apos;m a business professional who has learned to design, build, and ship real software with modern AI
              tools.
            </p>
            <p>
              What I enjoy most is the range: solving problems that already exist, and bringing original concepts to life.
              Either way, I learn something new every time, and that&apos;s the part I love.
            </p>
          </div>
        </Tile>
        {pillars.map(({ icon: Icon, title, body }) => (
          <Tile key={title} size="sm" className="flex gap-5 sm:col-span-6 lg:col-span-5">
            <Icon className="mt-1 size-6 shrink-0 text-signal" strokeWidth={1.6} aria-hidden="true" />
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-1.5 text-[0.9875rem] leading-relaxed text-ink-2">{body}</p>
            </div>
          </Tile>
        ))}
      </Bento>
    </Section>
  );
}
