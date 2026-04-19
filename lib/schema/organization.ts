import { GBP_PHONE_TEL } from 'lib/google-business-profile'

type OrganizationInput = {
  baseUrl: string
}

export function buildOrganizationSchema({ baseUrl }: OrganizationInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy',
    url: baseUrl,
    logo: `${baseUrl}/images/turnberry/asset-19.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: GBP_PHONE_TEL,
      contactType: 'Real Estate Sales',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  }
}
