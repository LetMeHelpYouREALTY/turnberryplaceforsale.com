/**
 * Build-time-stable date constants.
 *
 * These are injected via `next.config.js` `env` at build time and baked into
 * both the server bundle and the client bundle as the exact same string.
 * Using them in rendered components avoids React hydration warnings (#425
 * "Text content does not match server-rendered HTML" / #423 "hydration
 * failed, client rendering whole tree") that would otherwise fire whenever
 * `new Date()` is called in a render path.
 *
 * Timezone for the formatted strings is pinned to America/Los_Angeles
 * (the site's operating market, Las Vegas). The ISO constant is UTC.
 *
 * Use the formatted variants for user-visible copy; use ISO for `<time
 * dateTime>` attributes and JSON-LD `dateModified`.
 */

// ISO 8601 (UTC), e.g. "2026-04-18T03:12:45.678Z" — for `<time dateTime>`
// and schema.org `dateModified` / `datePublished`.
export const BUILD_DATE_ISO: string =
  process.env.NEXT_PUBLIC_BUILD_DATE_ISO || new Date(0).toISOString()

// Long-form, e.g. "April 17, 2026" — for "Last updated:" copy.
export const BUILD_DATE_DISPLAY: string =
  process.env.NEXT_PUBLIC_BUILD_DATE_DISPLAY || ""

// Month + year, e.g. "April 2026" — for coarse freshness labels.
export const BUILD_DATE_MONTH_YEAR: string =
  process.env.NEXT_PUBLIC_BUILD_DATE_MONTH_YEAR || ""
