import Link from "next/link"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

const GOLD = "#D4AF37"

export function LocationContactSection() {
  const address = "2827 Paradise Rd, Suite 2, Las Vegas, NV 89109"
  const mapsQuery = encodeURIComponent(address)
  const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/drjanduffy/1-home-tour-30-mins"

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
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="aspect-[16/10]">
              <iframe
                title="Turnberry Place map"
                src={mapsEmbedSrc}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5" style={{ color: GOLD }} aria-hidden="true" />
                <div>
                  <div className="font-semibold text-gray-900">Turnberry Place</div>
                  <div className="text-gray-600">{address}</div>
                  <div className="mt-3">
                    <Link
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border px-5 py-2 font-semibold text-gray-900 hover:bg-gray-50"
                      style={{ borderColor: "rgba(212, 175, 55, 0.45)" }}
                    >
                      Get Directions
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
                    href="tel:+17025001971"
                    className="mt-1 block text-2xl font-bold text-gray-900"
                    aria-label="Call (702) 500-1971"
                    data-cta="agent-contact-call"
                  >
                    (702) 500-1971
                  </a>
                  <div className="mt-3">
                    <a
                      href="tel:+17025001971"
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

