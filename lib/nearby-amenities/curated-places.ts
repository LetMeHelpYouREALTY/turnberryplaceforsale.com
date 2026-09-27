import type { Place } from 'lib/places-data'
import { placesData } from 'lib/places-data'

/** Additional verified nearby places (addresses from public listings). */
const supplementalPlaces: Place[] = [
  {
    name: 'Smith\'s Food and Drug',
    category: 'grocery',
    distance: '1.2 mi',
    description: 'Supermarket',
    address: '4025 S Maryland Pkwy, Las Vegas, NV 89119',
    mapQuery: 'Smith\'s Food and Drug Maryland Parkway Las Vegas',
    lat: 36.1158,
    lng: -115.1375,
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    distance: '1.5 mi',
    description: 'Supermarket',
    address: '2776 E Desert Inn Rd, Las Vegas, NV 89121',
    mapQuery: 'Albertsons Desert Inn Las Vegas',
    lat: 36.1292,
    lng: -115.1186,
  },
  {
    name: 'Sunrise Hospital & Medical Center',
    category: 'healthcare',
    distance: '1.0 mi',
    description: 'Hospital',
    address: '3186 S Maryland Pkwy, Las Vegas, NV 89109',
    mapQuery: 'Sunrise Hospital Las Vegas',
    lat: 36.1335,
    lng: -115.1342,
  },
  {
    name: 'Valley Hospital Medical Center',
    category: 'healthcare',
    distance: '1.8 mi',
    description: 'Hospital',
    address: '1028 E Desert Inn Rd, Las Vegas, NV 89109',
    mapQuery: 'Valley Hospital Medical Center Las Vegas',
    lat: 36.1264,
    lng: -115.1489,
  },
  {
    name: 'CVS Pharmacy',
    category: 'pharmacy',
    distance: '0.9 mi',
    description: 'Pharmacy',
    address: '2300 E Flamingo Rd, Las Vegas, NV 89119',
    mapQuery: 'CVS Pharmacy Flamingo Las Vegas',
    lat: 36.1142,
    lng: -115.1223,
  },
  {
    name: 'Walgreens',
    category: 'pharmacy',
    distance: '0.7 mi',
    description: 'Pharmacy',
    address: '2101 S Paradise Rd, Las Vegas, NV 89104',
    mapQuery: 'Walgreens Paradise Rd Las Vegas',
    lat: 36.1441,
    lng: -115.1543,
  },
  {
    name: 'Wynn Golf Club',
    category: 'golf',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Resort golf course',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    mapQuery: 'Wynn Golf Club Las Vegas',
    lat: 36.1245,
    lng: -115.1612,
  },
  {
    name: 'Las Vegas Golf Club',
    category: 'golf',
    distance: '3.5 mi',
    description: 'Public golf course',
    address: '4300 W Vegas Dr, Las Vegas, NV 89108',
    mapQuery: 'Las Vegas Golf Club',
    lat: 36.1721,
    lng: -115.1984,
  },
  {
    name: 'Wynn Las Vegas Parking',
    category: 'parking',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Resort parking garage',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    mapQuery: 'Wynn Las Vegas parking',
    lat: 36.1268,
    lng: -115.1638,
  },
  {
    name: 'Resorts World Las Vegas Parking',
    category: 'parking',
    distance: '0.5 mi',
    walkTime: '8 min walk',
    description: 'Resort parking',
    address: '3000 S Las Vegas Blvd, Las Vegas, NV 89109',
    mapQuery: 'Resorts World Las Vegas parking',
    lat: 36.1301,
    lng: -115.1648,
  },
]

/** Curated list for map markers, fallback UI, and ItemList schema. */
export const nearbyCuratedPlaces: Place[] = [...placesData, ...supplementalPlaces]

export function filterCuratedPlacesByCategory(
  categoryId: string,
  dataCategory: string | null,
): Place[] {
  if (categoryId === 'all' || !dataCategory) {
    return nearbyCuratedPlaces
  }
  return nearbyCuratedPlaces.filter((p) => p.category === dataCategory)
}
