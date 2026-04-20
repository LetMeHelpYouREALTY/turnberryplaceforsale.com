/**
 * JSON-LD Schema Markup Component
 * Composes builders from lib/schema — RealEstateAgent, ApartmentComplex, FAQPage, BreadcrumbList
 * (Organization / WebSite / GBP LocalBusiness are emitted from `Layout`.)
 * Dr. Jan Duffy - Turnberry Place Las Vegas
 */

import React from 'react'
import {
  buildApartmentComplexSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildRealEstateAgentSchema,
} from 'lib/schema'
import { serializeJsonLd } from 'lib/schema/serializeJsonLd'

export interface JsonLdSchemaProps {
  type?: 'home' | 'agent' | 'property' | 'towers'
  /** Retained for call-site compatibility; not emitted on non-home routes in this component. */
  propertyPrice?: string
  inventoryCount?: number
  inventoryLastUpdatedIso?: string
  inventorySource?: 'realscout' | 'fallback'
}

export function JsonLdSchema({
  type = 'property',
  propertyPrice: _propertyPrice,
  inventoryCount,
  inventoryLastUpdatedIso,
  inventorySource,
}: JsonLdSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'

  const agentSchema = buildRealEstateAgentSchema({ baseUrl })
  const schemas: Record<string, unknown>[] = [agentSchema]

  if (type === 'home') {
    schemas.push(
      buildApartmentComplexSchema({
        baseUrl,
        canonicalUrl: baseUrl,
        listingInventory:
          typeof inventoryCount === 'number' && inventorySource
            ? {
                count: inventoryCount,
                source: inventorySource,
                lastUpdatedIso: inventoryLastUpdatedIso,
              }
            : undefined,
      }),
    )
    schemas.push(buildFaqPageSchema())
    schemas.push(
      buildBreadcrumbListSchema({
        items: [{ name: 'Home', item: baseUrl }],
      }),
    )
    /* Organization + WebSite: emitted once from `Layout` with stable @id. */
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema, true) }}
        />
      ))}
    </>
  )
}
