/**
 * Personal brand & contact details.
 * Edit freely — every string here appears somewhere on the site.
 */
export const profile = {
  name: "Viet Nguyen-Dau",
  firstName: "Viet",
  brand: { left: "VIET", right: "BUILDS" },
  location: "Minneapolis, Minnesota",

  headline: "Turning Ideas Into Real-World Solutions.",
  subheading:
    "From business challenges to creative concepts, I build digital experiences that make things easier, smarter, and more engaging.",
  supportingStatement:
    "I combine business experience, creative problem-solving, and AI-assisted development to build practical digital solutions.",
  identity: [
    "Entrepreneur",
    "Business Development Professional",
    "AI-Assisted Application Builder",
    "Problem Solver",
  ],

  /** Shown to recruiters in the hero "at a glance" strip. Keep factual. */
  focusRoles: [
    "AI Solutions Consulting",
    "AI Implementation",
    "Business Automation",
    "Solutions Engineering",
    "Product Development",
  ],

  philosophy:
    "Success isn't always measured by what you earn. Sometimes it's measured by what you learn, what you create, and who you become along the way.",

  links: {
    /** TODO: paste your full LinkedIn profile URL, e.g. https://www.linkedin.com/in/your-handle */
    linkedin: "",
    /** Optional. Leave "" to hide. Only link a public profile. */
    github: "",
    /** Optional. Place the PDF at /public/resume.pdf and set this to "/resume.pdf". */
    resume: "",
    truenorth: "https://truenorthcmmn.com",
  },

  /**
   * Headshot images in /public/images/headshot/.
   * `portrait` (4:5) fills the hero photo tile; `src` (square) is used for small avatars.
   * Leave either "" to fall back to the "VN" monogram.
   */
  headshot: {
    portrait: "/images/headshot/viet.jpg",
    src: "/images/headshot/viet-square.jpg",
    alt: "Viet Nguyen-Dau smiling, wearing a dark green blazer and white shirt",
  },
} as const;

export const siteConfig = {
  title: `${profile.name} — VIET / BUILDS`,
  description:
    "Viet Nguyen-Dau is a business development professional and entrepreneur who uses AI-assisted development to turn ideas and operational challenges into working applications.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};
