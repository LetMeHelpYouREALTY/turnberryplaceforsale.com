'use client'

/**
 * Inline Calendly scheduler embedded in-page.
 *
 * 2026 best practices applied:
 *   - Script is loaded ONCE site-wide by <CalendlyBadge /> in
 *     components/layout.tsx — this component does NOT inject its own
 *     <script> tag. We just call `window.Calendly.initInlineWidget`
 *     when the component mounts (and re-init on URL change), with a
 *     short polling fallback in case the script hasn't finished
 *     loading yet (rare, but possible on slow networks + immediate
 *     navigation).
 *   - URL params (brand color, hide_gdpr_banner, UTM) are applied via
 *     lib/calendly.ts so every Calendly touchpoint stays consistent.
 *   - No CLS: fixed min-width + height reserves layout space before
 *     the iframe hydrates.
 */

import React, { useEffect, useRef } from 'react'
import { CALENDLY_TOUR_URL, buildCalendlyUrl } from 'lib/calendly'

interface CalendlyEmbedProps {
  /** Calendly event URL (defaults to the 30-minute tour). */
  url?: string
  /** Min width in px or any CSS length. */
  minWidth?: string
  /** Height in px or any CSS length. */
  height?: string
  /** Heading above the widget. Pass `null` to render the widget with no header. */
  heading?: string | null
  /** Subheading / helper copy under the heading. Pass `null` to omit. */
  subheading?: string | null
  /**
   * Where on the site this instance lives — used for UTM tagging so the
   * Calendly → FUB webhook carries click-location metadata into the CRM.
   */
  utmMedium?: 'inline' | 'cta'
}

export default function CalendlyEmbed({
  url = CALENDLY_TOUR_URL,
  minWidth = '320px',
  height = '700px',
  heading = 'Schedule a Private Tour',
  subheading = 'Book a 30-minute private showing of Turnberry Place',
  utmMedium = 'inline',
}: CalendlyEmbedProps) {
  const widgetRef = useRef<HTMLDivElement | null>(null)
  const initializedRef = useRef<boolean>(false)

  const fullUrl = buildCalendlyUrl(url, { utmMedium })

  useEffect(() => {
    if (!widgetRef.current) return

    const tryInit = () => {
      if (!widgetRef.current) return false
      if (typeof window === 'undefined') return false
      if (!window.Calendly?.initInlineWidget) return false
      // Clear any previous instance before re-initializing.
      widgetRef.current.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: fullUrl,
        parentElement: widgetRef.current,
      })
      initializedRef.current = true
      return true
    }

    if (tryInit()) return

    // Script not loaded yet — poll briefly while widget.js streams in from
    // <CalendlyBadge /> in the layout. Give up after 10 seconds.
    const intervalId = window.setInterval(() => {
      if (tryInit()) window.clearInterval(intervalId)
    }, 120)
    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 10_000)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [fullUrl])

  const hasHeader = heading !== null || subheading !== null

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {hasHeader ? (
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
          {heading !== null ? (
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {heading}
            </h2>
          ) : null}
          {subheading !== null ? (
            <p className="text-amber-100 text-sm mt-1">{subheading}</p>
          ) : null}
        </div>
      ) : null}

      <div
        ref={widgetRef}
        className="calendly-inline-widget"
        data-url={fullUrl}
        style={{ minWidth, height }}
        aria-label={heading ?? 'Calendly scheduling widget'}
      />
    </div>
  )
}
