/**
 * Reusable JSON-LD Schema Markup Component
 * Use this component to inject structured data for SEO
 */

import React from 'react'
import { serializeJsonLd } from 'lib/schema/serializeJsonLd'

interface JsonLdProps {
  schema: Record<string, unknown>
  /** Pretty-print JSON in the HTML source (default true for readability). */
  pretty?: boolean
}

export function JsonLd({ schema, pretty = true }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema, pretty) }}
    />
  )
}
