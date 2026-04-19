import { GetStaticPropsResult } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useMemo } from "react"
import { CalendarDays, CheckCircle2, Phone } from "lucide-react"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { GBPMapCard } from "components/gbp-map-card"
import CalendlyEmbed from "components/calendly-embed"
import { tourUrl } from "lib/calendly"
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"
import { BUILD_DATE_ISO } from "lib/build-date"
// Forms have been replaced with the Calendly booking widget (2026-04-18).
// Calendly is the single conversion path; visitors who prefer to talk
// use the phone / directions CTAs in <GBPMapCard> below.

interface RequestDetailsPageProps extends LayoutProps {}

export default function RequestDetailsPage({ menus }: RequestDetailsPageProps) {
  const calendlyUrl = tourUrl({ utmMedium: 'inline', utmCampaign: 'request-details' })
  // Aliased imports from the single-source-of-truth site constants.
  const officePhoneDisplay = GBP_PHONE_DISPLAY
  const officePhoneTel = GBP_PHONE_TEL
  const propertyAddress = "2827 Paradise Rd, Las Vegas, NV 89109"

  const heroImage = "/images/turnberry/19738766_web1_copy_2827-Paradise-15.jpg-FULL.webp"
  const agentPhoto = "/images/turnberry/asset-1.jpg"
  const bhhsLogo = "/images/turnberry/asset-19.jpg"

  const realEstateListingSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: "Request Turnberry Place Pricing & Details",
      url: "https://www.turnberryplaceforsale.com/request-details",
      description:
        "Request pricing and details for Turnberry Place Las Vegas luxury high-rise condos from $800K to $10M+. Schedule a private tour or call the office for immediate help.",
      dateModified: BUILD_DATE_ISO,
      priceRange: "$800,000 - $10,000,000+",
      address: {
        "@type": "PostalAddress",
        streetAddress: propertyAddress,
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      broker: {
        "@type": "RealEstateAgent",
        name: "Dr. Jan Duffy, REALTOR",
        telephone: officePhoneTel,
        identifier: {
          "@type": "PropertyValue",
          name: "Nevada Real Estate License",
          value: "S.0197614.LLC",
        },
        memberOf: {
          "@type": "Organization",
          name: "Berkshire Hathaway HomeServices Nevada Properties",
        },
      },
    }
  }, [officePhoneTel, propertyAddress])

  // Optional reveal animations (respects reduced motion)
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
      { threshold: 0.18 }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout menus={menus}>
      <Meta
        title="Request Turnberry Place Pricing & Details | Schedule a Private Tour"
        description={`Request pricing and details for Turnberry Place luxury high-rise condos near the Las Vegas Strip. Las Vegas Strip High Rise Condos for Sale. Call ${GBP_PHONE_DISPLAY}.`}
        path="/request-details"
      />
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateListingSchema) }}
        />
      </Head>
      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Request Details', url: 'https://www.turnberryplaceforsale.com/request-details' }]} />
      <div className="card-content request-details-page">
        {/* HERO */}
        <section className="request-details-hero" aria-label="Request pricing and details hero">
          <div className="request-details-hero-media" aria-hidden="true">
            <Image
              src={heroImage}
              alt="Turnberry Place Las Vegas luxury condo interior"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="request-details-hero-overlay" aria-hidden="true" />

          <div className="container request-details-hero-inner">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <div className="request-details-eyebrow" data-reveal>
                  <span className="request-details-pill">Request Details</span>
                  <span className="request-details-sep" aria-hidden="true">
                    •
                  </span>
                  <span>Turnberry Place • Las Vegas</span>
                </div>

                <h1 className="request-details-hero-title" data-reveal>
                  Request Pricing & Details
                </h1>
                <p className="request-details-hero-subtitle" data-reveal>
                  Get current pricing, availability, and the best values by tower — plus a simple
                  next step to tour Turnberry Place.
                </p>

                <div className="request-details-hero-ctas" data-reveal>
                  <a
                    className="btn btn-primary btn-lg request-details-btn-gold"
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarDays aria-hidden="true" className="mr-2" />
                    Schedule Private Tour
                  </a>
                  <a className="btn btn-outline-light btn-lg" href={`tel:${officePhoneTel}`}>
                    <Phone aria-hidden="true" className="mr-2" />
                    Call {officePhoneDisplay}
                  </a>
                  <Link href="/available-condos" className="btn btn-outline-light btn-lg">
                    View Listings
                  </Link>
                </div>

                <div className="request-details-scroll" aria-hidden="true">
                  <div className="request-details-scroll-line" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONVERSION SECTION */}
        <section className="request-details-section" aria-label="Request details form">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-12 col-lg-5 mb-4 mb-lg-0" data-reveal>
                <div className="request-details-trust-card">
                  <div className="request-details-agent-top">
                    <div className="request-details-agent-photo">
                      <Image
                        src={agentPhoto}
                        alt="Dr. Jan Duffy"
                        width={120}
                        height={120}
                        style={{ borderRadius: "999px" }}
                      />
                    </div>
                    <div>
                      <div className="request-details-agent-name">Dr. Jan Duffy</div>
                      <div className="request-details-agent-sub">
                        Berkshire Hathaway HomeServices Nevada Properties
                      </div>
                      <div className="request-details-agent-license">License #S.0197614.LLC</div>
                      <div className="request-details-agent-phone">
                        <a href={`tel:${officePhoneTel}`}>{officePhoneDisplay}</a>
                      </div>
                    </div>
                  </div>

                  <div className="request-details-trust-bullets">
                    <div className="request-details-bullet">
                      <CheckCircle2 aria-hidden="true" /> Price guidance by tower & view
                    </div>
                    <div className="request-details-bullet">
                      <CheckCircle2 aria-hidden="true" /> Best current values in your budget
                    </div>
                    <div className="request-details-bullet">
                      <CheckCircle2 aria-hidden="true" /> Tour scheduling link included
                    </div>
                  </div>

                  <div className="request-details-bhhs">
                    <Image
                      src={bhhsLogo}
                      alt="Berkshire Hathaway HomeServices Nevada Properties"
                      width={260}
                      height={120}
                      style={{ height: "auto" }}
                    />
                  </div>

                  <div className="small text-muted mt-2">
                    Address: <span className="text-decoration-underline">{propertyAddress}</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-7" data-reveal>
                <div className="request-details-form-panel">
                  <h2 className="request-details-h2 mb-2">Schedule Your Private Tour</h2>
                  <p className="request-details-copy mb-4">
                    Pick a 30-minute slot that works for you. Dr. Jan Duffy will confirm
                    tower, view, and budget preferences when you book — she&apos;ll have
                    current pricing and availability ready for your tour.
                  </p>
                  <CalendlyEmbed url={calendlyUrl} />
                  <div className="small text-muted mt-3">
                    Prefer to talk first? Call the office at{" "}
                    <a href={`tel:${officePhoneTel}`}>{officePhoneDisplay}</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE STICKY CTA (page scoped) */}
        <div className="request-details-mobile-cta" role="region" aria-label="Quick actions">
          <a className="request-details-mobile-cta-btn" href={`tel:${officePhoneTel}`}>
            Call
          </a>
          <a
            className="request-details-mobile-cta-btn request-details-mobile-cta-btn-gold"
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule
          </a>
        </div>
      </div>

      {/* Client Testimonials Section */}
      {/* Client Testimonials and VIP Newsletter - Available on homepage and /agent page */}

      <GBPMapCard heading="Visit Our Office to Learn More" />
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<RequestDetailsPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
