import type { ExperienceEntry } from "./types";

/** Areas of strength shown above the timeline. */
export const strengths = [
  {
    title: "Business development & consultative sales",
    body: "Understanding what a client actually needs before proposing anything.",
  },
  {
    title: "Customer relationship management",
    body: "Building trust over time and keeping relationships healthy after the sale.",
  },
  {
    title: "HOA & community association management",
    body: "Hands-on knowledge of the resale, payments, and management ecosystem.",
  },
  {
    title: "Entrepreneurship & business operations",
    body: "Running the day-to-day of a business — not just talking about it.",
  },
  {
    title: "AI-assisted application development",
    body: "Designing, building, and deploying working apps with modern AI tools.",
  },
];

/**
 * TIMELINE — newest first.
 * Entries with `visible: false` are drafts and won't appear on the site.
 * Fill in roles/dates you're comfortable sharing publicly, then flip to `true`.
 * Never guess dates — leave period as "" until you confirm it.
 */
export const experience: ExperienceEntry[] = [
  {
    org: "TrueNorth Community Management",
    role: "Founder",
    period: "",
    location: "Minnesota",
    summary:
      "Founded a Minnesota-based community association management business focused on transparency, education, and well-run operations.",
    highlights: [
      "Business operations and customer service",
      "Financial processes and vendor coordination",
      "Workflow design and continuous improvement",
    ],
    url: "https://truenorthcmmn.com",
    visible: true,
  },
  {
    org: "Independent",
    role: "AI-Assisted Application Builder",
    period: "",
    summary:
      "Designing, building, and deploying custom applications using AI-assisted development — from original concepts to tools that solve everyday problems.",
    highlights: [
      "Five applications across leagues, fitness, and family life",
      "Concept → design → build → test → deploy",
    ],
    visible: true,
  },
  // ---- Drafts: confirm details, then set visible: true ----
  {
    org: "RealPage",
    role: "Account Representative — HOA",
    period: "",
    summary: "TODO: one or two sentences about the role.",
    highlights: [],
    visible: false,
  },
  {
    org: "ClickPay",
    role: "TODO: role title",
    period: "",
    summary: "TODO",
    highlights: [],
    visible: false,
  },
  {
    org: "HomeWiseDocs",
    role: "TODO: role title",
    period: "",
    summary: "TODO",
    highlights: [],
    visible: false,
  },
];
