import { GetStaticPropsResult } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, Phone } from "lucide-react"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { SEOHead } from "../components/seo/SEOHead"
import { SchemaMarkup } from "../components/seo/SchemaMarkup"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { generateContactPageSchema } from "../lib/schema/generators"
import { RelatedPages } from "../components/RelatedPages"
import { BackToTop } from "../components/BackToTop"
import { LeadCaptureForm } from "components/lead-capture-form"
// ClientTestimonials and VIPNewsletterSignup available on homepage and /agent page

interface RequestDetailsPageProps extends LayoutProps {}

export default function RequestDetailsPage({ menus }: RequestDetailsPageProps) {
  const calendlyUrl = "https://calendly.com/drjanduffy/1-home-tour-30-mins"
  const officePhoneDisplay = "(702) 500-1971"
  const officePhoneTel = "+17025001971"
  const propertyAddress = "2827 Paradise Rd, Las Vegas, NV 89109"

  const heroImage = "/images/turnberry/19738766_web1_copy_2827-Paradise-15.jpg-FULL.webp"
  const agentPhoto = "/images/turnberry/asset-1.jpg"
  const bhhsLogo = "/images/turnberry/asset-19.jpg"

  const [showCalendly, setShowCalendly] = useState(false)


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
        description="Request pricing and details for Turnberry Place luxury high-rise condos near the Las Vegas Strip. Las Vegas Strip High Rise Condos for Sale. Call (702) 500-1971."
        path="/request-details"
      />
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      {/* JSON-LD Structured Data */}
      {(() => {
        const contactPageSchema = generateContactPageSchema(
          'Request Turnberry Place Pricing & Details',
          '/request-details',
          {
            description: 'Request pricing and details for Turnberry Place Las Vegas luxury high-rise condos from $800K to $10M+. Schedule a private tour or call the office for immediate help.',
          }
        )

        return <SchemaMarkup schema={contactPageSchema} key="contact-page-schema" />
      })()}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Request Details', url: '/request-details' },
        ]}
        className="container py-4"
      />
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
                  <h2 className="request-details-h2 mb-2">Send a Quick Request</h2>
                  <p className="request-details-copy mb-4">
                    Tell us what you’re looking for (tower, view, budget). We’ll respond with
                    pricing, availability, and next steps.
                  </p>
                  <LeadCaptureForm variant="footer" showValuationCTA={false} />
                </div>
              </div>
            </div>

            {/* Lazy Calendly Embed */}
            <div className="row mt-4">
              <div className="col-12" data-reveal>
                <div className="request-details-calendly">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div>
                      <h3 className="request-details-h3 mb-1">Prefer to book instantly?</h3>
                      <div className="request-details-copy mb-0">
                        Click to load the booking calendar (loads only when requested).
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary request-details-btn-gold"
                      onClick={() => setShowCalendly((v) => !v)}
                      aria-expanded={showCalendly}
                    >
                      {showCalendly ? "Hide Calendar" : "Pick a Time"}
                    </button>
                  </div>

                  {showCalendly && (
                    <div className="request-details-calendly-frame mt-3">
                      <iframe
                        title="Schedule a private tour - Calendly"
                        src={`${calendlyUrl}?hide_gdpr_banner=1`}
                        width="100%"
                        height="760"
                        style={{ border: 0 }}
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="small text-muted mt-2">
                    Or call the office at <a href={`tel:${officePhoneTel}`}>{officePhoneDisplay}</a>.
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
