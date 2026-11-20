# VIET / BUILDS — Portfolio of Viet Nguyen-Dau

Personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Lucide** icons, deployed on **Vercel**.
Every page is statically generated. There's no database, no analytics, and no third-party scripts.

> **The short version:** all your content lives in `src/content/`. You can update most of the site without touching a single component.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server. Shows dashed **TODO** hints wherever content is missing. |
| `npm run build` | Production build. TODO hints are automatically hidden. |
| `npm start` | Serves the production build locally. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | TypeScript check. |

Requires Node 20+.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # fonts, metadata, theme script, header/footer
│  ├─ page.tsx                # homepage (section order lives here)
│  ├─ projects/page.tsx       # all projects + filters
│  ├─ projects/[slug]/page.tsx# case-study pages (generated from data)
│  ├─ actions/contact.ts      # contact form server action
│  ├─ not-found.tsx           # custom 404
│  ├─ sitemap.ts, robots.ts   # SEO
│  ├─ opengraph-image.tsx     # social share image (auto-generated)
│  ├─ icon.svg                # favicon
│  └─ globals.css             # brand colors, light/dark tokens, motion
├─ components/
│  ├─ sections/               # Hero, About, Projects, TrueNorth, Approach, Tools, Experience, Philosophy, Contact
│  ├─ ui.tsx                  # Container, Section, SectionHeading, ButtonLink, Badge, Reveal, Todo
│  ├─ project-card.tsx, project-grid.tsx, project-visual.tsx
│  ├─ site-header.tsx, site-footer.tsx, theme-toggle.tsx
│  ├─ contact-form.tsx, social-links.tsx, headshot.tsx, hero-visual.tsx
│  └─ reveal-observer.tsx     # scroll-in animations (respects reduced motion)
├─ content/                   # ← EDIT THESE
│  ├─ profile.ts              # name, headline, links, headshot, philosophy
│  ├─ projects.ts             # all five projects
│  ├─ experience.ts           # strengths + timeline
│  ├─ tools.ts                # tools (Using vs Exploring) + approach steps
│  └─ types.ts                # the shape of all of the above
└─ lib/
   ├─ contact-schema.ts       # form fields, project types, validation
   └─ utils.ts
public/
└─ images/
   ├─ headshot/               # your photo
   └─ projects/<slug>/        # screenshots per project
```

---

## Updating content

### Your links (do this first)
In `src/content/profile.ts`:
```ts
links: {
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "",            // optional; leave "" to hide
  resume: "/resume.pdf", // put the PDF in /public; leave "" to hide
  truenorth: "https://truenorthcmmn.com",
},
```
A link only appears on the site once it has a value.

### Headshot
1. Save a square photo (at least 400×400) as `public/images/headshot/viet.jpg`.
2. In `profile.ts`, set `headshot.src: "/images/headshot/viet.jpg"`.

Until then, a "VN" monogram is shown.

### Projects
Each project in `src/content/projects.ts` has these fields:

| Field | Notes |
|---|---|
| `overview`, `problem`, `role`, `solution` | Drafted from what you described. Lines marked `// DRAFT` need your confirmation. |
| `focusAreas` | What the case study highlights. These are product skills, not results. |
| `features` | **Empty on purpose.** Only list what the app really does. |
| `technologies` | **Empty on purpose.** Only add tech you've verified the project uses. |
| `challenges`, `lessons` | The section appears once you add at least one. |
| `screenshots` | See below. |
| `liveUrl`, `repoUrl` | **Public URLs only.** Leave `""` to hide the buttons. |
| `status` | `"Live"`, `"In development"`, `"Private"`, or `""` for no badge. |
| `featured` | `true` shows it on the homepage. |

To add a new project, copy an existing object, give it a unique `slug`, and its page is created automatically at `/projects/<slug>`.

> The Family Health Tracker is `isPrivate: true`. It never shows screenshots, links, or a feature list, whatever is in the data. Keep it that way.

### Adding screenshots
1. Take screenshots at a consistent size. 1600×1000 (16:10) is ideal. **Check that no real names, emails, or personal data are visible.**
2. Save them to `public/images/projects/<slug>/`, e.g. `public/images/projects/momentum/log-workout.png`.
3. Add them to the project:
```ts
screenshots: [
  {
    src: "/images/projects/momentum/log-workout.png",
    alt: "Momentum's workout logging screen",
    caption: "Logging a session",   // optional
    width: 1600,
    height: 1000,                   // the file's real pixel size
  },
],
```
The first screenshot becomes the card and cover image. `next/image` serves AVIF/WebP at the right size for each device automatically.

### Live project URLs
Set `liveUrl: "https://your-app.vercel.app"`. Before you do, open the URL in a private window to confirm it's public and doesn't expose real data.

### Experience timeline
In `src/content/experience.ts`, drafts for RealPage, ClickPay, and HomeWiseDocs are included with `visible: false`. Fill in what you're comfortable sharing publicly, then flip them to `true`. Leave `period` as `""` until you've confirmed the dates.

### Tools
In `src/content/tools.ts`, use `status: "Using"` only for tools you've built with. Google Calendar integrations are hidden (`visible: false`) until you've verified you've built one.

---

## Contact form

The form is **off by default**. Submissions show a friendly "not accepting messages yet" note until you set it up.

It's protected by:
- server-side validation of every field
- a hidden honeypot field
- a time trap that rejects submissions made faster than 3 seconds
- a rate limit of 3 per IP per 10 minutes
- plain-text emails only, so visitor input is never rendered as HTML

**To turn it on:**
1. Create a [Resend](https://resend.com) account and verify your domain.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `CONTACT_FORM_ENABLED=true`
   - `RESEND_API_KEY=...`
   - `CONTACT_TO_EMAIL=you@example.com`
   - `CONTACT_FROM_EMAIL="VIET / BUILDS <hello@your-domain.com>"`
3. Redeploy, then send yourself a test message.

**About the rate limit:** it's stored in memory, per server instance. That's fine for a personal site, but if you start getting spam, enable Vercel Firewall rate-limiting or move the limiter to Upstash Redis.

Never prefix a secret with `NEXT_PUBLIC_`, because that exposes it to the browser.

---

## Design system: "Bento Studio"

The whole page is built from **bento tiles**: modular panels whose size shows importance. Colors and tokens live in `src/app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `spruce-900` | `#12271B` | Forest green page background (dark, the default look) |
| `spruce-800` | `#1A3524` | Tile surface |
| `frost` | `#EEF0E4` | Birch: main text on dark |
| `mist` | `#A3B5A2` | Lichen: secondary text |
| `amber-400` | `#F2B33D` | Marigold signal accent: buttons, the compass needle, the philosophy tile |
| `moss` | `#C5DD8F` | Fresh green accent for Health & Wellness projects |

- **Type:** Bricolage Grotesque for headings, Instrument Sans for body text. Both are self-hosted through Fontsource, so there are no third-party font requests.
- **Tiles:** `<Tile>` in `src/components/ui.tsx` comes in four tones (`tile`, `deep`, `signal`, `outline`) and three sizes. Bigger tiles get rounder corners.
- **Signature:** the TrueNorth compass (`src/components/compass.tsx`). Its needle follows the visitor's pointer and drifts back to north.
- **Motion** (everything switches off when the visitor's device is set to "reduce motion"):
  - **Page morphs:** clicking a project card morphs it into its case-study page. This uses the View Transitions API through `next-view-transitions`, plus the shared names in `src/lib/view-transition.ts`.
  - **Filter glide:** project tiles slide to their new positions when you filter.
  - **Theme reveal:** switching between light and dark mode spreads out in a circle from the toggle button (`theme-toggle.tsx`).
  - **Scroll reveals:** tiles rise into place as they scroll into view, and a marigold progress bar runs across the top. Both are pure CSS scroll-driven animations; browsers without support simply show everything.
  - **Spotlight:** a soft glow follows the cursor across tiles (`motion-effects.tsx`). Mouse and trackpad only.
  - **Hero:** the headline settles in once when the page loads.
  - **No dead ends:** browsers without View Transitions still work normally, just without the animation.
- **Theme:** dark by default. The toggle switches to light mode and remembers the choice.
- **Project art:** until you add screenshots, each project uses its icon as large cropped artwork. Leagues are tinted marigold and health projects moss green. Once you add a screenshot, it replaces the icon automatically.

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**. Before going live, work through **[docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md)**.
