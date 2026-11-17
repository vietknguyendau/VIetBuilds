import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { isPublicUrl } from "@/lib/utils";
import { Container, Tile } from "../ui";

const exposure = [
  "Business operations",
  "Customer service",
  "Financial processes",
  "Vendor coordination",
  "Workflow improvement",
];

export function TrueNorth() {
  const url = profile.links.truenorth;
  return (
    <section id="truenorth" aria-labelledby="truenorth-title" className="pt-16 sm:pt-24">
      <Container>
        <Tile tone="deep" size="lg" className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:p-14">
          <div>
            <p className="text-mist">Entrepreneurship</p>
            <h2 id="truenorth-title" className="mt-3 text-[2rem] font-semibold text-balance sm:text-[2.6rem]">
              I founded TrueNorth Community Management
            </h2>
            <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-mist">
              TrueNorth is a Minnesota-based community association management business. Building it has given me firsthand
              exposure to how a business really runs: the operations, the customer conversations, the money, the vendors, and
              the workflows connecting them.
            </p>
            <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-frost">
              That&apos;s my advantage with technology. I understand business needs from the inside, so the tools I build fit
              how work actually gets done.
            </p>
            {isPublicUrl(url) ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-[0.9375rem] font-semibold text-spruce-900 transition-[filter] hover:brightness-105"
              >
                Visit truenorthcmmn.com
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <div className="lg:self-end">
            <p className="text-mist">What running it has taught me</p>
            <ul className="mt-3 border-t border-white/10">
              {exposure.map((label) => (
                <li key={label} className="border-b border-white/10 py-4 font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Tile>
      </Container>
    </section>
  );
}
