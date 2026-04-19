'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { tourUrl } from 'lib/calendly'

export function StickyCTA() {
  const { asPath } = useRouter()
  // Disable on pages with custom mobile-native CTAs
  const isEnabled =
    asPath !== '/request-details' &&
    // asPath includes querystrings (e.g., /photos?v=1) so use startsWith
    !asPath.startsWith('/photos')

  // Prevent the bar from covering content on mobile when it’s visible.
  useEffect(() => {
    if (!isEnabled) return
    document.body.classList.add('has-sticky-cta')
    return () => {
      document.body.classList.remove('has-sticky-cta')
    }
  }, [isEnabled])

  // Track sticky CTA presence (once on mount) for analytics.
  useEffect(() => {
    if (!isEnabled) return
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sticky_cta_shown', {
        event_category: 'engagement',
        event_label: 'sticky_cta_visible',
      })
    }
  }, [isEnabled])

  const handleCTAClick = (type: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sticky_cta_click', {
        event_category: 'engagement',
        event_label: `sticky_cta_${type}`
      })
    }
  }

  if (!isEnabled) return null

  const calendlyUrl = tourUrl({ utmMedium: 'sticky' })
  const realScoutUrl =
    process.env.NEXT_PUBLIC_REALSCOUT_URL ||
    'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay00MDE0'

  return (
    <div className="sticky-cta-bar d-lg-none fixed-bottom bg-primary text-white p-3 shadow-lg z-50" role="banner" aria-label="Call to action">
      <div className="container-fluid px-3">
        <div className="row align-items-center no-gutters">
          <div className="col-12 col-sm-4 mb-2 mb-sm-0">
            <a 
              href="tel:+17025001971" 
              className="btn btn-light btn-sm font-weight-bold w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleCTAClick('phone')}
              aria-label="Call (702) 500-1971"
            >
              <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.65 11.5a.678.678 0 0 1-.58-.122L6.864 9.65a.678.678 0 0 1-.122-.58l.122-2.307a.678.678 0 0 0-.122-.58L4.682 3.654a.678.678 0 0 0-.028-.326z"/>
              </svg>
              <strong>Call</strong>
            </a>
          </div>
          <div className="col-6 col-sm-4 pr-1 pr-sm-2">
            <a
              href={calendlyUrl}
              className="btn btn-warning btn-sm font-weight-bold w-100"
              onClick={() => handleCTAClick('tour')}
              aria-label="Schedule a private tour on Calendly"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule
            </a>
          </div>
          <div className="col-6 col-sm-4 pl-1 pl-sm-2">
            <a
              href={realScoutUrl}
              className="btn btn-outline-light btn-sm font-weight-bold w-100"
              onClick={() => handleCTAClick('realscout')}
              aria-label="View RealScout listings"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
