import { ArrowUpRight, Building2, Calculator, Headset, Truck, Workflow } from "lucide-react";
import { profile } from "@/content/profile";
import { isPublicUrl } from "@/lib/utils";
import { Container, Eyebrow, Reveal } from "../ui";

const exposure = [
  { icon: Building2, label: "Business operations" },
  { icon: Headset, label: "Customer service" },
  { icon: Calculator, label: "Financial processes" },
  { icon: Truck, label: "Vendor coordination" },
  { icon: Workflow, label: "Workflow improvement" },
];

export function TrueNorth() {
  const url = profile.links.truenorth;
  return (
    <section aria-labelledby="truenorth-title" className="relative overflow-hidden bg-navy-900 py-20 text-paper sm:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-gold-500)_16%,transparent),transparent)]"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div data-reveal>
            <Eyebrow className="text-gold-400">Entrepreneurship</Eyebrow>
            <h2 id="truenorth-title" className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Founder, TrueNorth Community Management.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              TrueNorth is a Minnesota-based community association management business I founded. Building it has given me
              firsthand exposure to how a business really runs — the operations, the customer conversations, the money, the
              vendors, and the workflows connecting them.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              That&apos;s my advantage when it comes to technology:{" "}
              <span className="text-paper">I understand business needs from the inside</span>, so the tools I build are shaped
              around how work actually gets done.
            </p>
            {isPublicUrl(url) ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-5 py-3 text-sm font-medium text-gold-300 transition-all hover:-translate-y-0.5 hover:bg-gold-500/10"
              >
                Visit truenorthcmmn.com
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {exposure.map(({ icon: Icon, label }, i) => (
              <Reveal
                as="li"
                key={label}
                delay={i * 70}
                className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 last:sm:col-span-2"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-medium">{label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
