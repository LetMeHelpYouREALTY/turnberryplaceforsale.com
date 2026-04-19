'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { tourUrl } from 'lib/calendly'

type HomeRequestCalendlyProps = {
  /** Show link to home valuation widget on /price-features */
  showValuationCTA?: boolean
}

/**
 * Replaces legacy lead form in homepage contact section — Calendly loads on demand.
 *
 * Homepage keeps the lazy-toggle pattern (unlike /agent which now renders
 * the inline widget immediately) because the homepage is the LCP-critical
 * page: every extra kB above the fold hurts mobile Core Web Vitals.
 * widget.js is still loaded once via <CalendlyBadge />, so when the user
 * clicks "Pick a time" here, the iframe loads instantly with no script
 * bootstrap delay.
 */
export function HomeRequestCalendly({ showValuationCTA = true }: HomeRequestCalendlyProps) {
  const [showCalendly, setShowCalendly] = useState(false)
  const calendlyUrl = tourUrl({ utmMedium: 'inline', utmCampaign: 'home-request' })

  return (
    <div className="home-request-calendly text-center" aria-labelledby="contact-label">
      <h3 className="h5 mb-2 heading-color" id="home-calendly-subheading">
        Schedule your visit
      </h3>
      <p className="text-muted small mb-3">
        Pick a time for a private Turnberry Place tour. Questions first? Call{' '}
        <a href="tel:+17025001971">(702) 500-1971</a>.
      </p>
      <button
        type="button"
        className="btn btn-primary btn-lg mb-2"
        onClick={() => setShowCalendly((v) => !v)}
        aria-expanded={showCalendly}
        aria-controls="home-calendly-frame"
        data-cta="home-contact-calendly-toggle"
      >
        {showCalendly ? 'Hide calendar' : 'Pick a time on Calendly'}
      </button>
      {!showCalendly && (
        <p className="text-muted small mb-0">Calendar loads only when you open it — faster homepage load.</p>
      )}
      {showCalendly && (
        <div id="home-calendly-frame" className="agent-calendly-frame mt-3 text-start">
          <iframe
            title="Schedule a private tour — Calendly"
            src={calendlyUrl}
            width="100%"
            height={760}
            loading="lazy"
          />
        </div>
      )}
      {showValuationCTA && (
        <div className="mt-4 pt-3 border-top text-center">
          <Link
            href="/price-features#home-value-estimate"
            className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center"
          >
            <Home className="w-4 h-4 mr-2" aria-hidden="true" />
            Get Home Valuation
          </Link>
        </div>
      )}
    </div>
  )
}
