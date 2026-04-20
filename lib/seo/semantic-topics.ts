/**
 * Topical vocabulary for Turnberry Place — supports natural semantic coverage in
 * titles, descriptions, and schema (often called “LSI keywords” in legacy SEO).
 * Modern search models topics and intent; use these phrases in readable copy, not as stuffing.
 */

import { GBP_PHONE_DISPLAY } from 'lib/google-business-profile'

/** Sitewide title reinforcement — keep aligned with `Meta` / homepage. */
export const PRIMARY_KEYWORD_1 = 'Turnberry Towers Las Vegas High Rise Condos'
export const PRIMARY_KEYWORD_2 = 'Las Vegas Strip High Rise Condos for Sale'

/**
 * Curated related terms by theme (location, product, amenities, intent).
 * Used for the meta keywords tag and to enrich `knowsAbout` / copy consistently.
 */
export const SEMANTIC_TOPIC_CLUSTERS = {
  location: [
    'Paradise Road Las Vegas',
    'Las Vegas NV 89109',
    'Strip-adjacent luxury condos',
    'Wynn Encore corridor',
    'resort corridor Las Vegas',
  ],
  community: [
    'guard-gated high-rise',
    'four-tower condominium',
    'Turnberry Place for sale',
    'luxury condos Las Vegas',
  ],
  residences: [
    'penthouse Strip views',
    'high-rise terraces',
    'luxury condo floor plans',
  ],
  amenities: [
    'Stirling Club Las Vegas',
    'private resident club',
    'resort-style pool Las Vegas',
  ],
  market: [
    'Las Vegas luxury real estate',
    'high-rise condo specialist',
    'Berkshire Hathaway HomeServices Nevada Properties',
  ],
} as const

/** Flat list for `<meta name="keywords">` — deduped, comma-separated. */
export function buildDefaultMetaKeywords(): string {
  const core = [
    PRIMARY_KEYWORD_1,
    PRIMARY_KEYWORD_2,
    'Turnberry Place for sale',
    'Turnberry Place condos',
    'Las Vegas high-rise condos',
    'luxury condos Las Vegas',
    'Las Vegas Strip condos',
    'Dr. Jan Duffy REALTOR',
  ] as const

  const thematic = [
    ...SEMANTIC_TOPIC_CLUSTERS.location,
    ...SEMANTIC_TOPIC_CLUSTERS.community,
    ...SEMANTIC_TOPIC_CLUSTERS.residences,
    ...SEMANTIC_TOPIC_CLUSTERS.amenities,
    ...SEMANTIC_TOPIC_CLUSTERS.market,
  ]

  const seen = new Set<string>()
  const out: string[] = []
  for (const phrase of [...core, ...thematic]) {
    const k = phrase.toLowerCase().trim()
    if (seen.has(k)) continue
    seen.add(k)
    out.push(phrase)
  }
  return out.join(', ')
}

/**
 * Default meta / OG / Twitter description when a page omits `description`.
 * Weaves primary phrases with location + amenity semantics in one natural paragraph.
 */
export function buildDefaultMetaDescription(
  phoneDisplay: string = GBP_PHONE_DISPLAY,
): string {
  return (
    'Turnberry Place luxury high-rise condos on Paradise Road in Las Vegas, NV 89109 — ' +
    'a guard-gated four-tower community one block from the Strip with The Stirling Club, ' +
    'penthouse and terrace homes from about $800K to $10M+. ' +
    `${PRIMARY_KEYWORD_1} & ${PRIMARY_KEYWORD_2}. ` +
    `Call ${phoneDisplay}.`
  )
}

/** Short list for JSON-LD `knowsAbout` / similar — no duplication of full keywords string. */
export const AGENT_KNOWS_ABOUT_SEMANTIC: readonly string[] = [
  'Luxury high-rise condos',
  'Turnberry Place',
  'Las Vegas Strip real estate',
  'The Stirling Club',
  'Paradise Road Las Vegas',
  'Guard-gated condominium communities',
  'Las Vegas penthouse market',
]
