/**
 * AggregateRating schema helper — env-gated, no-fabrication-safe.
 *
 * Google eligibility for review-star snippets on SERPs requires an
 * AggregateRating attached to a supported entity type (RealEstateAgent,
 * LocalBusiness, ApartmentComplex, etc.). Per CLAUDE.md + the global
 * no-fabricated-social-proof rule, this project will NOT emit an
 * AggregateRating with hardcoded numbers.
 *
 * Both the `ratingValue` and `reviewCount` must be sourced from the
 * operator's verified Google Business Profile and provided via Vercel
 * env vars. When either is missing, this helper returns `undefined`
 * and callers spread conditionally so nothing appears in the emitted
 * JSON-LD graph.
 *
 * Required env vars (set in Vercel once the new GBP has enough reviews
 * for Google's threshold — typically 5+):
 *
 *   NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE  e.g. "5.0"  (1-5, one decimal)
 *   NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT  e.g. "47"   (integer, from GBP dashboard)
 *
 * Per Google's 2026 structured-data guidance, `reviewCount` must be an
 * integer and `ratingValue` must be a number between 1 and 5. Both are
 * validated in this helper; invalid values are treated as absent so
 * malformed env vars cannot ship a broken schema.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */

export type AggregateRating = {
  '@type': 'AggregateRating'
  ratingValue: number
  reviewCount: number
  bestRating: 5
  worstRating: 1
}

/**
 * Returns an AggregateRating object when both env vars are set AND
 * valid, or `undefined` otherwise. Intended usage:
 *
 *   const rating = buildAggregateRating()
 *   const schema = {
 *     '@type': 'RealEstateAgent',
 *     ...(rating ? { aggregateRating: rating } : {}),
 *     ...
 *   }
 */
export function buildAggregateRating(): AggregateRating | undefined {
  const rawValue = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE
  const rawCount = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT

  if (!rawValue || !rawCount) {
    return undefined
  }

  const ratingValue = Number.parseFloat(rawValue)
  const reviewCount = Number.parseInt(rawCount, 10)

  // Validation gates -- invalid env input -> treat as absent -> emit nothing.
  if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    return undefined
  }
  if (!Number.isInteger(reviewCount) || reviewCount < 1) {
    return undefined
  }

  return {
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  }
}
