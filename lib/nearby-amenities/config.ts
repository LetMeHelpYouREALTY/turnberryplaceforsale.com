import { TURNBERRY_MAP_CENTER } from 'lib/schema/geo'

/** Turnberry Place — 2827 Paradise Rd (WGS84 pin in lib/schema/geo.ts, aligned to GBP). */
export const NEARBY_AMENITIES_COMMUNITY = {
  name: 'Turnberry Place',
  shortName: 'Turnberry Place',
  city: 'Las Vegas',
  state: 'NV',
  postalCode: '89109',
  streetAddress: '2827 Paradise Rd',
  fullAddress: '2827 Paradise Rd, Las Vegas, NV 89109',
  center: TURNBERRY_MAP_CENTER,
} as const

export const NEARBY_AMENITIES_PAGE_PATH = '/nearby-amenities'

/**
 * High-rise / Strip-adjacent category order (condo sites).
 * Schools last — secondary for this buyer profile.
 */
export type NearbyAmenityCategoryId =
  | 'all'
  | 'restaurants'
  | 'entertainment'
  | 'parking'
  | 'grocery'
  | 'fitness'
  | 'cafes'
  | 'shopping'
  | 'healthcare'
  | 'pharmacies'
  | 'parks'
  | 'golf'
  | 'schools'

export type NearbyAmenityCategory = {
  id: NearbyAmenityCategoryId
  label: string
  /** Maps to `Place.category` in curated data */
  dataCategory: string | null
  /** Places API (New) primary types — used when live search is available */
  placesPrimaryTypes?: string[]
  icon: string
}

export const NEARBY_AMENITY_CATEGORIES: NearbyAmenityCategory[] = [
  { id: 'all', label: 'All', dataCategory: null, icon: '🗺️' },
  {
    id: 'restaurants',
    label: 'Restaurants',
    dataCategory: 'dining',
    placesPrimaryTypes: ['restaurant'],
    icon: '🍽️',
  },
  {
    id: 'entertainment',
    label: 'Attractions',
    dataCategory: 'entertainment',
    placesPrimaryTypes: ['tourist_attraction', 'casino'],
    icon: '🎭',
  },
  {
    id: 'parking',
    label: 'Parking',
    dataCategory: 'parking',
    placesPrimaryTypes: ['parking'],
    icon: '🅿️',
  },
  {
    id: 'grocery',
    label: 'Grocery',
    dataCategory: 'grocery',
    placesPrimaryTypes: ['grocery_store', 'supermarket'],
    icon: '🛒',
  },
  {
    id: 'fitness',
    label: 'Fitness',
    dataCategory: 'fitness',
    placesPrimaryTypes: ['gym'],
    icon: '💪',
  },
  {
    id: 'cafes',
    label: 'Cafes',
    dataCategory: 'coffee',
    placesPrimaryTypes: ['cafe', 'coffee_shop'],
    icon: '☕',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    dataCategory: 'shopping',
    placesPrimaryTypes: ['shopping_mall', 'department_store'],
    icon: '🛍️',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    dataCategory: 'healthcare',
    placesPrimaryTypes: ['hospital', 'doctor'],
    icon: '🏥',
  },
  {
    id: 'pharmacies',
    label: 'Pharmacies',
    dataCategory: 'pharmacy',
    placesPrimaryTypes: ['pharmacy', 'drugstore'],
    icon: '💊',
  },
  {
    id: 'parks',
    label: 'Parks',
    dataCategory: 'parks',
    placesPrimaryTypes: ['park'],
    icon: '🌳',
  },
  {
    id: 'golf',
    label: 'Golf',
    dataCategory: 'golf',
    placesPrimaryTypes: ['golf_course'],
    icon: '⛳',
  },
  {
    id: 'schools',
    label: 'Schools',
    dataCategory: 'schools',
    placesPrimaryTypes: ['school', 'university'],
    icon: '📚',
  },
]

export function categoryIdToDataCategory(
  categoryId: NearbyAmenityCategoryId,
): string | null {
  const row = NEARBY_AMENITY_CATEGORIES.find((c) => c.id === categoryId)
  return row?.dataCategory ?? null
}

export function getCategoryById(
  categoryId: NearbyAmenityCategoryId,
): NearbyAmenityCategory | undefined {
  return NEARBY_AMENITY_CATEGORIES.find((c) => c.id === categoryId)
}
