import { organizationEntityId, webSiteEntityId, normalizeSiteOrigin } from 'lib/schema/entityIds'

type WebSiteInput = {
  baseUrl: string
}

/**
 * Site-level `WebSite` entity; `publisher` references the canonical `Organization` @id.
 */
export function buildWebSiteSchema({ baseUrl }: WebSiteInput) {
  const origin = normalizeSiteOrigin(baseUrl)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': webSiteEntityId(origin),
    name: 'Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy',
    url: origin,
    publisher: { '@id': organizationEntityId(origin) },
    inLanguage: 'en-US',
  }
}
