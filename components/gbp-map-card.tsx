/**
 * GBP Map Card — reusable component satisfying the site-wide "every page
 * must show map embed + hours + Call/Directions/View Reviews buttons"
 * rule (see user rule: localized NAP + GBP support).
 *
 * Drop this into any page with `<GBPMapCard />`. No props required; all
 * data flows from `lib/google-business-profile.ts` (single source of
 * truth for NAP / hours / URLs across all 19+ sibling sites).
 *
 * Accessibility:
 *   - Iframe has a `title` attribute (WCAG 4.1.2).
 *   - Hours table uses proper <dl>/<dt>/<dd> semantics; current day is
 *     marked with `aria-current="date"`.
 *   - Each CTA has a descriptive aria-label or visible text.
 *   - Loading is `lazy` so below-fold map never blocks LCP.
 *
 * Graceful degradation:
 *   - When NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true, both reviews CTAs are
 *     hidden instead of linking to a misleading URL.
 *   - Map embed works without a Maps API key (uses the public
 *     /maps?q=...&output=embed endpoint).
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, MapPin, Navigation, Star, PenSquare, Clock } from 'lucide-react'
import {
  GBP_NAME,
  GBP_ADDRESS_LINE,
  GBP_WAYFINDING,
  GBP_PHONE_DISPLAY,
  GBP_PHONE_TEL,
  GBP_HOURS,
  getMapEmbedUrl,
  getDirectionsUrl,
  gbpReviewsDisabled,
  getGbpReviewsUrl,
  getGbpWriteReviewUrl,
} from 'lib/google-business-profile'

type GBPMapCardProps = {
  /** Optional heading override. Defaults to "Visit Our Turnberry Place Office". */
  heading?: string
  /**
   * Visual density: "full" (default) renders the two-column hero layout used
   * on pages like /agent and /map; "compact" renders a vertically stacked
   * card suited to sidebars and end-of-page sections.
   */
  variant?: 'full' | 'compact'
  /**
   * Optional className on the outer `<section>`. Use to add top/bottom
   * margin to match surrounding page rhythm.
   */
  className?: string
}

export function GBPMapCard({
  heading = 'Visit Our Turnberry Place Office',
  variant = 'full',
  className = '',
}: GBPMapCardProps) {
  const reviewsHidden = gbpReviewsDisabled()
  const embedUrl = getMapEmbedUrl()
  const directionsUrl = getDirectionsUrl()
  const reviewsUrl = getGbpReviewsUrl()
  const writeReviewUrl = getGbpWriteReviewUrl()

  // Mon=0 … Sun=6 in our data; Date.getDay() is Sun=0 … Sat=6.
  const todayIndex = ((new Date().getDay() + 6) % 7)

  const isCompact = variant === 'compact'

  return (
    <section
      className={`gbp-map-card bg-gray-50 py-12 md:py-16 ${className}`.trim()}
      aria-labelledby="gbp-map-card-heading"
      itemScope
      itemType="https://schema.org/RealEstateAgent"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 id="gbp-map-card-heading" className="text-2xl md:text-3xl font-serif mb-2 text-gray-900">
            {heading}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Staffed office on the <strong className="text-gray-900">{GBP_WAYFINDING}</strong> — call ahead for guard-gated access.
          </p>
        </div>

        <div
          className={
            isCompact
              ? 'max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-md p-5 md:p-6 space-y-6'
              : 'grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto items-start bg-white rounded-2xl border border-gray-200 shadow-md p-5 md:p-8'
          }
        >
          {/* LEFT / TOP — Map embed */}
          <div className="gbp-map-embed-wrap rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="relative aspect-[4/3]">
              <iframe
                src={embedUrl}
                title={`Google Maps — ${GBP_NAME} at ${GBP_ADDRESS_LINE}`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* RIGHT / BOTTOM — NAP + Hours + CTAs */}
          <div className="space-y-5 text-gray-900">
            {/* NAP block */}
            <div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 text-amber-600 mt-1" aria-hidden="true" />
                <address className="not-italic text-gray-800" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <div className="font-semibold text-gray-900" itemProp="name">{GBP_NAME}</div>
                  <div className="text-gray-800">
                    <span itemProp="streetAddress">2827 Paradise Rd, Suite 2</span>,{' '}
                    <span itemProp="addressLocality">Las Vegas</span>,{' '}
                    <span itemProp="addressRegion">NV</span>{' '}
                    <span itemProp="postalCode">89109</span>
                  </div>
                  <div className="text-sm text-gray-600 italic">{GBP_WAYFINDING}</div>
                </address>
              </div>
            </div>

            {/* Hours block */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-amber-600" aria-hidden="true" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 m-0">
                  Office Hours
                </h3>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {GBP_HOURS.map((row) => {
                  const isToday = row.order === todayIndex
                  return (
                    <React.Fragment key={row.dayOfWeek}>
                      <dt
                        className={isToday ? 'font-semibold text-gray-900' : 'text-gray-600'}
                        aria-current={isToday ? 'date' : undefined}
                      >
                        {row.label}
                      </dt>
                      <dd
                        className={
                          isToday
                            ? 'font-semibold text-gray-900'
                            : row.closed
                              ? 'text-gray-400'
                              : 'text-gray-700'
                        }
                      >
                        {row.display}
                      </dd>
                    </React.Fragment>
                  )
                })}
              </dl>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href={`tel:${GBP_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
                aria-label={`Call ${GBP_PHONE_DISPLAY}`}
              >
                <Phone size={16} aria-hidden="true" />
                Call
              </Link>
              <Link
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 font-semibold rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Open Google Maps directions to the Turnberry Place office"
              >
                <Navigation size={16} aria-hidden="true" />
                Directions
              </Link>

              {!reviewsHidden && (
                <>
                  <Link
                    href={reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 font-semibold rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="View Google reviews for the Turnberry Place office"
                  >
                    <Star size={16} aria-hidden="true" />
                    Reviews
                  </Link>
                  <Link
                    href={writeReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 font-semibold rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="Write a Google review for the Turnberry Place office"
                  >
                    <PenSquare size={16} aria-hidden="true" />
                    Write Review
                  </Link>
                </>
              )}
            </div>

            {/* Phone number as plain text for scanners / copy-paste */}
            <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
              <span className="sr-only">Phone: </span>
              <a href={`tel:${GBP_PHONE_TEL}`} className="underline text-gray-900 font-medium" itemProp="telephone">
                {GBP_PHONE_DISPLAY}
              </a>
              <span aria-hidden="true"> · </span>
              Guard-gated — please call ahead
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
