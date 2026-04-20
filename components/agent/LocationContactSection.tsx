import Link from "next/link"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"
import { tourUrl } from "lib/calendly"
import {
  GBP_ADDRESS_LINE,
  GBP_PHONE_DISPLAY,
  GBP_PHONE_TEL,
  getDirectionsUrl,
} from "lib/google-business-profile"

const GOLD = "#D4AF37"

export function LocationContactSection() {
  const address = GBP_ADDRESS_LINE
  const directionsHref = getDirectionsUrl()
  const calendlyUrl = tourUrl({ utmMedium: 'cta', utmCampaign: 'agent-location' })

  return (
    <section className="bg-gray-50 py-16 lg:py-24" aria-label="Location and contact">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
            Location & Contact
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Want a private showing? Call, book online, or send a quick message.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* NAP + deep-link to site-wide GBP map/hours block (Layout) — avoids a second map embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: GOLD }} aria-hidden="true" />
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">Turnberry Place office</div>
                    <address className="not-italic text-gray-600 mt-1">{address}</address>
                  </div>
                  <p className="text-sm text-gray-600">
                    Map embed, office hours, call, directions, and Google reviews appear in the site-wide office section at the bottom of every page.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border px-5 py-2 font-semibold text-gray-900 hover:bg-gray-50"
                      style={{ borderColor: "rgba(212, 175, 55, 0.45)" }}
                    >
                      Open in Google Maps
                    </Link>
                    <Link
                      href="#gbp-map-card-heading"
                      className="inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold text-gray-900 shadow-sm"
                      style={{ backgroundColor: GOLD }}
                    >
                      Map & hours on this page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact cards */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6" style={{ color: GOLD }} aria-hidden="true" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Phone</div>
                  <a
                    href={`tel:${GBP_PHONE_TEL}`}
                    className="mt-1 block text-2xl font-bold text-gray-900"
                    aria-label={`Call ${GBP_PHONE_DISPLAY}`}
                    data-cta="agent-contact-call"
                  >
                    {GBP_PHONE_DISPLAY}
                  </a>
                  <div className="mt-3">
                    <a
                      href={`tel:${GBP_PHONE_TEL}`}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-gray-900 shadow-sm"
                      style={{ backgroundColor: GOLD }}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6" style={{ color: GOLD }} aria-hidden="true" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Schedule</div>
                  <div className="mt-1 text-gray-900 font-semibold">
                    Book a private tour online
                  </div>
                  <div className="mt-3">
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border px-6 py-3 font-bold text-gray-900 hover:bg-gray-50"
                      style={{ borderColor: "rgba(17, 24, 39, 0.2)" }}
                      data-cta="agent-contact-schedule"
                    >
                      Schedule Tour
                      <span className="sr-only"> (opens Calendly in a new tab)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6" style={{ color: GOLD }} aria-hidden="true" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Email</div>
                  <a
                    href="mailto:DrDuffy@TurnberryPlaceForSale.com"
                    className="mt-1 block font-semibold text-gray-900 underline"
                  >
                    DrDuffy@TurnberryPlaceForSale.com
                  </a>
                  <p className="mt-3 text-gray-600">
                    <strong className="text-gray-900">Availability:</strong> I respond within 2 hours.
                    Evenings and weekends? I’m still around — I live here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

