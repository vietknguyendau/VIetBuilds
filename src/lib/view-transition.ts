import type React from "react";

/**
 * Helpers for the View Transitions API.
 * Browsers without support (or visitors who prefer reduced motion) just get the instant update.
 */

export function vtName(prefix: string, slug: string) {
  return `${prefix}-${slug.replace(/[^a-z0-9-]/gi, "")}`;
}

/**
 * Style for a project title that should morph between the grid and its case-study page.
 * The name goes through a CSS variable so a filter transition can switch it off
 * (titles then move with their cards instead of flying separately).
 */
export function vtTitleStyle(slug: string) {
  return {
    viewTransitionName: `var(--vt-title-name, ${vtName("project-title", slug)})`,
    viewTransitionClass: "vt-title",
  } as React.CSSProperties;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

/**
 * Run a DOM update inside a view transition when the browser supports it.
 * `scope` adds a class to <html> for the duration, so CSS can tailor that transition
 * (e.g. "filter-vt" keeps the page still and only moves the project tiles).
 */
export function withViewTransition(update: () => void, scope?: string) {
  const doc = document as DocWithVT;
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return null;
  }
  if (scope) doc.documentElement.classList.add(scope);
  const vt = doc.startViewTransition(update);
  if (scope) vt.finished.finally(() => doc.documentElement.classList.remove(scope));
  return vt;
}
