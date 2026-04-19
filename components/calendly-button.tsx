'use client'

/**
 * Calendly popup-trigger button.
 *
 * Refactored 2026-04-18: script is loaded site-wide by <CalendlyBadge />
 * in components/layout.tsx, so this button no longer injects its own
 * <script> tag. We just read `window.Calendly.initPopupWidget` when the
 * user clicks, with a tab-fallback if the script is still streaming.
 */

import React from 'react'
import { CALENDLY_TOUR_URL, buildCalendlyUrl } from 'lib/calendly'

interface CalendlyButtonProps {
  url?: string
  text?: string
  className?: string
  /** UTM medium tag for attribution (defaults to "button"). */
  utmMedium?: 'button' | 'cta' | 'sticky' | 'footer'
}

export default function CalendlyButton({
  url = CALENDLY_TOUR_URL,
  text = 'Schedule Tour',
  className = '',
  utmMedium = 'button',
}: CalendlyButtonProps) {
  const fullUrl = buildCalendlyUrl(url, { utmMedium })

  const openCalendly = () => {
    if (typeof window === 'undefined') return
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: fullUrl })
      return
    }
    // Graceful fallback when the widget script hasn't loaded yet
    // (rare — <CalendlyBadge /> loads it with afterInteractive strategy).
    window.open(fullUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={openCalendly}
      className={`inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all ${className}`}
      aria-label={`${text} with Dr. Jan Duffy`}
      data-cta="calendly-button"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {text}
    </button>
  )
}
