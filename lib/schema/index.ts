export { buildAggregateRating } from 'lib/schema/aggregateRating'
export type { AggregateRating } from 'lib/schema/aggregateRating'
export { buildApartmentComplexSchema } from 'lib/schema/apartmentComplex'
export type { ListingInventorySnapshot } from 'lib/schema/apartmentComplex'
export { buildBreadcrumbListSchema } from 'lib/schema/breadcrumbList'
export type { BreadcrumbSegment } from 'lib/schema/breadcrumbList'
export { buildGbpLocalBusinessSchema } from 'lib/schema/gbpLocalBusiness'
export { buildFaqPageSchema, TURNBERRY_FAQ_ITEMS } from 'lib/schema/faqPage'
export type { FaqItem } from 'lib/schema/faqPage'
export {
  TURNBERRY_GEO,
  TURNBERRY_GEO_LAT,
  TURNBERRY_GEO_LNG,
  TURNBERRY_MAP_CENTER,
  TURNBERRY_MAPS_Q_LATLNG,
  TURNBERRY_GEO_POSITION_META,
  TURNBERRY_ICBM_META,
} from 'lib/schema/geo'
export { buildOrganizationSchema } from 'lib/schema/organization'
export { buildWebSiteSchema } from 'lib/schema/webSite'
export { serializeJsonLd } from 'lib/schema/serializeJsonLd'
export {
  normalizeSiteOrigin,
  organizationEntityId,
  webSiteEntityId,
  gbpLocalBusinessEntityId,
  realEstateAgentEntityId,
} from 'lib/schema/entityIds'
export { buildRealEstateAgentSchema } from 'lib/schema/realEstateAgent'
