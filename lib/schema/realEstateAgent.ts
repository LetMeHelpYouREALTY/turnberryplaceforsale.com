import { TURNBERRY_GEO } from 'lib/schema/geo'

type AreaServedEntry =
  | { '@type': 'City'; name: string }
  | { '@type': 'AdministrativeArea'; name: string }

type RealEstateAgentInput = {
  baseUrl: string
}

export function buildRealEstateAgentSchema({ baseUrl }: RealEstateAgentInput) {
  const areaServed: AreaServedEntry[] = [
    { '@type': 'City', name: 'Las Vegas' },
    { '@type': 'City', name: 'Paradise' },
    { '@type': 'City', name: 'Winchester' },
    { '@type': 'AdministrativeArea', name: 'Clark County' },
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
      identifier: {
        '@type': 'PropertyValue',
        name: 'Nevada Real Estate License',
        value: 'S.0197614.LLC',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2827 Paradise Rd',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89109',
      addressCountry: 'US',
    },
    geo: TURNBERRY_GEO,
    areaServed,
    worksFor: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      url: 'https://www.berkshirehathawayhs.com',
    },
    knowsAbout: [
      'Turnberry Place Las Vegas',
      'Luxury High-Rise Condos',
      'Las Vegas Strip Real Estate',
      'The Stirling Club',
    ],
    priceRange: '$800,000 - $10,000,000+',
    image: `${baseUrl}/images/turnberry/asset-1.jpg`,
    logo: `${baseUrl}/images/turnberry/asset-19.jpg`,
  }
}
