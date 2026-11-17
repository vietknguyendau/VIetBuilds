import { profile } from "@/content/profile";
import { Container, Tile } from "../ui";

/** The one fully color-blocked tile on the page. */
export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="pt-16 sm:pt-24">
      <Container>
        <h2 id="philosophy-title" className="sr-only">
          Personal philosophy
        </h2>
        <Tile as="figure" tone="signal" size="lg" className="px-7 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
          <blockquote
            className="max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-balance"
          >
            &ldquo;{profile.philosophy}&rdquo;
          </blockquote>
          <figcaption className="mt-10 max-w-[48ch] text-[1.0625rem] text-spruce-800">
            {profile.name}, on curiosity, lifelong learning, and enjoying the creative journey.
          </figcaption>
        </Tile>
      </Container>
    </section>
  );
}
