"use client";

import { useEffect } from "react";

/**
 * Site-wide motion helpers:
 *  - Spotlight: tiles with the `.spotlight` class get a soft glow that follows the pointer.
 *  - Scroll progress bar (pure CSS, rendered here so it sits above everything).
 * Only runs on devices with a real hover pointer; reduced motion is handled in CSS.
 */
export function MotionEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
        if (last && last !== el) last.classList.remove("is-lit");
        if (!el) {
          last = null;
          return;
        }
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.classList.add("is-lit");
        last = el;
      });
    };
    const onLeave = () => last?.classList.remove("is-lit");
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
