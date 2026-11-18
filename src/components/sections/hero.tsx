import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { Compass } from "../compass";
import { Headshot } from "../headshot";
import { SocialLinks } from "../social-links";
import { Bento, ButtonLink, Container, Tile, TileLabel } from "../ui";

const lines = ["Turning ideas", "into real-world", "solutions."];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-1.5 pt-3 sm:pb-2 sm:pt-4">
      <Container>
        <Bento>
          {/* Headline */}
          <Tile size="lg" className="flex flex-col justify-between gap-12 sm:col-span-6 lg:col-span-8 lg:row-span-2 lg:p-12" animate index={0}>
            <p className="text-[1.0625rem] text-ink-2">Hi, I&apos;m Viet. I build practical software for real problems.</p>
            <div>
              <h1
                id="hero-title"
                className="text-[clamp(2.9rem,8vw,6.2rem)] leading-[0.98] tracking-[-0.025em] text-ink"
                style={{ fontStretch: "95%" }}
              >
                {lines.map((l, i) => (
                  <span key={l} className="settle-line" style={{ ["--i" as string]: i }}>
                    {l}
                  </span>
                ))}
              </h1>
              <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-2 text-pretty">{profile.subheading}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="#projects">View projects</ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Let&apos;s connect
                </ButtonLink>
              </div>
            </div>
          </Tile>

          {/* Profile photo */}
          {profile.headshot.portrait ? (
            <Tile as="figure" className="min-h-[420px] p-0 sm:col-span-3 sm:p-0 lg:col-span-4 lg:min-h-[380px]" animate index={1}>
              <Image
                src={profile.headshot.portrait}
                alt={profile.headshot.alt}
                fill
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-[50%_22%]"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-tile-sm bg-spruce-900/80 px-5 py-4 text-frost backdrop-blur-md">
                <div>
                  <p className="font-display text-xl font-semibold tracking-tight">{profile.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-mist">
                    <MapPin className="size-3.5 text-amber-400" aria-hidden="true" />
                    {profile.location}
                  </p>
                </div>
                <div className="[--hair:rgba(255,255,255,0.18)] [--ink-2:#d3dccf] [--ink:#ffffff]">
                  <SocialLinks />
                </div>
              </figcaption>
            </Tile>
          ) : (
            <Tile className="flex flex-col justify-between gap-8 sm:col-span-3 lg:col-span-4" animate index={1}>
              <div className="flex items-start justify-between gap-4">
                <Headshot size={84} />
                <SocialLinks />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">{profile.name}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-ink-2">
                  <MapPin className="size-4 text-signal" aria-hidden="true" />
                  {profile.location}
                </p>
              </div>
            </Tile>
          )}

          {/* TrueNorth compass — the signature tile */}
          <Tile tone="deep" className="group flex items-center gap-6 sm:col-span-3 lg:col-span-4" animate index={2}>
            <Compass className="size-28 shrink-0 text-frost sm:size-32" />
            <div>
              <TileLabel className="text-mist">Founder</TileLabel>
              <p className="mt-1 font-display text-xl font-semibold leading-snug">TrueNorth Community Management</p>
              <Link href="#truenorth" className="mt-3 inline-block text-sm text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:decoration-amber-400">
                Why it matters
              </Link>
            </div>
          </Tile>

          {/* 15-second read for recruiters */}
          <Tile className="sm:col-span-6 lg:col-span-7" animate index={3}>
            <TileLabel>Roles I&apos;m pursuing</TileLabel>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.focusRoles.map((r) => (
                <li key={r} className="rounded-full border border-hair px-3.5 py-1.5 text-[0.9375rem]">
                  {r}
                </li>
              ))}
            </ul>
          </Tile>

          {/* For business owners */}
          <Tile tone="cream" className="flex flex-col justify-between gap-5 sm:col-span-6 lg:col-span-5" animate index={4}>
            <div>
              <TileLabel>For business owners</TileLabel>
              <p className="mt-2 font-display text-xl font-semibold leading-snug text-balance">
                Have a workflow that eats your week? I can help map it and build the tool.
              </p>
            </div>
            <ButtonLink href="#contact" variant="ghost" className="self-start">
              Tell me about it
            </ButtonLink>
          </Tile>
        </Bento>
      </Container>
    </section>
  );
}
