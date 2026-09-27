/**
 * Verified curated places for the nearby-amenities map, fallback UI, and ItemList JSON-LD.
 * Every entry includes a primary-source URL; omit or drop entries that cannot be verified.
 */

export type CuratedNearbyPlace = {
  name: string
  category: string
  distance: string
  walkTime?: string
  description?: string
  /** Full street address when verified against sourceUrl; used in UI and schema when addressVerified is true. */
  address: string
  addressVerified: boolean
  sourceUrl: string
  lat?: number
  lng?: number
}

const WYNN_RESORT = 'https://www.wynnlasvegas.com/'

/** Hyperlocal to Turnberry Place (2827 Paradise Rd) — Strip corridor + Paradise/Maryland services. */
export const nearbyCuratedPlaces: CuratedNearbyPlace[] = [
  // Dining — Wynn Las Vegas (official resort dining)
  {
    name: 'SW Steakhouse',
    category: 'dining',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Fine dining',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/sw-steakhouse',
    lat: 36.1274,
    lng: -115.1642,
  },
  {
    name: 'Sinatra',
    category: 'dining',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Italian fine dining',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/sinatra',
    lat: 36.1285,
    lng: -115.1651,
  },
  {
    name: 'Wing Lei',
    category: 'dining',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Chinese fine dining',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/wing-lei',
    lat: 36.1278,
    lng: -115.1645,
  },
  {
    name: 'Bartolotta Ristorante di Mare',
    category: 'dining',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Italian seafood',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/bartolotta-ristorante-di-mare',
    lat: 36.1289,
    lng: -115.1657,
  },
  // Entertainment / resorts
  {
    name: 'Wynn Las Vegas',
    category: 'entertainment',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Resort and casino',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: WYNN_RESORT,
    lat: 36.1274,
    lng: -115.1642,
  },
  {
    name: 'Encore at Wynn Las Vegas',
    category: 'entertainment',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Resort and casino',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/encore',
    lat: 36.1285,
    lng: -115.1651,
  },
  {
    name: 'Resorts World Las Vegas',
    category: 'entertainment',
    distance: '0.5 mi',
    walkTime: '8 min walk',
    description: 'Resort and casino',
    address: '3000 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.rwlasvegas.com/',
    lat: 36.1296,
    lng: -115.1633,
  },
  {
    name: 'T-Mobile Arena',
    category: 'entertainment',
    distance: '1.2 mi',
    walkTime: '18 min walk',
    description: 'Arena — sports and concerts',
    address: '3780 S Las Vegas Blvd, Las Vegas, NV 89158',
    addressVerified: true,
    sourceUrl: 'https://www.t-mobilearena.com/',
    lat: 36.1028,
    lng: -115.1784,
  },
  // Shopping
  {
    name: 'Fashion Show Las Vegas',
    category: 'shopping',
    distance: '0.8 mi',
    walkTime: '12 min walk',
    description: 'Regional shopping center',
    address: '3200 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.simon.com/mall/fashion-show',
    lat: 36.1307,
    lng: -115.1696,
  },
  {
    name: 'Wynn Plaza',
    category: 'shopping',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Luxury retail at Wynn',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/shops',
    lat: 36.1274,
    lng: -115.1642,
  },
  // Coffee
  {
    name: 'Urth Caffé at Wynn',
    category: 'coffee',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Organic coffee and tea',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/urth-caffe',
    lat: 36.1285,
    lng: -115.1651,
  },
  {
    name: 'Bouchon Bakery',
    category: 'coffee',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'French bakery and café',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/dining/bouchon-bakery',
    lat: 36.1278,
    lng: -115.1645,
  },
  // Fitness
  {
    name: 'Wynn Fitness Center',
    category: 'fitness',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Resort fitness center',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: WYNN_RESORT,
    lat: 36.1274,
    lng: -115.1642,
  },
  // Grocery
  {
    name: "Smith's Food and Drug",
    category: 'grocery',
    distance: '1.2 mi',
    description: 'Supermarket',
    address: '4025 S Maryland Pkwy, Las Vegas, NV 89119',
    addressVerified: true,
    sourceUrl: 'https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/maryland-parkway/702004',
    lat: 36.1158,
    lng: -115.1375,
  },
  {
    name: 'Albertsons',
    category: 'grocery',
    distance: '1.5 mi',
    description: 'Supermarket',
    address: '2776 E Desert Inn Rd, Las Vegas, NV 89121',
    addressVerified: true,
    sourceUrl: 'https://local.albertsons.com/nv/las-vegas/2776-e-desert-inn-rd.html',
    lat: 36.1292,
    lng: -115.1186,
  },
  // Healthcare
  {
    name: 'Sunrise Hospital & Medical Center',
    category: 'healthcare',
    distance: '1.0 mi',
    description: 'Hospital',
    address: '3186 S Maryland Pkwy, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.sunrisehealthinfo.com/locations/sunrise-hospital',
    lat: 36.1335,
    lng: -115.1342,
  },
  {
    name: 'Valley Hospital Medical Center',
    category: 'healthcare',
    distance: '1.8 mi',
    description: 'Hospital',
    address: '1028 E Desert Inn Rd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.valleyhospital.net/',
    lat: 36.1264,
    lng: -115.1489,
  },
  // Pharmacy
  {
    name: 'Walgreens',
    category: 'pharmacy',
    distance: '0.7 mi',
    description: 'Pharmacy',
    address: '2101 S Paradise Rd, Las Vegas, NV 89104',
    addressVerified: true,
    sourceUrl: 'https://www.walgreens.com/',
    lat: 36.1441,
    lng: -115.1543,
  },
  {
    name: 'CVS Pharmacy',
    category: 'pharmacy',
    distance: '0.9 mi',
    description: 'Pharmacy',
    address: '2300 E Flamingo Rd, Las Vegas, NV 89119',
    addressVerified: true,
    sourceUrl: 'https://www.cvs.com/',
    lat: 36.1142,
    lng: -115.1223,
  },
  // Golf
  {
    name: 'Wynn Golf Club',
    category: 'golf',
    distance: '0.4 mi',
    walkTime: '6 min walk',
    description: 'Resort golf course',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.wynnlasvegas.com/experiences/golf',
    lat: 36.1245,
    lng: -115.1612,
  },
  // Parking
  {
    name: 'Wynn Las Vegas self-parking',
    category: 'parking',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    description: 'Resort parking',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: WYNN_RESORT,
    lat: 36.1268,
    lng: -115.1638,
  },
  {
    name: 'Resorts World Las Vegas parking',
    category: 'parking',
    distance: '0.5 mi',
    walkTime: '8 min walk',
    description: 'Resort parking',
    address: '3000 S Las Vegas Blvd, Las Vegas, NV 89109',
    addressVerified: true,
    sourceUrl: 'https://www.rwlasvegas.com/',
    lat: 36.1301,
    lng: -115.1648,
  },
  // Schools (secondary for buyer profile; verified campuses)
  {
    name: 'University of Nevada, Las Vegas',
    category: 'schools',
    distance: '3.0 mi',
    description: 'Public university',
    address: '4505 S Maryland Pkwy, Las Vegas, NV 89154',
    addressVerified: true,
    sourceUrl: 'https://www.unlv.edu/',
    lat: 36.1085,
    lng: -115.1436,
  },
  {
    name: 'Las Vegas Academy of the Arts',
    category: 'schools',
    distance: '1.5 mi',
    description: 'Clark County School District magnet high school',
    address: '315 S 7th St, Las Vegas, NV 89101',
    addressVerified: true,
    sourceUrl: 'https://www.lasvegasacademy.net/',
    lat: 36.1656,
    lng: -115.1433,
  },
]

export function filterCuratedPlacesByCategory(
  categoryId: string,
  dataCategory: string | null,
): CuratedNearbyPlace[] {
  if (categoryId === 'all' || !dataCategory) {
    return nearbyCuratedPlaces
  }
  return nearbyCuratedPlaces.filter((p) => p.category === dataCategory)
}
