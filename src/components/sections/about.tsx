import { BookOpen, Handshake, Lightbulb } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal, Section, SectionHeading } from "../ui";

const pillars = [
  {
    icon: Handshake,
    title: "Business first",
    body: "Years in sales and business development taught me to start with people and problems — not with technology.",
  },
  {
    icon: Lightbulb,
    title: "Builder's mindset",
    body: "I like taking something from a sketch or a frustration to a working app that people can actually use.",
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
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="A business professional who builds."
            intro={profile.supportingStatement}
          />
        </div>

        <div className="space-y-6 text-[17px] leading-[1.75] text-fg-muted" data-reveal>
          <p>
            My career started in <strong className="font-semibold text-fg">sales and business development</strong> —
            learning to listen closely, understand what people actually need, and build relationships that last. Much of
            that work has been in the HOA and community association world.
          </p>
          <p>
            That experience led me to found{" "}
            <strong className="font-semibold text-fg">TrueNorth Community Management</strong>, a Minnesota-based community
            association management business. Running it has put me close to the real mechanics of a business — operations,
            customer service, financial processes — and kept me asking how each workflow could work better.
          </p>
          <p>
            Then I discovered <strong className="font-semibold text-fg">AI-assisted software development</strong>. For the
            first time I could take an idea — a league format, a fitness habit, a tool for my family — and turn it into a
            working, deployed application. I&apos;m not a traditional software engineer, and I don&apos;t claim to be.
            I&apos;m a business professional who has learned to design, build, and ship real software with modern AI tools.
          </p>
          <p>
            What I enjoy most is the range: solving problems that already exist, and bringing original concepts to life.
            Either way, I&apos;m learning something new every time — and that&apos;s the part I love.
          </p>
        </div>
      </div>

      <ul className="mt-16 grid gap-5 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body }, i) => (
          <Reveal as="li" key={title} delay={i * 80} className="rounded-2xl border border-line bg-bg-elevated p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400 dark:bg-navy-700">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
