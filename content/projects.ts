import type { Project } from "./types";

/**
 * PROJECTS
 * ---------------------------------------------------------------
 * Copy here is written only from what you've told me about each app.
 * Fields left empty ("" or []) are yours to fill in — they render as
 * TODO hints in development and are hidden in production.
 *
 * Rules of thumb (keeps the site credible):
 *  - Only list features the app really has.
 *  - Only list technologies you've verified that project uses.
 *  - No user counts, performance numbers, or results unless they're real.
 *  - Only link public repos and public demos.
 */
export const projects: Project[] = [
  {
    slug: "ten-man-fantasy-football",
    title: "10-Man Fantasy Football League",
    tagline: "An original league concept with its own rules and challenges, turned into a deployed app.",
    category: "Leagues & Competition",
    status: "Live",
    icon: "trophy",
    featured: true,
    overview:
      "A fantasy football competition built around a creative 10-person league concept — with its own rules, challenges, and season-long experiences that standard fantasy platforms weren't designed to handle.",
    problem:
      // DRAFT — confirm or rewrite in your own words.
      "The league was built around custom rules, challenges, and experiences that standard fantasy platforms aren't designed for. Bringing the concept to life meant building something purpose-made.",
    role:
      "Concept owner and builder. I defined the league format, translated each custom rule into application behavior, designed the experience, and built and deployed it using AI-assisted development.",
    solution:
      "A purpose-built application where the league's unique rules are part of the product itself, so members can engage with the competition the way it was meant to be played.",
    focusAreas: [
      "Product ideation — shaping a loose idea into a defined product",
      "Translating custom league rules into clear application logic",
      "Designing an experience that keeps league members engaged",
      "Iterative development: build, gather feedback, refine",
    ],
    features: [],
    technologies: [],
    challenges: [],
    lessons: [],
    screenshots: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "momentum",
    title: "Momentum",
    tagline: "A personal workout log designed to make tracking fitness organized and easy to stick with.",
    category: "Health & Wellness",
    status: "",
    icon: "dumbbell",
    featured: true,
    overview:
      "Momentum is a personal workout logging application built to make fitness tracking more organized, engaging, and convenient.",
    problem:
      // DRAFT — confirm or rewrite in your own words.
      "I wanted a more organized, engaging, and convenient way to track my own workouts — so I built one.",
    role:
      "Builder and primary user. I identified the problem from my own routine, designed the workflow, and built the app with AI-assisted development.",
    solution:
      "A focused workout logging app designed to make fitness tracking more organized, engaging, and convenient.",
    focusAreas: [
      "Solving a personal, everyday problem with software",
      "Designing for convenience in everyday use",
      "Building useful software for a real routine",
    ],
    features: [],
    technologies: [],
    challenges: [],
    lessons: [],
    screenshots: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "chump-and-hero",
    title: "Chump & Hero",
    tagline: "A custom bowling league competition that brings an original competitive concept to life.",
    category: "Leagues & Competition",
    status: "",
    icon: "users",
    featured: true,
    overview:
      "Chump & Hero is a custom bowling league competition application built to bring an original competitive concept to life.",
    problem:
      // DRAFT — confirm or rewrite in your own words.
      "Chump & Hero started as an original competition concept for a bowling league. Standard league tools weren't built for it, so bringing it to life needed a dedicated application.",
    role:
      "Concept creator and builder. I designed the competition mechanics and the experience around them, then built the application with AI-assisted development.",
    solution:
      "An application built around the Chump & Hero concept, designed to make the competition engaging for the whole league community.",
    focusAreas: [
      "Gamification — designing mechanics that are simple and fun",
      "Community engagement within an existing league",
      "End-to-end product development from concept to working app",
    ],
    features: [],
    technologies: [],
    challenges: [],
    lessons: [],
    screenshots: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "golf-league-management",
    title: "Golf League Management",
    tagline: "A custom app to organize a golf league and make the experience smoother for everyone.",
    category: "Leagues & Competition",
    status: "",
    icon: "flag",
    featured: true,
    overview:
      "A custom application designed to organize and improve the golf league experience — for the people running it and the people playing in it.",
    problem:
      // DRAFT — confirm or rewrite in your own words.
      "Running a league involves a lot of moving parts. A custom app built around how the league actually works makes it easier to organize and to enjoy.",
    role:
      "Builder. I mapped the league's workflows, designed how the app should support them, and built it with AI-assisted development.",
    solution:
      "A dedicated league tool that brings organization into one place and makes the league easier to run and enjoy.",
    focusAreas: [
      "Workflow design — mapping how a league actually operates",
      "League organization and coordination",
      "User experience for organizers and players",
    ],
    features: [],
    technologies: [],
    challenges: [],
    lessons: [],
    screenshots: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "family-health-tracker",
    title: "Family Health Tracker",
    tagline: "A private app built to support my growing family.",
    category: "Health & Wellness",
    status: "Private",
    icon: "heart",
    featured: true,
    isPrivate: true,
    privacyNote:
      "This is a private application. To protect my family's privacy, no screenshots, data, or detailed features are shared publicly.",
    overview:
      "A private application I built to help support my growing family in everyday life.",
    problem:
      "Some of the most meaningful problems to solve are the ones closest to home. I wanted a simple, private tool that fit my family's needs.",
    role:
      "Builder. I designed and built the application with AI-assisted development, with privacy treated as a first-class requirement.",
    solution:
      "A private, purpose-built tool for my family — a reminder that useful technology doesn't have to be big to be meaningful.",
    focusAreas: [
      "Creating meaningful technology for everyday life",
      "Designing with privacy as a core requirement",
      "Keeping a personal tool simple and dependable",
    ],
    features: [],
    technologies: [],
    challenges: [],
    lessons: [],
    screenshots: [],
    liveUrl: "",
    repoUrl: "",
  },
];

export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
