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
      telephone: '+17025001971',
      contactType: 'Real Estate Sales',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  }
}
