'use client'

/**
 * Inline Calendly text-link CTA that opens the booking popup on click.
 *
 * Reuses the site-wide Calendly script already loaded by <CalendlyBadge />
 * (see components/layout.tsx). No extra <script> or <link> tag is injected
 * from here; just reuses the global `window.Calendly` object.
 *
 * Best practices applied (2026):
 *   - Rendered as a real <a href={url}> so middle-click, right-click,
 *     "Open in new tab", "Copy link address", and Save As all work as
 *     users expect — and screen readers announce the destination.
 *   - Also valid for SEO: search engines can follow the link to the
 *     public Calendly booking page.
 *   - Progressive enhancement: if window.Calendly isn't loaded yet
 *     (script blocked, slow network, etc.), `onClick` falls through
 *     to the native anchor behavior with target="_blank" so the
 *     booking flow still works.
 *
 * Default values match the "15-minute conversation" widget the operator
 * uses site-wide; pass different `url` / `text` / `className` when you
 * need a different slot type or visual style.
 */

import type { MouseEvent } from 'react'
import { CALENDLY_CONSULTATION_URL, buildCalendlyUrl } from 'lib/calendly'

const DEFAULT_TEXT = 'Schedule time with me'

interface CalendlyLinkProps {
  /** Calendly event URL. Defaults to the 15-minute conversation. */
  url?: string
  /** Visible link text. Defaults to "Schedule time with me". */
  text?: string
  /** Tailwind / custom classes for styling. */
  className?: string
  /** Render as a child component (e.g. a Button), passing children through. */
  children?: React.ReactNode
  /** Optional callback fired after the popup is successfully opened. Useful for analytics. */
  onOpen?: () => void
  /** UTM medium tag for attribution. Defaults to "link"; footer instances pass "footer". */
  utmMedium?: 'link' | 'footer' | 'cta'
}

export function CalendlyLink({
  url = CALENDLY_CONSULTATION_URL,
  text = DEFAULT_TEXT,
  className = '',
  children,
  onOpen,
  utmMedium = 'link',
}: CalendlyLinkProps) {
  const fullUrl = buildCalendlyUrl(url, { utmMedium })

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return
    if (window.Calendly?.initPopupWidget) {
      e.preventDefault()
      window.Calendly.initPopupWidget({ url: fullUrl })
      onOpen?.()
    }
    // If Calendly didn't load, the native anchor opens the URL in a new tab.
  }

  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      data-cta="calendly-link"
    >
      {children ?? text}
    </a>
  )
}
