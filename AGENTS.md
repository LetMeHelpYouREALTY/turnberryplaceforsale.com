# Agents (Cursor & AI tooling)

## Primary instructions

Read **`CLAUDE.md`** in this repository root first. It defines stack facts, brand/NAP rules, SEO constraints, RealScout/IDX guardrails, and change discipline for this project.

This file exists so Cursor and other agents that prefer **`AGENTS.md`** load the same expectations without duplicating long policy.

## Quick constraints

- **Framework**: Next.js **Pages Router** (`pages/`), not App Router (`app/`).
- **Canonical host**: **`https://www.turnberryplaceforsale.com`** for `NEXT_PUBLIC_BASE_URL` in production (middleware enforces `www`).
- **Do not edit** `components/idx/*` without explicit user approval (MLS compliance).
- **Secrets**: never commit live keys; use Vercel env and `.env.example` patterns.
- **Standards baseline**: apply official best practices as of **April 2026**; verify material framework/SEO/platform changes against current docs before implementing.
- **Cursor — anchors, alt, schema entities, semantic copy, internal links:** follow `.cursor/rules/turnberry-seo-links-schema-accessibility.mdc` (re-review that rule quarterly; search and framework guidance change often).

## Optional user rules

If the developer uses global Cursor rules (SEO, NAP, CSP, etc.), treat them as additive to **`CLAUDE.md`**. When they conflict on this repo, prefer **`CLAUDE.md`** + explicit user instruction in chat.
