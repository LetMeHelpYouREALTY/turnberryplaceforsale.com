/**
 * Stable `@id` fragment URIs for schema.org entities on this domain.
 * Reuse these when cross-referencing (`publisher`, `parentOrganization`, `@id` only nodes)
 * so crawlers consolidate the graph instead of seeing duplicate standalone entities.
 */

export function normalizeSiteOrigin(baseUrl: string): string {
  return baseUrl.replace(/\/$/, '')
}

export function organizationEntityId(baseUrl: string): string {
  return `${normalizeSiteOrigin(baseUrl)}/#organization`
}

export function webSiteEntityId(baseUrl: string): string {
  return `${normalizeSiteOrigin(baseUrl)}/#website`
}

export function gbpLocalBusinessEntityId(baseUrl: string): string {
  return `${normalizeSiteOrigin(baseUrl)}/#gbp-localbusiness`
}

export function realEstateAgentEntityId(baseUrl: string): string {
  return `${normalizeSiteOrigin(baseUrl)}/#realestateagent`
}
