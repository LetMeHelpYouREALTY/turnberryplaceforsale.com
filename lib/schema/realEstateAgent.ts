import { TURNBERRY_GEO } from 'lib/schema/geo'
import { buildAggregateRating } from 'lib/schema/aggregateRating'
import { buildOpeningHoursSpecification } from 'lib/google-business-profile'

type AreaServedEntry =
  | { '@type': 'City'; name: string }
  | { '@type': 'AdministrativeArea'; name: string }
  | { '@type': 'Place'; name: string }

type RealEstateAgentInput = {
  baseUrl: string
}

export function buildRealEstateAgentSchema({ baseUrl }: RealEstateAgentInput) {
  // AggregateRating is env-gated (see lib/schema/aggregateRating.ts).
  // Emitted only when verified GBP numbers are set in Vercel env --
  // never fabricated defaults.
  const aggregateRating = buildAggregateRating()
  const areaServed: AreaServedEntry[] = [
    { '@type': 'City', name: 'Las Vegas' },
    { '@type': 'City', name: 'Paradise' },
    { '@type': 'City', name: 'Winchester' },
    { '@type': 'AdministrativeArea', name: 'Clark County' },
    { '@type': 'Place', name: 'Las Vegas, NV 89109' },
    { '@type': 'Place', name: 'Las Vegas, NV 89169' },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#realestateagent`,
    name: 'Dr. Jan Duffy, REALTOR',
    alternateName: 'The Turnberry Place Team',
    description:
      'Turnberry Place specialist and Las Vegas luxury high-rise condo REALTOR. Licensed REALTOR (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties.',
    url: baseUrl,
    telephone: ['+17025001971'],
    email: 'DrDuffy@TurnberryPlaceForSale.com',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'Nevada Real Estate Salesperson License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
      identifier: 'S.0197614.LLC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2827 Paradise Rd, Suite 2',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89109',
      addressCountry: 'US',
    },
    geo: TURNBERRY_GEO,
    openingHoursSpecification: buildOpeningHoursSpecification(),
    areaServed,
    worksFor: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      url: 'https://www.berkshirehathawayhs.com',
    },
    knowsAbout: [
      'Luxury high-rise condos',
      'Turnberry Place',
      'Las Vegas Strip real estate',
      'The Stirling Club',
    ],
    priceRange: '$800,000 - $10,000,000+',
    image: `${baseUrl}/images/turnberry/asset-1.jpg`,
    logo: `${baseUrl}/images/turnberry/asset-19.jpg`,
    ...(aggregateRating ? { aggregateRating } : {}),
  }
}
