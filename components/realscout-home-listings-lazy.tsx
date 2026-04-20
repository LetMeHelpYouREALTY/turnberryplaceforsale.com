'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

/**
 * Mounts RealScout office listings only when the block nears the viewport,
 * so Slow 4G does not fetch widget JS / listing images during initial LCP.
 */
export function RealScoutHomeListingsLazy() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [mountWidget, setMountWidget] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMountWidget(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sentinelRef} className="widget-card--light widget-wrapper">
      {mountWidget ? (
        <>
          <Script
            id="realscout-widget-js"
            src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
            type="module"
            strategy="lazyOnload"
          />
          <style jsx>{`
            realscout-office-listings {
              --rs-listing-divider-color: #0e64c8;
              width: 100%;
              min-height: 400px;
            }
          `}</style>
          <realscout-office-listings
            agent-encoded-id="QWdlbnQtMjI1MDUw"
            sort-order="NEWEST"
            listing-status="For Sale"
            property-types=",TC,LAL"
            price-min="500000"
            price-max="16000000"
          ></realscout-office-listings>
        </>
      ) : (
        <div className="min-h-[400px] rounded bg-light" aria-hidden="true" />
      )}
    </div>
  )
}
