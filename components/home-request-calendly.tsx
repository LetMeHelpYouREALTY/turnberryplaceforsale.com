'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/drjanduffy/1-home-tour-30-mins'

type HomeRequestCalendlyProps = {
  /** Show link to home valuation widget on /price-features */
  showValuationCTA?: boolean
}

/**
 * Replaces legacy lead form in homepage contact section — Calendly loads on demand.
 */
export function HomeRequestCalendly({ showValuationCTA = true }: HomeRequestCalendlyProps) {
  const [showCalendly, setShowCalendly] = useState(false)

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
            src={`${calendlyUrl}?hide_gdpr_banner=1`}
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
