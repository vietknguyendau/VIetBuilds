import { Compass } from "@/components/compass";
import { ButtonLink, Container, Tile } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="pt-3 sm:pt-4">
      <Container>
        <Tile size="lg" tone="deep" className="flex flex-col items-start gap-10 py-14 sm:flex-row sm:items-center sm:p-16">
          <Compass className="size-36 shrink-0 text-frost sm:size-44" />
          <div>
            <p className="text-mist">404</p>
            <h1 className="mt-3 text-[2.5rem] font-semibold leading-tight sm:text-5xl">Off the map</h1>
            <p className="mt-4 max-w-[46ch] text-lg text-mist">
              This page doesn&apos;t exist. The link may be outdated, or the page may have moved.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/">Go to the homepage</ButtonLink>
              <ButtonLink href="/projects" variant="secondary" className="border-white/15 bg-white/5 text-frost">
                Browse projects
              </ButtonLink>
            </div>
          </div>
        </Tile>
      </Container>
    </div>
  );
}
