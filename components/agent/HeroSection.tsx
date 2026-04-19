import Image from "next/image"
import { tourUrl } from "lib/calendly"

const GOLD = "#D4AF37"

export function HeroSection() {
  const calendlyUrl =
    tourUrl({ utmMedium: 'cta', utmCampaign: 'agent-hero' })

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/turnberry/Turnberry_Place_For_Sale.jpg"
          alt="Turnberry Place luxury high-rise condos with Las Vegas Strip views"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: photo + badge */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] -rotate-6" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/turnberry/asset-1.jpg"
                  alt="Dr. Jan Duffy - Turnberry Place Resident & REALTOR"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg"
                style={{ backgroundColor: GOLD, color: "#111827" }}
              >
                Turnberry Place Resident
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center justify-center lg:justify-start gap-2 text-sm tracking-[0.25em] uppercase text-white/70">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: GOLD }}
                aria-hidden="true"
              />
              Turnberry Place • Las Vegas
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
              Dr. Jan Duffy
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-light" style={{ color: GOLD }}>
              Your Neighbor at Turnberry Place
            </p>

            <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
              I don’t just represent Turnberry Place — <strong className="text-white">I live here.</strong>{" "}
              As your neighbor, I know the towers, the views, and the details that matter when buying or selling.
            </p>

            <div className="mt-6 text-gray-300">
              <span className="font-semibold text-white">Location:</span>{" "}
              <span>Turnberry Place • 2827 Paradise Rd, Suite 2, Las Vegas, NV 89109</span>
            </div>

            {/* Service tags */}
            <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2">
              {[
                "Buyer Representation",
                "Seller Services",
                "Market Analysis",
                "Investment Guidance",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-white/85 bg-white/5"
                  style={{ borderColor: "rgba(212, 175, 55, 0.35)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+17025001971"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-gray-900 shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: GOLD, outlineColor: GOLD }}
                aria-label="Call (702) 500-1971"
                data-cta="agent-hero-call"
              >
                Call (702) 500-1971
              </a>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white border bg-white/5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ borderColor: "rgba(212, 175, 55, 0.55)", outlineColor: GOLD }}
                data-cta="agent-hero-schedule"
              >
                Schedule Tour
                <span className="sr-only"> (opens Calendly in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

