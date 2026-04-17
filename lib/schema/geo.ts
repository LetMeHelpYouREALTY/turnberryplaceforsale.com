/**
 * Single source for Turnberry Place geo coordinates (aligned with pages/[[...slug]].tsx
 * meta geo.position and on-page consistency). Document in PR when changing.
 */
export const TURNBERRY_GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: '36.1447',
  longitude: '-115.1541',
}
