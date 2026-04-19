import { GetStaticPropsResult } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import {
  Bell,
  Building2,
  CalendarDays,
  Car,
  ChevronDown,
  Dumbbell,
  Eye,
  KeyRound,
  Mountain,
  Shield,
  Sparkles,
  Utensils,
  Video,
  Waves,
} from "lucide-react"

import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { GBPMapCard } from "components/gbp-map-card"
import { tourUrl } from "lib/calendly"

const officePhoneDisplay = "(702) 500-1971"
const officePhoneTel = "+17025001971"
const propertyAddress = "2827 Paradise Rd, Las Vegas, NV 89109"
const calendlyUrl = tourUrl({ utmMedium: 'cta', utmCampaign: 'amenities' })

const heroImage =
  "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg"

const amenityIconGrid = [
  { icon: Shield, label: "Guard-Gated", desc: "24/7 security" },
  { icon: Eye, label: "City Views", desc: "Strip skyline" },
  { icon: Building2, label: "Secure Access", desc: "Controlled entry" },
  { icon: KeyRound, label: "Private Elevators", desc: "Select residences" },
  { icon: Dumbbell, label: "Fitness", desc: "Club-level training" },
  { icon: Waves, label: "Resort Pools", desc: "Indoor & outdoor" },
  { icon: Sparkles, label: "Full Spa", desc: "Wellness & beauty" },
  { icon: Mountain, label: "Mountain Views", desc: "Desert vistas" },
  { icon: Car, label: "Valet", desc: "Convenient arrivals" },
  { icon: Bell, label: "Concierge", desc: "Personal assistance" },
  { icon: Utensils, label: "Dining", desc: "On-site venues" },
] as const

interface AmenitiesPageProps extends LayoutProps {}

export default function AmenitiesPage({ menus }: AmenitiesPageProps) {
  const [openAccordion, setOpenAccordion] = useState<
    "stirling" | "security" | "services" | "longform" | null
  >(null)

  const amenitySchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: "Turnberry Place Las Vegas",
      url: "https://www.turnberryplaceforsale.com/amenities",
      description:
        "Turnberry Place amenities include the 80,000 sqft Stirling Club with pools, spa, fitness, dining, and resident services in a guard-gated luxury high-rise near the Las Vegas Strip.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2827 Paradise Rd",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Stirling Club", value: true },
        { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Fitness Center", value: true },
        { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
        { "@type": "LocationFeatureSpecification", name: "Tennis Courts", value: true },
        { "@type": "LocationFeatureSpecification", name: "Valet Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Concierge", value: true },
        { "@type": "LocationFeatureSpecification", name: "Gated", value: true },
      ],
      image: [
        `https://www.turnberryplaceforsale.com${heroImage}`,
        "https://www.turnberryplaceforsale.com/images/turnberry/Turnberry_Place_For_Sale.jpg",
      ],
    }
  }, [])

  // Reveal animations (respects reduced motion)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) return

    const els = Array.from(document.querySelectorAll("[data-reveal]"))
    if (!("IntersectionObserver" in window) || els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).classList.add("is-revealed")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16 }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Amenities | Stirling Club Las Vegas"
        description="Turnberry Place amenities include the 80,000 sqft Stirling Club with pools, spa, fitness, tennis, and dining. Guard-gated luxury living near the Las Vegas Strip. Call (702) 500-1971."
        ogImage="https://www.turnberryplaceforsale.com/images/turnberry/sterlingclubpoolwithpeople.jpeg"
        ogImageAlt="Resort-style pool at The Stirling Club at Turnberry Place Las Vegas"
        path="/amenities"
      />

      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(amenitySchema) }}
        />
      </Head>

      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Amenities', url: 'https://www.turnberryplaceforsale.com/amenities' }]} />

      <div className="amenities-page">
        {/* HERO */}
        <section className="amenities-hero" aria-label="Turnberry Place amenities hero">
          <div className="amenities-hero-media" aria-hidden="true">
            <Image
              src={heroImage}
              alt="Resort-style pool and outdoor amenities at Turnberry Place Las Vegas"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="amenities-hero-overlay" aria-hidden="true" />
          <div className="container amenities-hero-inner">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <div className="amenities-eyebrow">
                  <span className="amenities-pill">Exclusive Resident Access</span>
                </div>
                <h1 className="amenities-hero-title">The Stirling Club</h1>
                <p className="amenities-hero-subtitle">
                  80,000 square feet of private luxury — pools, spa, fitness, tennis, dining, and
                  resident services — all just steps from home.
                </p>
                <div className="amenities-hero-ctas">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning btn-lg amenities-btn-gold"
                    data-cta="schedule-tour"
                  >
                    <CalendarDays className="mr-2" aria-hidden="true" />
                    Schedule a Tour
                    <span className="sr-only"> (opens Calendly in a new tab)</span>
                  </a>
                  <a
                    href={`tel:${officePhoneTel}`}
                    className="btn btn-outline-light btn-lg"
                    aria-label={`Call ${officePhoneDisplay}`}
                    data-cta="call-office"
                  >
                    Call {officePhoneDisplay}
                  </a>
                </div>
                <div className="amenities-scroll" aria-hidden="true">
                  <ChevronDown className="amenities-chevron" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK AMENITIES GRID */}
        <section className="card-content card-amenities amenities-section" aria-label="Amenities overview">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
                <div className="text-center mb-4">
                  <h2 className="amenities-h2">Comprehensive Amenities</h2>
                  <p className="amenities-lead">
                    Turnberry Place offers resort-style living with privacy, security, and
                    best-in-class resident services near the Las Vegas Strip.
                  </p>
              </div>

                <div className="amenities-grid">
                  {amenityIconGrid.map((item) => (
                    <div key={item.label} className="amenities-grid-card" data-reveal>
                      <div className="amenities-grid-icon" aria-hidden="true">
                        <item.icon className="amenities-grid-icon-svg" aria-hidden="true" />
                      </div>
                      <div className="amenities-grid-title">{item.label}</div>
                      <div className="amenities-grid-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
          </div>
        </section>

        {/* STIRLING CLUB SHOWCASE */}
        <section className="card-content amenities-section amenities-section-dark" aria-label="The Stirling Club showcase">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="text-center mb-4">
                  <span className="amenities-kicker">Exclusive Access Included</span>
                  <h2 className="amenities-h2 text-white">The Stirling Club</h2>
                  <p className="amenities-lead text-white-50">
                    A private club experience built into your Turnberry Place lifestyle.
                  </p>
                </div>

                <div className="amenities-feature-grid">
                  <FeatureCard
                    title="Resort-Style Pools"
                    subtitle="Indoor & Outdoor"
                    imageSrc="/images/turnberry/sterlingclubpoolwithpeople.jpeg"
                    imageAlt="Resort-style pool experience at The Stirling Club"
                    description="Year-round swimming with lounge areas and a true resort feel."
                  />
                  <FeatureCard
                    title="Dining & Events"
                    subtitle="Casual to Elegant"
                    imageSrc="/images/turnberry/DinningRoom.webp"
                    imageAlt="Elegant dining venue at The Stirling Club"
                    description="Multiple venues for meals, entertaining, and private gatherings."
                  />
                  <FeatureCard
                    title="Wellness & Spa"
                    subtitle="Relaxation & Beauty"
                    imageSrc="/images/turnberry/SterlingClubWhiteRoses.jpg"
                    imageAlt="Luxury spa and wellness ambiance at The Stirling Club"
                    description="Spa services and a calm, high-end wellness atmosphere."
                  />
                  <FeatureCard
                    title="Social Lounges"
                    subtitle="Meet • Unwind • Connect"
                    imageSrc="/images/turnberry/optimized/StirlingClub_CigarBar_View1.optimized.jpg"
                    imageAlt="Stirling Club lounge interior at Turnberry Place"
                    description="Comfortable spaces designed for connection and conversation."
                  />
                </div>

                <Accordion
                  title="In-depth Stirling Club details"
                  isOpen={openAccordion === "stirling"}
                  onToggle={() => setOpenAccordion((v) => (v === "stirling" ? null : "stirling"))}
                >
                <h3>State-of-the-Art Fitness Center</h3>
                <p>
                    The Stirling Club's fitness center features state-of-the-art equipment from
                    leading manufacturers, including cardio machines, strength training equipment,
                    free weights, and functional training areas. The facility offers personal
                    training services, group fitness classes, and specialized programs tailored to
                    residents' fitness goals.
                </p>
                <h3>Resort-Style Swimming Pools</h3>
                <p>
                    The Stirling Club features both indoor and outdoor resort-style swimming pools
                    that provide year-round swimming opportunities. The outdoor pool area includes
                    cabanas, lounge areas, and a true resort-style environment.
                </p>
                <h3>Tennis and Pickleball Courts</h3>
                <p>
                    The Stirling Club includes clay tennis courts and pickleball courts that
                    provide residents with opportunities for recreational and competitive play.
                  </p>
                  <h3>Multiple Dining Venues and Social Spaces</h3>
                  <p className="mb-0">
                    Also includes: Business center • Conference rooms • Entertainment lounges
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="card-content card-amenities amenities-section" aria-label="Security and privacy">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="text-center mb-4">
                  <Shield className="amenities-section-icon" aria-hidden="true" />
                  <h2 className="amenities-h2">Security & Privacy</h2>
                  <p className="amenities-lead">
                    Peace of mind with layered security, controlled access, and privacy-forward
                    building design.
                  </p>
                </div>

                <div className="amenities-mini-grid">
                  <MiniFeature
                    icon={Shield}
                    title="Guard-Gated Entry"
                    description="24-hour security personnel monitor all access points."
                  />
                  <MiniFeature
                    icon={Video}
                    title="Video Surveillance"
                    description="Coverage of common areas, entrances, and key access points."
                  />
                  <MiniFeature
                    icon={KeyRound}
                    title="Keycard Access"
                    description="Secure entry to lobbies, elevators, and residential floors."
                  />
                  <MiniFeature
                    icon={Bell}
                    title="Concierge Support"
                    description="Visitor management, package handling, and day-to-day assistance."
                  />
                </div>

                <Accordion
                  title="More security details"
                  isOpen={openAccordion === "security"}
                  onToggle={() => setOpenAccordion((v) => (v === "security" ? null : "security"))}
                >
                  <p>
                    Turnberry Place features a guard-gated community entrance with 24-hour security
                    personnel who monitor access. Many residences feature private elevator access,
                    providing direct entry and enhanced privacy.
                  </p>
                  <p className="mb-0">
                    The development’s positioning and design also help reduce street noise while
                    keeping you close to the Las Vegas Strip.
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* VIEWS */}
        <section className="amenities-views" aria-label="Views from Turnberry Place">
          <div className="amenities-views-grid">
            <div className="amenities-view-card" data-reveal>
              <Image
                src="/images/turnberry/download.jpeg"
                alt="Las Vegas Strip skyline views near Turnberry Place"
                fill
                className="object-cover amenities-view-img"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="amenities-view-overlay" aria-hidden="true" />
              <div className="amenities-view-body">
                <span className="amenities-kicker">East & South Facing</span>
                <h3 className="amenities-view-title">Strip Skyline</h3>
                <p className="amenities-view-copy">
                  Front-row seats to the Strip—especially stunning after dark.
                </p>
              </div>
            </div>

            <div className="amenities-view-card" data-reveal>
              <Image
                src="/images/turnberry/turnberry-tower-south-view.jpeg"
                alt="Mountain and city views from Turnberry Place Las Vegas"
                fill
                className="object-cover amenities-view-img"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="amenities-view-overlay" aria-hidden="true" />
              <div className="amenities-view-body">
                <span className="amenities-kicker">West & North Facing</span>
                <h3 className="amenities-view-title">Desert & Mountain Vistas</h3>
                <p className="amenities-view-copy">
                  Sunrise and sunset moments that remind you why Las Vegas is unique.
                </p>
              </div>
            </div>
          </div>
          <div className="amenities-views-note">
            <p className="mb-0">
              <span className="amenities-note-strong">Upper-floor penthouses:</span>{" "}
              panoramic views that can combine both city lights and desert horizons.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section className="card-content card-amenities amenities-section" aria-label="Resident services">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="text-center mb-4">
                  <h2 className="amenities-h2">Resident Services</h2>
                  <p className="amenities-lead">
                    Maintenance-free living supported by concierge-style services.
                  </p>
                </div>

                <div className="amenities-service-grid">
                  <ServiceCard title="Valet Parking" icon={Car} included description="Convenient arrivals and departures." />
                  <ServiceCard title="Concierge" icon={Bell} included description="Reservations, arrangements, and assistance." />
                  <ServiceCard title="Limousine Service" icon={Car} included description="Transportation for special occasions." />
                  <ServiceCard title="Package Management" icon={Bell} included description="Secure receiving and notifications." />
                  <ServiceCard title="Dining Venues" icon={Utensils} included description="On-site dining and social spaces." />
                </div>

                <Accordion
                  title="More service details"
                  isOpen={openAccordion === "services"}
                  onToggle={() => setOpenAccordion((v) => (v === "services" ? null : "services"))}
                >
                  <p>
                    Turnberry Place provides valet and concierge support that can help coordinate
                    deliveries, transportation arrangements, and day-to-day needs.
                  </p>
                  <p className="mb-0">
                    HOA inclusions and services can vary—ask for the latest details for your
                    preferred tower and residence type.
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE */}
        <section className="card-content amenities-section amenities-section-dark" aria-label="Exceptional value">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="text-center mb-4">
                  <h2 className="amenities-h2 text-white">Exceptional Value</h2>
                  <p className="amenities-lead text-white-50">
                    Your HOA supports a lifestyle that’s hard to replicate with separate memberships.
                  </p>
                </div>

                <div className="amenities-value-grid">
                  <ValueStat value="$0" label="Stirling Club Access" note="Private club lifestyle" />
                  <ValueStat value="$0" label="Valet & Services" note="Convenience included" />
                  <ValueStat value="24/7" label="Security Presence" note="Peace of mind" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card-content card-amenities amenities-section" aria-label="Schedule a tour CTA">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="amenities-cta-card">
                  <div className="amenities-cta-left">
                    <h2 className="amenities-cta-title">Experience These Amenities</h2>
                    <p className="amenities-cta-copy">
                      Schedule a private tour of The Stirling Club and explore Turnberry Place with
                      Dr. Jan Duffy.
                    </p>
                    <div className="amenities-cta-agent">
                      <Image
                        src="/images/turnberry/asset-1.jpg"
                        alt="Dr. Jan Duffy"
                        width={64}
                        height={64}
                        className="amenities-cta-avatar"
                      />
                      <div>
                        <div className="amenities-cta-agent-name">Dr. Jan Duffy</div>
                        <div className="amenities-cta-agent-sub">
                          Berkshire Hathaway HomeServices Nevada Properties • License #S.0197614.LLC
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amenities-cta-right">
                    <div className="amenities-cta-actions">
                      <a href={`tel:${officePhoneTel}`} className="btn btn-warning btn-lg amenities-btn-gold w-100" data-cta="cta-call">
                        Call {officePhoneDisplay}
                      </a>
                      <a
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-lg w-100"
                        data-cta="cta-schedule"
                      >
                        Schedule on Calendly
                      </a>
                      <Link href="/request-details" className="btn btn-outline-light btn-lg w-100">
                        Request Information
                      </Link>
                    </div>
                    <div className="amenities-cta-note">
                      <div>Office: {officePhoneDisplay}</div>
                      <div>{propertyAddress}</div>
                    </div>
                  </div>
                </div>

                <Accordion
                  title="Full amenities write-up (for research)"
                  isOpen={openAccordion === "longform"}
                  onToggle={() => setOpenAccordion((v) => (v === "longform" ? null : "longform"))}
                >
                  <h3>Turnberry Place Amenities: Luxury Living Redefined</h3>
                  <p>
                    Turnberry Place offers an unparalleled suite of amenities that create a true
                    luxury lifestyle experience. From the exclusive Stirling Club to comprehensive
                    security systems, these amenities set Turnberry Place apart as Las Vegas's
                    premier high-rise condominium community.
                  </p>
                  <h3>Contact Dr. Jan Duffy for Amenities Information</h3>
                  <p className="mb-0">
                    <strong>Ready to learn more?</strong> Call{" "}
                    <a href="tel:+17025001971" className="text-decoration-underline">
                      {officePhoneDisplay}
                    </a>{" "}
                    or schedule a tour on{" "}
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-underline"
                    >
                      Calendly
                    </a>
                    .
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>

      <GBPMapCard heading="Visit Us to Tour the Amenities in Person" />
    </Layout>
  )
}

function FeatureCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <div className="amenities-feature-card" data-reveal>
      <div className="amenities-feature-media" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover amenities-feature-img"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="amenities-feature-overlay" aria-hidden="true" />
      </div>
      <div className="amenities-feature-body">
        <div className="amenities-feature-subtitle">{subtitle}</div>
        <div className="amenities-feature-title">{title}</div>
        <div className="amenities-feature-desc">{description}</div>
      </div>
    </div>
  )
}

function MiniFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="amenities-mini-feature" data-reveal>
      <div className="amenities-mini-icon" aria-hidden="true">
        <Icon className="amenities-mini-icon-svg" aria-hidden="true" />
      </div>
      <div>
        <div className="amenities-mini-title">{title}</div>
        <div className="amenities-mini-desc">{description}</div>
      </div>
    </div>
  )
}

function ServiceCard({
  title,
  description,
  included = false,
  icon: Icon,
}: {
  title: string
  description: string
  included?: boolean
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="amenities-service-card" data-reveal>
      <div className="amenities-service-top">
        <div className="amenities-service-icon" aria-hidden="true">
          <Icon className="amenities-service-icon-svg" aria-hidden="true" />
        </div>
        <div>
          <div className="amenities-service-title">
            {title} {included ? <span className="amenities-badge">Included</span> : null}
          </div>
          <div className="amenities-service-desc">{description}</div>
        </div>
      </div>
    </div>
  )
}

function ValueStat({
  value,
  label,
  note,
}: {
  value: string
  label: string
  note: string
}) {
  return (
    <div className="amenities-value-stat" data-reveal>
      <div className="amenities-value">{value}</div>
      <div className="amenities-value-label">{label}</div>
      <div className="amenities-value-note">{note}</div>
    </div>
  )
}

function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="amenities-details">
      <button
        className="amenities-details-trigger"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={isOpen ? "amenities-details-chevron open" : "amenities-details-chevron"}
          aria-hidden="true"
        />
      </button>
      {isOpen ? <div className="amenities-details-panel">{children}</div> : null}
    </div>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AmenitiesPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
