'use client'

/**
 * Floating Calendly badge widget — site-wide "Schedule time with me"
 * button that opens the 15-minute consultation popup on click.
 *
 * Loaded once globally from <Layout /> so the script + stylesheet
 * aren't duplicated across pages. Other Calendly components on the
 * site (components/calendly-embed.tsx, components/calendly-button.tsx)
 * reuse the same `window.Calendly` object this badge initializes,
 * so their widgets benefit from the pre-loaded script.
 *
 * Best practices applied (2026):
 *   - next/script with strategy="afterInteractive" so the badge never
 *     blocks LCP and only loads after the page is interactive.
 *   - Deduplicated via id="calendly-widget-js"; Next.js ensures the
 *     same <script> never mounts twice even if this component re-
 *     renders or another Calendly component loads the same URL.
 *   - `onReady` (not `onLoad`) so initialization runs on every mount
 *     AND on the first load, keeping the badge visible after client-
 *     side navigation between pages.
 *   - branding: false per the embed snippet provided by the operator
 *     (requires a paid Calendly plan to actually hide the "Powered by
 *     Calendly" chip).
 *   - Fixed-position badge is placed by Calendly itself in the
 *     bottom-right corner of the viewport; no CLS impact on page
 *     layout.
 */

import Head from 'next/head'
import Script from 'next/script'
import { consultationUrl } from 'lib/calendly'

const BADGE_CONFIG = {
  url: consultationUrl({ utmMedium: 'badge' }),
  text: 'Schedule time with me',
  color: '#0069ff',
  textColor: '#ffffff',
  branding: false,
} as const

export function CalendlyBadge() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </Head>
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && window.Calendly?.initBadgeWidget) {
            window.Calendly.initBadgeWidget({ ...BADGE_CONFIG })
          }
        }}
      />
    </>
  )
}
