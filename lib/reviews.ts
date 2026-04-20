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

// Canonical NAP for the Google Business Profile that owns reviews relevant
// to this site.
//
// Target GBP (as of 2026-04-18, pending Google verification — the 20th
// location in the Dr. Jan Duffy portfolio, following the verified
// sibling-listing naming pattern used across the other 19 offices):
//
//   Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy
//   2827 Paradise Rd, Las Vegas, NV 89109  (staffed office Suite 2, 1st floor — see GBP_WAYFINDING)
//
// This is a NEW GBP specifically created for the Turnberry Place team's
// office at 2827 Paradise Rd, distinct from Dr. Duffy's other verticals
// (Arts District / Centennial Hills / Affordable Homes / Strip High Rise
// / MacDonald Highlands). Business name matches exactly what's registered
// so the Google Maps URL API search action resolves straight to this GBP
// once verification completes -- no code change required on verify day.
//
// OPERATIONAL WORKFLOW while the GBP is pending verification:
//
//   1. NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true should be set in Vercel to
//      hide the CTAs site-wide. Avoids sending visitors to disambiguation
//      pages or the HOA-owned Turnberry Place building listing during
//      the pending window.
//   2. When Google verifies the new GBP, remove (or set to "false") the
//      disabled flag in Vercel. Maps search URL below snaps into place
//      immediately.
//   3. Grab the place_id from Google's Place ID Finder or the GBP
//      dashboard and paste it into NEXT_PUBLIC_GBP_PLACE_ID in Vercel
//      to upgrade from "Maps search" to a deep-link into the reviews
//      tab (https://search.google.com/local/reviews?placeid=...).
//
// See .env.example for env var reference and lib/google-business-profile.ts
// for the wider set of GBP-related constants (hours, floor, etc.) used by
// the GBPMapCard component and the RealEstateAgent schema.
const CANONICAL_NAP = {
  name: "Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy",
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
