/**
 * Breadcrumb Schema Component for Interior Pages
 * Adds BreadcrumbList structured data for SEO
 */

import React from 'react'
import { useRouter } from 'next/router'
import { buildBreadcrumbListSchema } from 'lib/schema/breadcrumbList'
import { serializeJsonLd } from 'lib/schema/serializeJsonLd'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[]
  currentPageTitle?: string
}

export function BreadcrumbSchema({ items, currentPageTitle }: BreadcrumbSchemaProps) {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'

  let breadcrumbItems: BreadcrumbItem[]

  if (items) {
    // Use provided items
    breadcrumbItems = [
      { name: 'Home', url: baseUrl },
      ...items,
    ]
  } else if (currentPageTitle) {
    // Build from router path and current page title
    const pathSegments = router.asPath
      .split('/')
      .filter(segment => segment !== '')
      .map(segment => {
        const decoded = decodeURIComponent(segment.split('?')[0].split('#')[0])
        return decoded
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      })

    breadcrumbItems = [
      { name: 'Home', url: baseUrl },
      ...pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`
        return { name: segment, url: `${baseUrl}${path}` }
      }),
    ]

    // Replace last item with currentPageTitle
    if (breadcrumbItems.length > 0) {
      breadcrumbItems[breadcrumbItems.length - 1].name = currentPageTitle
    }
  } else {
    // Fallback: just Home
    breadcrumbItems = [{ name: 'Home', url: baseUrl }]
  }

  const schema = buildBreadcrumbListSchema({
    items: breadcrumbItems.map((item) => ({
      name: item.name,
      item: item.url,
    })),
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema, true) }}
    />
  )
}
