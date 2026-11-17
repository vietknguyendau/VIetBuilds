# Pre-launch checklist

Work through this before sharing the link publicly. Each item needs a person to check it.

## Content & truthfulness
- [ ] Run `npm run dev` and scroll every page. No dashed **TODO** boxes should be left that you care about.
- [ ] Every line marked `// DRAFT` in `src/content/projects.ts` is confirmed or rewritten in your own words.
- [ ] `features` and `technologies` list only things each project really has or uses.
- [ ] No invented metrics, user counts, results, or testimonials anywhere.
- [ ] Experience entries: roles and dates are accurate, and you're comfortable making them public.
- [ ] Tools: "Using" contains only tools you've actually built with.
- [ ] The headshot is added, or you're happy with the monogram.
- [ ] LinkedIn URL is set and opens your profile.
- [ ] The résumé PDF (if linked) is current, and its contact details are the ones you want public.

## Privacy & security
- [ ] The Family Health Tracker page shows no screenshots, data, links, or family details.
- [ ] Screenshots contain no real names, emails, phone numbers, or league members' personal info.
- [ ] Every `repoUrl` is a **public** repo, and every `liveUrl` works logged out without exposing private data.
- [ ] No API keys in the code: `git grep -i "key\|secret\|token"` comes back clean.
- [ ] Secrets are set only in Vercel's environment variables, and none of them start with `NEXT_PUBLIC_`.

## Functionality
- [ ] `npm run build` succeeds with no errors.
- [ ] `npm run lint` and `npm run typecheck` pass.
- [ ] All nav links scroll to the right section, both from the homepage and from a project page.
- [ ] Project filters work on the homepage and on `/projects`.
- [ ] Every project card opens its case study, and "Next project" cycles through them.
- [ ] `/some-bad-url` shows the custom 404.
- [ ] `/sitemap.xml` and `/robots.txt` load and use your real domain.
- [ ] Contact form, if enabled:
  - [ ] Submitting empty shows field errors.
  - [ ] A bad email shows an error.
  - [ ] A real submission arrives in your inbox, and Reply goes to the sender.
  - [ ] The 4th submission within 10 minutes is rate-limited.
- [ ] Contact form, if disabled: submitting shows the "not accepting messages yet" note.

## Devices & browsers
- [ ] iPhone Safari: mobile menu opens and closes, the page doesn't scroll behind the menu, and nothing overflows sideways.
- [ ] Android Chrome.
- [ ] Desktop Chrome, Safari, and Firefox.
- [ ] Light and dark mode both look right, the toggle remembers your choice, and the OS setting is respected on a first visit.

## Accessibility
- [ ] Tab through the whole homepage with a keyboard. The focus ring is always visible and the order makes sense.
- [ ] The "Skip to content" link appears on the first Tab.
- [ ] Escape closes the mobile menu.
- [ ] With OS "Reduce motion" turned on, there are no animations.
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) on `/` and on one project page. Aim for 90+ on Accessibility, SEO, and Best Practices.

## Sharing
- [ ] The LinkedIn Post Inspector shows the right title, description, and image.
- [ ] The sitemap is submitted to Google Search Console.
