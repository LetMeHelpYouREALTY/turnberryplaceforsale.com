## Summary

Task B — modular JSON-LD for AI citation and rich results.

- Builders under [`lib/schema/`](lib/schema/) composed by [`components/json-ld-schema.tsx`](components/json-ld-schema.tsx): RealEstateAgent, ApartmentComplex (listing count when RealScout matches Task A), FAQPage, BreadcrumbList, Organization on homepage; agent-only on interior routes as wired.
- Homepage: **3+** `application/ld+json` blocks (agent + complex + FAQ + breadcrumbs + org).
- [`pages/towers.tsx`](pages/towers.tsx): [`JsonLdSchema`](components/json-ld-schema.tsx) + [`TowersSchema`](components/towers-schema.tsx) (ApartmentComplex + per-tower `Residence` graphs).
- [`components/breadcrumb-schema.tsx`](components/breadcrumb-schema.tsx) delegates to shared [`buildBreadcrumbListSchema`](lib/schema/breadcrumbList.ts).

## Not in this PR

Full FAQ refresh, geo alignment repo-wide, sitemap `?tower=` URLs, robots AI crawler lines, and [`AUDIT_2026-04-17.md`](AUDIT_2026-04-17.md) — see **PR #3** (`chore/seo-audit`).

## Geo note for reviewers

Coordinates **`36.1408` / `-115.1564`** in [`lib/schema/geo.ts`](lib/schema/geo.ts) and related files are applied in **PR #3**; this branch may still use the earlier pair until that merge.

**Geo alignment and AUDIT doc land in PR #3 (`chore/seo-audit`).**

## Follow-up (post-merge)

- [Schema.org Validator](https://validator.schema.org/) on `/` and `/towers`
- [Google Rich Results Test](https://search.google.com/test/rich-results) for FAQ + agent

## New env vars

None.
