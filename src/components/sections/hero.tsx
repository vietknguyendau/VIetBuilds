import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { HeroVisual } from "../hero-visual";
import { SocialLinks } from "../social-links";
import { ButtonLink, Container } from "../ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16 lg:pt-20">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/70 px-3.5 py-1.5 text-xs font-medium text-fg-muted backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent-strong" aria-hidden="true" />
              {profile.name} · {profile.location}
            </p>

            <h1
              id="hero-title"
              className="mt-7 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]"
            >
              Turning Ideas Into{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">Real-World</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 z-0 h-3 w-full text-accent-strong/70"
                >
                  <path d="M2 9 C 80 2, 220 2, 298 7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Solutions.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty sm:text-xl">{profile.subheading}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects">
                View Projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Let&apos;s Connect
              </ButtonLink>
              <SocialLinks className="sm:ml-2" showResume />
            </div>

            {/* 15-second recruiter summary */}
            <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">What I am</dt>
                <dd className="mt-2.5 text-[15px] leading-relaxed text-fg">{profile.identity.join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">Where I&apos;m focused</dt>
                <dd className="mt-2.5 text-[15px] leading-relaxed text-fg">{profile.focusRoles.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
