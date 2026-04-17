# Claude Code — Turnberry Place For Sale

## What this repo is

Marketing site for **Turnberry Place** luxury high-rise condos (Las Vegas). **Next.js 14** (Pages Router) + headless **Drupal** (JSON:API), TypeScript, Tailwind. Deployed on **Vercel**.

## Agent / brand (single source of truth)

- **Dr. Jan Duffy** (not “Janet”). License **S.0197614.LLC**, **Berkshire Hathaway HomeServices Nevada Properties**.
- Keep **NAP** (name, address, phone) and JSON-LD aligned with **Google Business Profile** on pages you touch. Do not invent stats, rankings, or review counts.

## Commands

- Dev: `npm run dev` — port **3001** (see `package.json`).
- Lint: `npm run lint` (requires ESLint configured locally).
- Production parity: `npm run vbuild` (`npx vercel build`) when validating deploy-related issues.

## Environment

- Copy from `.env.example`. Production needs **`NEXT_PUBLIC_DRUPAL_BASE_URL`** or the build fails during data collection.
- **`NEXT_PUBLIC_BASE_URL`**: use **`https://www.turnberryplaceforsale.com`** in production (matches middleware apex → `www` and sitemap/canonical behavior).

## Architecture notes

- **Dynamic Drupal pages**: `pages/[[...slug]].tsx`.
- **Static marketing routes**: individual files under `pages/` (e.g. `available-condos`, `agent`, `mls`).
- **Blog**: `pages/blog/page/[page].tsx`; `/blog` rewrites to `/blog/page/0` in `next.config.js`.
- **Middleware** (`middleware.ts`): HTTPS, non-`www` → `www`, trailing-slash normalization. Keep behavior consistent with canonical URLs in `components/meta.tsx` and `pages/sitemap.xml.ts`.

## SEO / Search

- **Heading hierarchy**: the home page should expose **one `<h1>`** (hero in `HeroSlideshow`); section titles use `<h2>` / `<h3>`.
- **Home valuation** (RealScout `realscout-home-value`): lives on **`/price-features#home-value-estimate`**, not on `/`, to avoid a second widget script on the homepage.
- **`public/robots.txt`**: do **not** add `Disallow: /_next/` — crawlers need `/_next/static` assets to render. Sitemap URL is listed at the bottom of `robots.txt`.
- **Sitemap**: `pages/sitemap.xml.ts` → `/sitemap.xml`.
- Optional GSC HTML tag: **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** (see `pages/_document.tsx`).

## RealScout

- Script/widgets use **`em.realscout.com`**; API traffic may use **`www.realscout.com`**. If you add CSP or security headers, allow both for scripts and connections.
- Avoid duplicate script loads per page; follow existing patterns in `pages/[[...slug]].tsx` and listing pages.

## IDX / MLS

- **Do not edit `components/idx/*`** unless the user explicitly approves. Preserve MLS disclaimers and attribution anywhere listings appear.

## Typography

- **Two webfonts only:** Playfair Display (headings / nav) and Inter (body, buttons, UI). Do not add Google Font imports or `font-family` stacks with extra branded faces (legacy Cinzel/Questrial were removed).

## Change discipline

- Prefer minimal diffs; match existing patterns (imports, `Meta`, `Layout`).
- Do not commit secrets; use Vercel env for production values.
- After non-trivial edits, run lint on touched files when the toolchain is available.
