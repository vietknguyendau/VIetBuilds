# Deploying to GitHub + Vercel

## 1. Push to GitHub

```bash
cd viet-builds
git init
git add .
git commit -m "Initial portfolio"
```

Create an empty repository on GitHub (no README or .gitignore, because those are already here). Then:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/viet-builds.git
git push -u origin main
```

The repo can be **private**. Vercel deploys private repos fine, and nothing sensitive is committed (`.env*.local` is gitignored).

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
2. Framework preset: **Next.js** (auto-detected). Leave the build settings at their defaults.
3. Add an environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` for now. Change it to your custom domain later.
4. Click **Deploy**.

From then on, every `git push` to `main` deploys to production automatically, and other branches get preview URLs.

## 3. Custom domain (optional)

1. In Vercel, go to Project → Settings → Domains and add your domain, e.g. `vietbuilds.com`.
2. Add the DNS records Vercel shows you at your registrar.
3. Update `NEXT_PUBLIC_SITE_URL` to the new domain and **redeploy**. The sitemap, canonical URLs, and Open Graph tags all use this value.

## 4. Turn on the contact form (when ready)

See README → *Contact form*. Add the four variables in Vercel, then redeploy.

## 5. After deploying

- Submit `https://<domain>/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- Paste your URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to check the share preview.
- Add the site to your LinkedIn profile's Featured section and Contact info.
