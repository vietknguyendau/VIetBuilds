import { profile } from "@/content/profile";
import { Container } from "../ui";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="border-y border-line py-24 sm:py-32">
      <Container className="max-w-4xl text-center">
        <h2 id="philosophy-title" className="sr-only">
          Personal philosophy
        </h2>
        <figure data-reveal>
          <span aria-hidden="true" className="block font-serif text-7xl leading-none text-accent-strong">
            &ldquo;
          </span>
          <blockquote className="mt-2 text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl lg:text-[2.4rem] lg:leading-[1.25]">
            {profile.philosophy}
          </blockquote>
          <figcaption className="mt-8 text-sm text-fg-muted">
            <span className="font-medium text-fg">{profile.name}</span> — on curiosity, lifelong learning, and enjoying the
            creative journey
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
