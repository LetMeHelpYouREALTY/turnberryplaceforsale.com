import { TURNBERRY_GEO } from 'lib/schema/geo'
import { realEstateAgentEntityId } from 'lib/schema/entityIds'
import { buildAggregateRating } from 'lib/schema/aggregateRating'
import {
  buildOpeningHoursSpecification,
  GBP_ADDRESS,
  GBP_PHONE_TEL,
  GBP_EMAIL,
} from 'lib/google-business-profile'
import { AGENT_KNOWS_ABOUT_SEMANTIC } from 'lib/seo/semantic-topics'

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
    '@id': realEstateAgentEntityId(baseUrl),
    name: 'Dr. Jan Duffy, REALTOR',
    alternateName: 'The Turnberry Place Team',
    description:
      'Turnberry Place specialist and Las Vegas luxury high-rise condo REALTOR. Licensed REALTOR (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties.',
    url: baseUrl,
    telephone: [GBP_PHONE_TEL],
    email: GBP_EMAIL,
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
      ...GBP_ADDRESS,
    },
    geo: TURNBERRY_GEO,
    openingHoursSpecification: buildOpeningHoursSpecification(),
    areaServed,
    worksFor: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      url: 'https://www.berkshirehathawayhs.com',
    },
    knowsAbout: [...AGENT_KNOWS_ABOUT_SEMANTIC],
    priceRange: '$800,000 - $10,000,000+',
    image: `${baseUrl}/images/turnberry/asset-1.jpg`,
    logo: `${baseUrl}/images/turnberry/asset-19.jpg`,
    ...(aggregateRating ? { aggregateRating } : {}),
  }
}
