"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "About", hash: "about" },
  { label: "Projects", hash: "projects" },
  { label: "Approach", hash: "approach" },
  { label: "Experience", hash: "experience" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";
  const href = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change, and on Escape (returning focus to the button).
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
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.hash}
              href={href(item.hash)}
              className="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={href("contact")}
            className="ml-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Let&apos;s Connect
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
            className="inline-flex size-10 items-center justify-center rounded-full text-fg hover:bg-bg-muted"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-bg px-5 pb-10 pt-6 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...nav, { label: "Contact", hash: "contact" }].map((item) => (
            <Link
              key={item.hash}
              href={href(item.hash)}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-2xl font-medium tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/projects" onClick={() => setOpen(false)} className="py-4 text-2xl font-medium tracking-tight">
            All projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
