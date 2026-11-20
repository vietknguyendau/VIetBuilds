"use client";

import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { withViewTransition } from "@/lib/view-transition";

/**
 * Light/dark toggle. Where the View Transitions API is available, the new theme
 * spreads out in a circle from the button; elsewhere it switches instantly.
 */
export function ThemeToggle() {
  function apply(next: "light" | "dark") {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add("theme-vt");
    const vt = withViewTransition(() => apply(next));
    if (!vt) {
      root.classList.remove("theme-vt");
      return;
    }
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    vt.finished.finally(() => root.classList.remove("theme-vt"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="inline-flex size-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-tile-2 hover:text-ink"
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
      <Moon className="block size-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
