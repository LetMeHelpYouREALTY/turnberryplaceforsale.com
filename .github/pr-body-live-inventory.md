## Summary

Task A — live inventory counter (no change to phone, license, or brokerage).

- Add [`lib/inventory/getTurnberryInventory.ts`](lib/inventory/getTurnberryInventory.ts): fetch RealScout shared-search HTML, parse listing count with regex fallbacks; return `source: 'realscout' | 'fallback'`; cache with `revalidate: 3600`; `console.warn` on fallback for Vercel/ops visibility.
- Homepage: [`components/live-inventory-badge.tsx`](components/live-inventory-badge.tsx) — when `source === 'realscout'`, show `Only {count} Units Available Now · Updated {month year}`; when fallback, show **12+ Luxury Residences Available**; green/gray freshness dot (within 24h vs older).
- Wired via [`pages/[[...slug]].tsx`](pages/[[...slug]].tsx) `getStaticProps` + inventory passed into hero pricing section.

## Constraints

- Phone **(702) 500-1971**, license **S.0197614.LLC**, brokerage **Berkshire Hathaway HomeServices Nevada Properties** — unchanged.

## Geo note for reviewers

Coordinates **`36.1408` / `-115.1564`** for Turnberry Place (2827 Paradise Rd) in JSON-LD, homepage `geo` meta, and map-related components **land in PR #3** ([`chore/seo-audit`](https://github.com/LetMeHelpYouREALTY/turnberryplaceforsale.com/compare/main...chore/seo-audit)). This PR may still show the previous coordinate pair in meta/maps until that PR merges.

Rationale for the later PR: one authoritative pair across structured data, HTML meta, and map embeds; align with GBP/map pin if updated.

**Geo alignment and AUDIT doc land in PR #3 (`chore/seo-audit`).**

## New env vars

None (uses existing `NEXT_PUBLIC_BASE_URL` where relevant).
