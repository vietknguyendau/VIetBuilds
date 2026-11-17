"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Projects", hash: "projects" },
  { label: "About", hash: "about" },
  { label: "Approach", hash: "approach" },
  { label: "Experience", hash: "experience" },
];

/** Floating pill navigation. Frosted glass is reserved for this bar only. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";
  const href = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 mx-auto max-w-[1240px] px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-signal-fill focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-signal"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "flex h-14 items-center justify-between rounded-full border border-hair/70 bg-tile/75 pl-5 pr-2 shadow-[0_10px_30px_-18px_rgba(10,24,29,0.6)] backdrop-blur-xl",
          open && "rounded-b-none rounded-t-[1.75rem]",
        )}
      >
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.hash}
              href={href(item.hash)}
              className="rounded-full px-3.5 py-2 text-[0.9375rem] text-ink-2 transition-colors hover:bg-tile-2 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={href("contact")}
            className="ml-1 rounded-full bg-signal-fill px-4 py-2 text-[0.9375rem] font-semibold text-on-signal transition-[filter] hover:brightness-105"
          >
            Let&apos;s connect
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-tile-2"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] rounded-b-[1.75rem] border border-t-0 border-hair/70 bg-tile px-5 pb-10 pt-2 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...nav, { label: "Contact", hash: "contact" }].map((item) => (
            <Link
              key={item.hash}
              href={href(item.hash)}
              onClick={() => setOpen(false)}
              className="border-b border-hair py-4 font-display text-3xl font-semibold tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/projects" onClick={() => setOpen(false)} className="py-4 font-display text-3xl font-semibold tracking-tight text-ink-2">
            All projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
