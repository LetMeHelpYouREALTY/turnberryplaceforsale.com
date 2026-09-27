import { NEARBY_AMENITIES_COMMUNITY } from 'lib/nearby-amenities/config'
import { nearbyCuratedPlaces } from 'lib/nearby-amenities/curated-places'
import { NEARBY_AMENITIES_FAQ } from 'lib/nearby-amenities/content'
import { TURNBERRY_GEO } from 'lib/schema/geo'
import { buildRealEstateAgentSchema } from 'lib/schema/realEstateAgent'

const SCHEMA_TYPE_BY_CATEGORY: Record<string, string> = {
  dining: 'Restaurant',
  entertainment: 'TouristAttraction',
  shopping: 'ShoppingCenter',
  coffee: 'CafeOrCoffeeShop',
  fitness: 'ExerciseGym',
  schools: 'School',
  parks: 'Park',
  grocery: 'GroceryStore',
  healthcare: 'Hospital',
  pharmacy: 'Pharmacy',
  golf: 'GolfCourse',
  parking: 'ParkingFacility',
}

function placeToSchemaItem(place: (typeof nearbyCuratedPlaces)[number]) {
  const schemaType = SCHEMA_TYPE_BY_CATEGORY[place.category] ?? 'Place'
  return {
    '@type': schemaType,
    name: place.name,
    ...(place.addressVerified
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: place.address.split(',')[0]?.trim() ?? place.address,
            addressLocality: 'Las Vegas',
            addressRegion: 'NV',
            addressCountry: 'US',
          },
        }
      : {}),
    ...(place.lat && place.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: place.lat,
            longitude: place.lng,
          },
        }
      : {}),
    url: place.sourceUrl,
  }
}

type NearbyAmenitiesSchemaInput = {
  baseUrl: string
  pageUrl: string
}

export function buildNearbyAmenitiesPageGraph({
  baseUrl,
  pageUrl,
}: NearbyAmenitiesSchemaInput) {
  const communityPlace = {
    '@type': 'Place',
    '@id': `${baseUrl}/#turnberry-place-community`,
    name: NEARBY_AMENITIES_COMMUNITY.name,
    description:
      'Guard-gated luxury high-rise condominiums at 2827 Paradise Rd, Las Vegas, NV 89109—one block east of the Las Vegas Strip.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: NEARBY_AMENITIES_COMMUNITY.streetAddress,
      addressLocality: NEARBY_AMENITIES_COMMUNITY.city,
      addressRegion: NEARBY_AMENITIES_COMMUNITY.state,
      postalCode: NEARBY_AMENITIES_COMMUNITY.postalCode,
      addressCountry: 'US',
    },
    geo: TURNBERRY_GEO,
    url: baseUrl,
  }

  const agent = buildRealEstateAgentSchema({ baseUrl })
  const agentWithArea = {
    ...agent,
    areaServed: [
      ...(Array.isArray(agent.areaServed) ? agent.areaServed : []),
      { '@type': 'Place', name: 'Turnberry Place' },
      {
        '@type': 'Place',
        name: `${NEARBY_AMENITIES_COMMUNITY.name}, ${NEARBY_AMENITIES_COMMUNITY.city}`,
      },
    ],
  }

  const featuredForList = nearbyCuratedPlaces.filter((p) => p.lat && p.lng).slice(0, 24)

  return [
    communityPlace,
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#nearby-itemlist`,
      name: `Nearby amenities around ${NEARBY_AMENITIES_COMMUNITY.name}`,
      itemListElement: featuredForList.map((place, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: placeToSchemaItem(place),
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: NEARBY_AMENITIES_FAQ.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    },
    agentWithArea,
  ]
}
