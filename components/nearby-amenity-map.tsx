'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { NearbyAmenityCategoryId } from 'lib/nearby-amenities/config'

const NearbyAmenityMapClient = dynamic(
  () =>
    import('components/nearby-amenity-map-client').then((m) => m.NearbyAmenityMapClient),
  { ssr: false },
)

type NearbyAmenityMapProps = {
  mapKey?: string
  mapId?: string
  initialCategory?: NearbyAmenityCategoryId
  showCategoryChips?: boolean
}

export function NearbyAmenityMap({
  mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  initialCategory,
  showCategoryChips = true,
}: NearbyAmenityMapProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = shellRef.current
    if (!el) {
      return
    }
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={shellRef} className="nearby-amenity-map-shell">
      {shouldLoad ? (
        <NearbyAmenityMapClient
          mapKey={mapKey}
          mapId={mapId}
          initialCategory={initialCategory}
          showCategoryChips={showCategoryChips}
        />
      ) : (
        <div className="nearby-amenity-map__placeholder" aria-hidden="true">
          <div className="nearby-amenity-map__spinner" />
        </div>
      )}
    </div>
  )
}
