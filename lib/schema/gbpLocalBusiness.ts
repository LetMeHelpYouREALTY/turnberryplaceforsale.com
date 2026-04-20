import { TURNBERRY_GEO } from 'lib/schema/geo'
import {
  gbpLocalBusinessEntityId,
  organizationEntityId,
} from 'lib/schema/entityIds'
import {
  GBP_NAME,
  GBP_ADDRESS,
  GBP_EMAIL,
  GBP_PHONE_TEL,
  buildOpeningHoursSpecification,
} from 'lib/google-business-profile'

const GBP_LOCALBUSINESS_DESCRIPTION =
  'Staffed Dr. Jan Duffy office serving Turnberry Place luxury high-rise condominium buyers and sellers, one block from the Las Vegas Strip.'

/**
 * Google Business Profile entity as `LocalBusiness` JSON-LD (NAP, geo, hours).
 * Emitted once from `components/layout.tsx` so every route references the same GBP.
 */
export function buildGbpLocalBusinessSchema(baseUrl: string) {
  const origin = baseUrl.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': gbpLocalBusinessEntityId(baseUrl),
    name: GBP_NAME,
    description: GBP_LOCALBUSINESS_DESCRIPTION,
    url: origin,
    image: `${origin}/images/turnberry/Turnberry_Place_For_Sale.jpg`,
    telephone: GBP_PHONE_TEL,
    email: GBP_EMAIL,
    priceRange: '$800,000 - $10,000,000+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: GBP_ADDRESS.streetAddress,
      addressLocality: GBP_ADDRESS.addressLocality,
      addressRegion: GBP_ADDRESS.addressRegion,
      postalCode: GBP_ADDRESS.postalCode,
      addressCountry: GBP_ADDRESS.addressCountry,
    },
    geo: TURNBERRY_GEO,
    openingHoursSpecification: buildOpeningHoursSpecification(),
    /** Links the GBP office to the site brand entity (same graph). */
    parentOrganization: { '@id': organizationEntityId(baseUrl) },
  }
}
