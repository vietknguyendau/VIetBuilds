/**
 * Shared content types. All editable site content lives in /src/content.
 * Empty strings / empty arrays are treated as "not provided yet":
 * - in production they are hidden (or show a neutral "coming soon" note)
 * - in `npm run dev` they show a dashed "TODO" hint so you know what to fill in
 */

export type ProjectCategory = "Leagues & Competition" | "Health & Wellness";

export type ProjectStatus = "Live" | "In development" | "Private" | "";

export interface Screenshot {
  /** Path inside /public, e.g. "/images/projects/momentum/dashboard.png" */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size of the image file (used by next/image to prevent layout shift). */
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line hook shown on cards. */
  tagline: string;
  category: ProjectCategory;
  /** Leave "" if you don't want a status badge. */
  status: ProjectStatus;
  /** Lucide icon name used on placeholder visuals (see components/project-visual.tsx). */
  icon: "trophy" | "dumbbell" | "flag" | "users" | "heart";
  featured: boolean;

  overview: string;
  problem: string;
  role: string;
  solution: string;
  /** What the case study emphasizes — product thinking, not claims of results. */
  focusAreas: string[];
  /** Concrete features. Only list what the app actually does. */
  features: string[];
  /** Only add technologies you've verified this project uses. */
  technologies: string[];
  challenges: string[];
  lessons: string[];
  screenshots: Screenshot[];
  /** Public URLs only. Leave "" to hide the button. */
  liveUrl: string;
  /** Public repositories only. Never link a private repo. */
  repoUrl: string;
  /** Private projects never show screenshots, links, or detailed features. */
  isPrivate?: boolean;
  privacyNote?: string;
}

export interface ExperienceEntry {
  org: string;
  role: string;
  /** e.g. "2024 — Present". Leave "" to hide. Do not guess dates. */
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  url?: string;
  /** Set to false to publish. Lets you keep drafts in the file without showing them. */
  visible: boolean;
}

export type ToolStatus = "Using" | "Exploring";

export interface Tool {
  name: string;
  status: ToolStatus;
  description: string;
  /** Set false to hide (e.g. until you've verified you've used it). */
  visible: boolean;
}
