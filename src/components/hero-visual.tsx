import { Briefcase, Code2, Lightbulb, Rocket } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { Headshot } from "./headshot";

/**
 * Hero visual: a "profile card" that reads as business + creativity + technology.
 * Two inputs (a business challenge, a creative idea) flow through a build step into a working app.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 -z-10 size-72 rounded-full bg-gold-500/20 blur-3xl"
      />
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy-900 text-paper shadow-[0_40px_80px_-30px_rgba(16,29,48,0.55)]">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-gold-500/80" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-white/40">viet / builds</span>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <Headshot size={72} />
            <div>
              <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
              <p className="mt-0.5 text-sm text-white/60">{profile.location}</p>
            </div>
          </div>

          {/* flow */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <FlowChip icon={<Briefcase className="size-4" />} label="Business challenge" />
            <FlowChip icon={<Lightbulb className="size-4" />} label="Creative idea" />
          </div>

          <svg viewBox="0 0 300 44" className="h-11 w-full" aria-hidden="true">
            <path
              d="M75 0 C75 26, 150 18, 150 44 M225 0 C225 26, 150 18, 150 44"
              fill="none"
              stroke="var(--color-gold-500)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
          </svg>

          <div className="rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gold-300">
              <Code2 className="size-4" aria-hidden="true" />
              Discover · Design · Build · Test
            </div>
            <div className="mt-3 space-y-2" aria-hidden="true">
              <div className="h-1.5 w-11/12 rounded-full bg-white/15" />
              <div className="h-1.5 w-8/12 rounded-full bg-white/10" />
              <div className="h-1.5 w-9/12 rounded-full bg-white/10" />
            </div>
          </div>

          <svg viewBox="0 0 300 28" className="h-7 w-full" aria-hidden="true">
            <path d="M150 0 L150 28" stroke="var(--color-gold-500)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 5" />
          </svg>

          <div className="flex items-center justify-between rounded-2xl bg-paper px-4 py-3.5 text-navy-900">
            <span className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
                <Rocket className="size-3.5" aria-hidden="true" />
              </span>
              Working application
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-navy-700">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Deployed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] text-white/80">
      <span className="text-gold-400" aria-hidden="true">
        {icon}
      </span>
      {label}
    </div>
  );
}
