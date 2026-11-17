import type { Tool } from "./types";

/**
 * "Using" = tools you've actually built or shipped with.
 * "Exploring" = tools you're learning or evaluating.
 * Keep this honest — it's one of the first things technical reviewers check.
 */
export const tools: Tool[] = [
  { name: "Claude", status: "Using", description: "AI pair-builder for planning, coding, and debugging.", visible: true },
  { name: "Next.js", status: "Using", description: "React framework for building and shipping web apps.", visible: true },
  { name: "TypeScript", status: "Using", description: "Typed JavaScript for safer, more maintainable code.", visible: true },
  { name: "GitHub", status: "Using", description: "Version control and project history.", visible: true },
  { name: "Vercel", status: "Using", description: "Hosting and deployment for live applications.", visible: true },
  { name: "Supabase", status: "Using", description: "Database and authentication for app data.", visible: true },
  { name: "GoHighLevel", status: "Exploring", description: "CRM and marketing automation for small businesses.", visible: true },
  // Only set visible: true once you've verified you've built a Google Calendar integration.
  { name: "Google Calendar integrations", status: "Using", description: "Scheduling and calendar sync.", visible: false },
];

/** Process steps for the "My Approach" section. */
export const approach = [
  { step: "Discover", body: "Understand the problem and the people involved." },
  { step: "Design", body: "Map out a practical solution." },
  { step: "Build", body: "Develop and integrate the application using modern tools." },
  { step: "Test", body: "Validate functionality and improve the experience." },
  { step: "Deploy", body: "Launch the solution and continue iterating." },
] as const;
