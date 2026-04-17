export type BreadcrumbSegment = {
  name: string
  /** Absolute URL, e.g. https://www.../towers */
  item: string
}

type BreadcrumbInput = {
  items: BreadcrumbSegment[]
}

export function buildBreadcrumbListSchema({ items }: BreadcrumbInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}
