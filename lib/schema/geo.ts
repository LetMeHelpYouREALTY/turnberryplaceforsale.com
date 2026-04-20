/**
 * Turnberry Place (2827 Paradise Rd, Las Vegas, NV 89109) — WGS84 pin used in JSON-LD,
 * geo meta, maps, and `TURNBERRY_MAPS_Q_LATLNG`. Aligned to GBP / on-map location;
 * update if the listing pin moves.
 */
export const TURNBERRY_GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: '36.137775',
  longitude: '-115.155748',
}

/** Numeric WGS84 — map APIs, `GBP_GEO`, JSON-LD number fields. */
export const TURNBERRY_GEO_LAT = Number(TURNBERRY_GEO.latitude)
export const TURNBERRY_GEO_LNG = Number(TURNBERRY_GEO.longitude)

/** Default `@react-google-maps/api` center + static map centers. */
export const TURNBERRY_MAP_CENTER = {
  lat: TURNBERRY_GEO_LAT,
  lng: TURNBERRY_GEO_LNG,
} as const

/**
 * Google Maps `q=` / `query=` value (comma-separated lat,lng, no spaces).
 * Pin-accurate fallback when Place ID is unset.
 */
export const TURNBERRY_MAPS_Q_LATLNG = `${TURNBERRY_GEO.latitude},${TURNBERRY_GEO.longitude}`

/** Value for HTML `<meta name="geo.position" content="…">` (semicolon-separated). */
export const TURNBERRY_GEO_POSITION_META = `${TURNBERRY_GEO.latitude};${TURNBERRY_GEO.longitude}`

/** Value for `<meta name="ICBM" content="…">`. */
export const TURNBERRY_ICBM_META = `${TURNBERRY_GEO.latitude}, ${TURNBERRY_GEO.longitude}`
