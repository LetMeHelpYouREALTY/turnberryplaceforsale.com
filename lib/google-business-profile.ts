/**
 * Google Business Profile — single source of truth
 * =================================================
 *
 * Central constants + helpers for the Turnberry Place GBP (location #20
 * in the Dr. Jan Duffy portfolio, 2827 Paradise Rd, 1st floor).
 *
 * Everything that should match GBP 1:1 lives here:
 *   - NAP (name / address / phone / email)
 *   - Geo coordinates
 *   - Business hours (+ schema.org `openingHoursSpecification` builder)
 *   - Wayfinding copy (floor, access notes)
 *   - Map embed URL (Place-ID anchored when env is set, NAP-query fallback)
 *   - Directions URL (Place-ID when set, address fallback)
 *   - Reviews / write-review URLs (delegated to lib/reviews.ts)
 *
 * 2026 GBP best practices enforced:
 *   - No fabricated place_id / cid / rating / reviewCount
 *   - Graceful degradation: until env is set, the Maps search URL API
 *     resolves through Google's own disambiguation using the canonical
 *     name + address — same mechanism Google recommends in the URL API
 *     docs (https://developers.google.com/maps/documentation/urls/get-started).
 *   - Reviews CTA can be killed site-wide via NEXT_PUBLIC_GBP_REVIEWS_DISABLED
 *     during the GBP verification window so visitors never land on a wrong
 *     listing.
 *   - Strict alignment with lib/reviews.ts `CANONICAL_NAP` — the two files
 *     MUST agree on `name` + `streetAddress` or the Maps search fallback
 *     will resolve to a different entity than the schema describes.
 *
 * Reusability: this file is intended to be the ONE file you hand-edit when
 * cloning this repo for the 21st, 22nd, etc. Dr. Jan Duffy office. Change
 * the constants here, redeploy, and every page / schema / CTA updates.
 */

import { areReviewsDisabled, getReviewsReadUrl, getReviewsWriteUrl } from 'lib/reviews'
import { TURNBERRY_GEO_LAT, TURNBERRY_GEO_LNG, TURNBERRY_MAPS_Q_LATLNG } from 'lib/schema/geo'

// ---------------------------------------------------------------------------
// 1. Canonical NAP (must match GBP Business Profile exactly)
// ---------------------------------------------------------------------------

export const GBP_NAME = 'Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy'

/** Agent identity for the licensed human — stays a person per Nevada Real Estate Division rules. */
export const GBP_AGENT_NAME = 'Dr. Jan Duffy, REALTOR'

/** Supervising brokerage (required on all Nevada real estate advertising per NAC 645.610). */
export const GBP_BROKERAGE = 'Berkshire Hathaway HomeServices Nevada Properties'

/** Nevada Real Estate Division salesperson license. */
export const GBP_LICENSE = 'S.0197614.LLC'

/** Building line (suite / wayfinding is `GBP_WAYFINDING`, not duplicated here). */
export const GBP_ADDRESS = {
  streetAddress: '2827 Paradise Rd',
  addressLocality: 'Las Vegas',
  addressRegion: 'NV',
  postalCode: '89109',
  addressCountry: 'US',
} as const

/** Human-readable one-line address (visible NAP + Maps search fallback text). */
export const GBP_ADDRESS_LINE = '2827 Paradise Rd, Las Vegas, NV 89109'

/**
 * Wayfinding note for visitors — NOT part of the formal `streetAddress`
 * schema field. The office is Suite 2 on the 1st floor.
 */
export const GBP_WAYFINDING = 'Suite 2 · 1st floor' as const

export const GBP_PHONE_DISPLAY = '(702) 500-1971'
export const GBP_PHONE_TEL = '+17025001971'

export const GBP_EMAIL = 'DrDuffy@TurnberryPlaceForSale.com'

/** Derived from `lib/schema/geo.ts` TURNBERRY_GEO (single source of truth). */
export const GBP_GEO = {
  latitude: TURNBERRY_GEO_LAT,
  longitude: TURNBERRY_GEO_LNG,
} as const

// ---------------------------------------------------------------------------
// 2. Business hours (single source for UX + JSON-LD)
// ---------------------------------------------------------------------------

/**
 * Hours for the staffed office at 2827 Paradise Rd, 1st floor.
 * Source: Google Business Profile main hours (operator-verified 2026-04-19).
 *   Sun, Tue–Sat: 8:00 AM – 7:00 PM
 *   Mon:            Closed
 *
 * IMPORTANT: keep this shape so `buildOpeningHoursSpecification()` can
 * emit schema.org-valid 24h strings ("HH:MM"). Times below are LOCAL
 * (America/Los_Angeles, same zone the site uses for build-dates).
 */
type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type HoursRow = {
  /** Sorted display order key (Mon=0 … Sun=6). */
  order: number
  /** Human label rendered in the UI ("Mon", "Tue", …, "Sun"). */
  label: string
  /** schema.org `DayOfWeek` enum value. */
  dayOfWeek: DayOfWeek
  /** 12h display like "6 AM – 10 PM"; empty string when closed. */
  display: string
  /** 24h opens / closes for schema.org. Both null when closed. */
  opens: string | null
  closes: string | null
  closed: boolean
}

export const GBP_HOURS: readonly HoursRow[] = [
  { order: 0, label: 'Mon', dayOfWeek: 'Monday',    display: 'Closed',            opens: null,    closes: null,    closed: true  },
  { order: 1, label: 'Tue', dayOfWeek: 'Tuesday',   display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
  { order: 2, label: 'Wed', dayOfWeek: 'Wednesday', display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
  { order: 3, label: 'Thu', dayOfWeek: 'Thursday',  display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
  { order: 4, label: 'Fri', dayOfWeek: 'Friday',    display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
  { order: 5, label: 'Sat', dayOfWeek: 'Saturday',  display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
  { order: 6, label: 'Sun', dayOfWeek: 'Sunday',    display: '8:00 AM – 7:00 PM', opens: '08:00', closes: '19:00', closed: false },
]

type OpeningHoursSpecification = {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: DayOfWeek[]
  opens: string
  closes: string
}

/**
 * Build schema.org `openingHoursSpecification` entries, collapsing
 * consecutive days that share the same opens/closes window into a
 * single entry (Google Rich Results Test prefers this compact form).
 * Closed days are omitted per schema.org convention.
 */
export function buildOpeningHoursSpecification(): OpeningHoursSpecification[] {
  const open = GBP_HOURS.filter((row) => !row.closed && row.opens && row.closes)
  const groups: Record<string, DayOfWeek[]> = {}
  for (const row of open) {
    const key = `${row.opens}-${row.closes}`
    if (!groups[key]) groups[key] = []
    groups[key].push(row.dayOfWeek)
  }
  return Object.entries(groups).map(([key, days]) => {
    const [opens, closes] = key.split('-')
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens,
      closes,
    }
  })
}

// ---------------------------------------------------------------------------
// 3. Place ID / CID / map embed URL
// ---------------------------------------------------------------------------

/**
 * GBP Place ID. Set in Vercel env once the GBP is verified and the ID is
 * copied from Google's Place ID Finder or the GBP dashboard. When unset,
 * every helper below falls back to a NAP-based query that auto-resolves
 * to the correct GBP as soon as verification completes — no code change
 * required on verify day.
 */
export function getPlaceId(): string {
  return process.env.NEXT_PUBLIC_GBP_PLACE_ID ?? ''
}

/**
 * Map embed URL for use as `<iframe src>`.
 * Returns a Place-ID-anchored embed when NEXT_PUBLIC_GBP_PLACE_ID is set;
 * otherwise falls back to the classic `/maps?q=...&output=embed` form,
 * which works without an API key.
 *
 * Note: the Place-ID embed (`/maps/embed/v1/place`) requires
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. When only the Place ID is known but
 * no API key is available, we still prefer the simpler `?q=place_id:...`
 * form over a naked address query.
 */
export function getMapEmbedUrl(): string {
  const placeId = getPlaceId()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (placeId && apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      apiKey,
    )}&q=place_id:${encodeURIComponent(placeId)}&zoom=16`
  }

  if (placeId) {
    return `https://www.google.com/maps?q=place_id:${encodeURIComponent(
      placeId,
    )}&output=embed`
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(TURNBERRY_MAPS_Q_LATLNG)}&output=embed`
}

/** Directions deep-link — opens Google Maps with the destination prefilled. */
export function getDirectionsUrl(): string {
  const placeId = getPlaceId()
  if (placeId) {
    // `destination_place_id` pairs with `destination` per the URL API spec.
    return (
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${encodeURIComponent(GBP_ADDRESS_LINE)}` +
      `&destination_place_id=${encodeURIComponent(placeId)}`
    )
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    TURNBERRY_MAPS_Q_LATLNG,
  )}`
}

/** Opens the full GBP listing on Google Maps (not just reviews). */
export function getMapsListingUrl(): string {
  const placeId = getPlaceId()
  if (placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(
      placeId,
    )}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    TURNBERRY_MAPS_Q_LATLNG,
  )}`
}

// ---------------------------------------------------------------------------
// 4. Reviews — re-export existing helpers from lib/reviews.ts for one-stop import
// ---------------------------------------------------------------------------

export {
  areReviewsDisabled as gbpReviewsDisabled,
  getReviewsReadUrl as getGbpReviewsUrl,
  getReviewsWriteUrl as getGbpWriteReviewUrl,
}
