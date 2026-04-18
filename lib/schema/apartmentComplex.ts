import { TURNBERRY_GEO } from 'lib/schema/geo'
import { buildAggregateRating } from 'lib/schema/aggregateRating'

function buildTowerResidenceStubs() {
  return [1, 2, 3, 4].map((n) => ({
    '@type': 'Residence',
    name: `Turnberry Place Tower ${n}`,
    numberOfRooms: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 4,
    },
  }))
}

export type ListingInventorySnapshot = {
  count: number
  source: 'realscout' | 'fallback'
  lastUpdatedIso?: string
}

type ApartmentComplexInput = {
  baseUrl: string
  /** Page this graph describes (e.g. homepage or /towers). */
  canonicalUrl: string
  /** Active listing count from RealScout shared search — only applied when source is realscout. */
  listingInventory?: ListingInventorySnapshot
  /**
   * Approximate total residences in the community (towers page). Omit on home when using listing counts.
   */
  approximateTotalUnits?: number
  /** Longer copy for /towers; shorter default for home. */
  description?: string
  /** Richer amenity/image lists for /towers (uses approximateTotalUnits, typically 1200). */
  towersEnrichment?: boolean
}

const DEFAULT_DESCRIPTION =
  'Four-tower guard-gated luxury high-rise condominium complex one block east of the Las Vegas Strip, with exclusive access to the 80,000 sq ft Stirling Club.'

const TOWERS_DEFAULT_DESCRIPTION =
  'Turnberry Place is a luxury high-rise condominium community featuring four towers (38-45 stories) with 1,200+ residences, Strip views, and exclusive access to The Stirling Club. Starting from $800K.'

export function buildApartmentComplexSchema({
  baseUrl,
  canonicalUrl,
  listingInventory,
  approximateTotalUnits,
  description,
  towersEnrichment,
}: ApartmentComplexInput) {
  const resolvedDescription = description ?? (towersEnrichment ? TOWERS_DEFAULT_DESCRIPTION : DEFAULT_DESCRIPTION)

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    '@id': `${canonicalUrl}#apartmentcomplex`,
    name: 'Turnberry Place Las Vegas',
    alternateName: 'Turnberry Place',
    url: canonicalUrl,
    description: resolvedDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2827 Paradise Rd',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89109',
      addressCountry: 'US',
    },
    geo: TURNBERRY_GEO,
    priceRange: '$800,000 - $10,000,000+',
    amenityFeature: towersEnrichment
      ? [
          { '@type': 'LocationFeatureSpecification', name: 'Gated Community', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Stirling Club', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Fitness Center', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Tennis Courts', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Valet Parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Concierge', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24/7 Security', value: true },
        ]
      : [
          { '@type': 'LocationFeatureSpecification', name: '24-hour guard-gated security', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'The Stirling Club access', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Resort-style pools', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Tennis courts', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Fitness center', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
        ],
    image: towersEnrichment
      ? [
          `${baseUrl}/images/turnberry/Turnberry_Place_For_Sale.jpg`,
          `${baseUrl}/images/turnberry/turnberry-tower-south-view.jpeg`,
          `${baseUrl}/images/turnberry/turnberry-tower-nice-view.jpg`,
          `${baseUrl}/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg`,
        ]
      : [`${baseUrl}/images/turnberry/Turnberry_Place_For_Sale.jpg`, `${baseUrl}/images/turnberry/turnberry-tower-nice-view.jpg`],
    containedInPlace: {
      '@type': 'City',
      name: 'Las Vegas',
    },
  }

  if (towersEnrichment) {
    schema.numberOfBedroomsTotal = '1-4'
    schema.numberOfBathroomsTotal = '1-4'
    schema.nearbyAttraction = [
      { '@type': 'TouristAttraction', name: 'Las Vegas Strip' },
      { '@type': 'TouristAttraction', name: 'Red Rock Canyon' },
      { '@type': 'TouristAttraction', name: 'Spring Mountain Range' },
    ]
  }

  schema.containsPlace = buildTowerResidenceStubs()

  const totalUnits =
    towersEnrichment && typeof approximateTotalUnits !== 'number' ? 1200 : approximateTotalUnits

  if (listingInventory?.source === 'realscout' && listingInventory.count > 0) {
    schema.numberOfAccommodationUnits = listingInventory.count
  } else if (typeof totalUnits === 'number' && totalUnits > 0) {
    schema.numberOfAccommodationUnits = totalUnits
  }

  if (listingInventory?.lastUpdatedIso) {
    schema.dateModified = listingInventory.lastUpdatedIso
  }

  // AggregateRating: env-gated, no fabrication. Emitted only when the
  // operator sets verified GBP rating + count in Vercel env.
  const aggregateRating = buildAggregateRating()
  if (aggregateRating) {
    schema.aggregateRating = aggregateRating
  }

  return schema
}
