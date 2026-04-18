/**
 * Google Business Profile review URL helpers.
 *
 * Design goals (2026 best practice):
 *
 *   1. NEVER fabricate a place_id. Guessing violates CLAUDE.md / AGENTS.md
 *      "no fabricated social proof" + global SEO rule "no fabricated claims".
 *
 *   2. Prefer explicit, operator-provided URLs via env vars so the reviews
 *      CTA can be flipped on/off per environment without a code redeploy.
 *
 *   3. Fail open with a Google Maps Search URL built from the site's
 *      canonical NAP. The Search URL is documented by Google at
 *      https://developers.google.com/maps/documentation/urls/get-started#search-action
 *      and is stable + self-healing: if Google ever re-keys the place,
 *      the NAP-based query still resolves to the correct entity.
 *
 *   4. Never surface the CTA if the operator has explicitly opted out
 *      via `NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true`.
 *
 * Env precedence (highest wins):
 *
 *   NEXT_PUBLIC_GBP_REVIEWS_URL      — full read-URL, e.g.
 *     https://search.google.com/local/reviews?placeid=ChIJ...
 *
 *   NEXT_PUBLIC_GBP_WRITEREVIEW_URL  — full write-URL, e.g.
 *     https://search.google.com/local/writereview?placeid=ChIJ...
 *     or the g.page/r/... short link from the GBP dashboard
 *
 *   NEXT_PUBLIC_GBP_PLACE_ID         — bare ChIJ... id; helper builds both
 *                                      read + write URLs from it
 *
 *   (none of the above)              — fallback to a Google Maps Search
 *                                      URL using the canonical NAP below
 */

// Canonical NAP for the Turnberry Place building microsite. This must match
// the visible footer, JSON-LD, and GBP so the search URL resolves cleanly.
// Source of truth: components/footer.tsx + CLAUDE.md + AGENTS.md.
const CANONICAL_NAP = {
  name: "Turnberry Place",
  locality: "Las Vegas",
  region: "NV",
  postalCode: "89109",
  streetAddress: "2827 Paradise Rd",
} as const

/**
 * Read flag: set `NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true` in any environment
 * to suppress the reviews CTA entirely (useful during GBP migrations or if
 * the operator wants to hide the CTA before a proper place_id is ready).
 */
export function areReviewsDisabled(): boolean {
  return process.env.NEXT_PUBLIC_GBP_REVIEWS_DISABLED === "true"
}

/**
 * URL that opens the GBP panel with reviews visible. Prefer the explicit
 * read URL, then build from place_id, then fall back to the Maps Search API.
 */
export function getReviewsReadUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_GBP_REVIEWS_URL
  if (explicit) return explicit

  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID
  if (placeId) {
    return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`
  }

  return buildMapsSearchUrl()
}

/**
 * URL that opens the GBP "write a review" form directly. Useful for a
 * "Leave a Review" secondary CTA. Same precedence as read URL.
 */
export function getReviewsWriteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_GBP_WRITEREVIEW_URL
  if (explicit) return explicit

  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID
  if (placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
  }

  // No dedicated writereview fallback exists in the Maps URL API when
  // place_id isn't known — the search URL is the best safe default.
  return buildMapsSearchUrl()
}

/**
 * Documented Google Maps URL API search action. Stable contract since 2017.
 * @see https://developers.google.com/maps/documentation/urls/get-started#search-action
 */
function buildMapsSearchUrl(): string {
  const query = [
    CANONICAL_NAP.name,
    CANONICAL_NAP.streetAddress,
    CANONICAL_NAP.locality,
    CANONICAL_NAP.region,
    CANONICAL_NAP.postalCode,
  ].join(" ")
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
