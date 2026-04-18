## Summary

Task C — SEO/perf/a11y audit deliverable + quick wins: geo alignment, sitemap, robots, FAQ/schema refresh, neighborhood copy, accessibility statement date.

See full audit: [`AUDIT_2026-04-17.md`](AUDIT_2026-04-17.md) (this PR).

---

## Lighthouse baseline (production, lab)

Scores 0–100. Re-run after deploy.

### Desktop (`--preset=desktop`)

| URL | Performance | Accessibility | Best Practices | SEO |
|-----|-------------|-----------------|----------------|-----|
| `/` | 85 | 92 | 77 | 100 |
| `/available-condos` | 88 | 90 | 77 | 100 |
| `/towers` | 97 | 96 | 77 | 100 |
| `/amenities` | 94 | 100 | 77 | 100 |
| `/stirling-club` | 87 | 96 | 77 | 100 |
| `/agent` | 98 | 92 | 77 | 100 |

### Mobile (`--form-factor=mobile`, homepage only)

| URL | Performance | Accessibility | Best Practices | SEO |
|-----|-------------|-----------------|----------------|-----|
| `/` | 36 | 88 | 77 | 100 |

### Core Web Vitals (lab, homepage desktop snapshot)

| Metric | Value | Flag (threshold) |
|--------|-------|------------------|
| LCP | ~1.9 s | Good (< 2.5 s) |
| FCP | ~0.6 s | Good |

Mobile homepage LCP/TBT drive the low Performance score; **mobile LCP & main-thread work** are the top perf priority.

---

## Fixed in this PR

- **Structured data / AI citation:** FAQ copy updated to eight prompt questions (aligned with `TURNBERRY_FAQ_ITEMS` + visible `HomeFaqSection`). `RealEstateAgent` includes `recognizedBy` (Nevada Real Estate Division) and license `identifier`; `knowsAbout` / `areaServed` expanded per spec.
- **ApartmentComplex:** Default description and amenity list aligned with spec; **`containsPlace`** lists four tower `Residence` stubs with `numberOfRooms` range.
- **Geo consistency:** `36.1408` / `-115.1564` in `lib/schema/geo.ts`, homepage meta (`geo.position` / `ICBM`), map center, interactive map default, `map-place-schema`, and neighborhood embed (query-based Google Maps URL for 2827 Paradise Rd).
- **Sitemap:** `/available-condos?tower=1` … `tower=4` entries in [`pages/sitemap.xml.ts`](pages/sitemap.xml.ts) (Pages Router; not `app/sitemap.ts`).
- **robots.txt:** Explicit `Allow: /` for Googlebot, Bingbot, GPTBot, CCBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended (in addition to `User-agent: *`).
- **Accessibility statement:** “Last updated” uses build-time `toLocaleDateString`.
- **Neighborhood / hyperlocal:** Prime location mentions Fashion Show Mall and Las Vegas Monorail alongside Wynn/Encore/Convention Center context.

---

## Quick wins — next sprint

- **Mobile Performance (homepage ~36):** LCP image (`fetchPriority`, `sizes`, AVIF/WebP), reduce critical-path JS, defer non-critical scripts.
- **Best Practices (~77 sitewide):** third-party cookies, deprecations, console errors (often analytics/widgets).
- **Re-run Lighthouse** after each release; `lighthouse-*.json` gitignored for local runs.

## Needs product / stakeholder decision

- Mobile Performance ≥ 90 may require hero asset swap, font subsetting, or widget scope.
- **ItemList / Product JSON-LD** for `/available-condos` deferred (MLS/IDX / RealScout attribution).
- **`sameAs`** social URLs omitted until verified.

## Top 3 highest-leverage changes

1. **Mobile LCP & blocking time** — largest gap vs goals; helps users and crawl rendering.
2. **Image pipeline** — hero + gallery `alt`, `priority` only where needed, lazy below fold.
3. **Post-deploy validation** — Schema.org + Rich Results on `/`, `/towers`; GSC sitemap coverage.

## Follow-ups

- [ ] Merge order: `feat/live-inventory` → `main`, then `feat/jsonld-schema`, then this branch (or squash per workflow).
- [ ] Re-run Lighthouse after deploy; update `AUDIT_2026-04-17.md` if scores move materially.

---

## Geo note for reviewers

This PR **applies** coordinates **`36.1408` / `-115.1564`** repo-wide for Turnberry Place (2827 Paradise Rd):

- [`lib/schema/geo.ts`](lib/schema/geo.ts)
- [`pages/[[...slug]].tsx`](pages/[[...slug]].tsx) (`geo.position` / `ICBM`)
- [`pages/map.tsx`](pages/map.tsx), [`components/interactive-map.tsx`](components/interactive-map.tsx), [`components/map-place-schema.tsx`](components/map-place-schema.tsx)
- [`components/neighborhood-section.tsx`](components/neighborhood-section.tsx) (Maps embed)

Align with Google Business Profile / map pin if the business updates the pin.

## Files to skim

[`AUDIT_2026-04-17.md`](AUDIT_2026-04-17.md), [`public/robots.txt`](public/robots.txt), [`pages/sitemap.xml.ts`](pages/sitemap.xml.ts)
