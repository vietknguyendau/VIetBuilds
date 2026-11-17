import { ArrowLeft } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="max-w-2xl text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This page hasn&apos;t been built yet.</h1>
        <p className="mt-5 text-lg text-fg-muted">
          The link may be outdated, or the page may have moved. Let&apos;s get you back to something that works.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
