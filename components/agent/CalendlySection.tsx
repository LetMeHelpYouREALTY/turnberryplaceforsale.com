"use client"

/**
 * Agent page Calendly section.
 *
 * Refactored 2026-04-18: switched from a lazy-toggle iframe to an
 * always-visible inline <CalendlyEmbed /> of the 15-minute consultation.
 * Rationale: the site-wide <CalendlyBadge /> already loads widget.js
 * once via next/script with `afterInteractive` strategy, so the marginal
 * cost of rendering the inline widget in-place is minimal — and the UX
 * win (zero clicks to booking) is worth it on the page where users have
 * demonstrated intent to actually reach Dr. Jan Duffy.
 */

import Image from "next/image"
import CalendlyEmbed from "components/calendly-embed"
import { consultationUrl } from "lib/calendly"

const GOLD = "#D4AF37"

export function CalendlySection() {
  const url = consultationUrl({ utmMedium: 'inline', utmCampaign: 'agent-page' })

  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Schedule a conversation with Dr. Jan Duffy">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              Book a 15-Minute Conversation
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Pick a time that works for you — we&apos;ll talk towers, views, budget,
              and whether Turnberry Place fits what you&apos;re looking for. No pressure,
              no commitment.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+17025001971"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-gray-900 shadow-sm"
                style={{ backgroundColor: GOLD }}
                aria-label="Call (702) 500-1971"
                data-cta="agent-schedule-call"
              >
                Call (702) 500-1971
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-200">
                  <Image
                    src="/images/turnberry/asset-1.jpg"
                    alt="Dr. Jan Duffy"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Dr. Jan Duffy</div>
                  <div className="text-sm text-gray-600">
                    Turnberry Place Resident • REALTOR (S.0197614.LLC)
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Prefer email?{" "}
                <a className="underline" href="mailto:DrDuffy@TurnberryPlaceForSale.com">
                  DrDuffy@TurnberryPlaceForSale.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <CalendlyEmbed
              url={url}
              heading="15-Minute Conversation"
              subheading="With Dr. Jan Duffy — low-pressure chat about your Turnberry Place interest"
              height="720px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
