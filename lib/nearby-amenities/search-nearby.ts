import { NEARBY_AMENITIES_COMMUNITY } from 'lib/nearby-amenities/config'

const cache = new Map<string, Promise<google.maps.places.Place[]>>()

export function searchNearbyCategory(
  categoryId: string,
  types: string[],
  center: google.maps.LatLngLiteral = NEARBY_AMENITIES_COMMUNITY.center,
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId)
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary
      const PlaceWithSearchNearby = Place as typeof Place & {
        searchNearby: (req: {
          fields: string[]
          locationRestriction: { center: google.maps.LatLngLiteral; radius: number }
          includedPrimaryTypes: string[]
          maxResultCount: number
          rankPreference?: string
        }) => Promise<{ places: google.maps.places.Place[] }>
      }
      const { places } = await PlaceWithSearchNearby.searchNearby({
        fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', 'id'],
        locationRestriction: { center, radius: 5000 },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: 'POPULARITY',
      })
      return places
    })()
    p.catch(() => cache.delete(categoryId))
    cache.set(categoryId, p)
  }
  return p
}

export function placeLocationToLiteral(
  location: google.maps.places.Place['location'],
): google.maps.LatLngLiteral | null {
  if (!location) return null
  if (typeof location.lat === 'function' && typeof location.lng === 'function') {
    return { lat: location.lat(), lng: location.lng() }
  }
  return null
}
