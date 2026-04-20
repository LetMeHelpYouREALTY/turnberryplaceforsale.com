/**
 * Centralized image `alt` copy for Turnberry Place Las Vegas — SEO + accessibility.
 * Prefer specific, location-aware descriptions; avoid empty alts except decorative cases.
 */

/** When CMS/media omits alt, use this instead of empty string or generic "Image". */
export const TURNBERRY_IMAGE_ALT_FALLBACK =
  'Turnberry Place Las Vegas — luxury high-rise condos near the Strip'

/** Drupal / rich text images without alt in source HTML. */
export const TURNBERRY_RICHTEXT_IMAGE_ALT_FALLBACK =
  'Image — Turnberry Place Las Vegas (set descriptive alt in CMS when possible)'

/**
 * Hero home slideshow — one string per slide, same order as `heroPhotos` in
 * `pages/[[...slug]].tsx` `HomePageContent`.
 */
export const TURNBERRY_HERO_HOME_ALTS: readonly string[] = [
  'Turnberry Place Las Vegas — luxury high-rise condominium towers at 2827 Paradise Rd near the Strip',
  'The Stirling Club cigar lounge — private resident club at Turnberry Place',
  'The Stirling Club dining room — fine dining for Turnberry Place residents',
  'Turnberry Place high-rise condo interior — Las Vegas Strip and valley views',
  'Turnberry Place towers — exterior view toward the Las Vegas Strip',
  'Turnberry Place and Las Vegas Monorail — Paradise Road and resort corridor',
  'Resort-style pool at The Stirling Club — Turnberry Place Las Vegas amenities',
] as const

export function heroSlideAlt(index: number, total: number): string {
  const specific = TURNBERRY_HERO_HOME_ALTS[index]
  if (specific) return specific
  return `Turnberry Place Las Vegas — home hero photo ${index + 1} of ${total}`
}

/** MLS gallery / generic index-based fallback with location context. */
export function mlsGalleryAlt(index: number): string {
  return `Turnberry Place Las Vegas luxury condo — MLS marketing photo ${index + 1}`
}

/** Featured listing card — listing title is required; add context for screen readers. */
export function listingCardImageAlt(
  title: string,
  tower?: string,
  unit?: string,
): string {
  const loc = [tower, unit].filter(Boolean).join(' ')
  return loc ? `${title} — ${loc} — Turnberry Place Las Vegas` : `${title} — Turnberry Place Las Vegas`
}

/** Neighborhood page thumbs — vary by index for uniqueness. */
export function neighborhoodGalleryAlt(index: number): string {
  const scenes = [
    'Turnberry Place neighborhood — Las Vegas Strip and resort corridor context',
    'Paradise Road and high-rise living near the Las Vegas Strip — Turnberry Place area',
    'Luxury high-rise residential setting — Turnberry Place Las Vegas neighborhood',
    'Urban Las Vegas views and guard-gated community — near Turnberry Place',
    'Desert landscaping and tower architecture — Turnberry Place Las Vegas',
    'Evening skyline toward the Strip — Turnberry Place neighborhood',
  ] as const
  return scenes[index] ?? `Turnberry Place neighborhood and area — photo ${index + 1}`
}
