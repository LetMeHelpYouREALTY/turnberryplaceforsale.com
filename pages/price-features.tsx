import { GetStaticPropsResult } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React, { useEffect, useMemo, useState } from "react"
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Shield,
} from "lucide-react"

import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { tourUrl } from "lib/calendly"
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"
import { BUILD_DATE_ISO } from "lib/build-date"

interface PriceFeaturesPageProps extends LayoutProps {}

export default function PriceFeaturesPage({ menus }: PriceFeaturesPageProps) {
  const calendlyUrl = tourUrl({ utmMedium: 'cta', utmCampaign: 'price-features' })
  const officePhoneDisplay = GBP_PHONE_DISPLAY
  const officePhoneTel = GBP_PHONE_TEL
  const propertyAddress = "2827 Paradise Rd, Las Vegas, NV 89109"

  const heroImage = "/images/turnberry/19738766_web1_2827-Paradise-17.jpg-FULL.webp"
  const towersBg = "/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg"
  const lifestyleEntry = "/images/turnberry/photo-3.jpg"
  const lifestyleElevated = "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg"
  const lifestylePenthouse = "/images/turnberry/Turnberry_edited.jpg"
  const agentPhoto = "/images/turnberry/asset-1.jpg"
  const bhhsLogo = "/images/turnberry/asset-19.jpg"

  const [openAccordion, setOpenAccordion] = useState<
    "financing" | "hoa" | "tax" | "included" | null
  >("hoa")

  const realEstateListingSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: "Turnberry Place Las Vegas Pricing & Features",
      url: "https://www.turnberryplaceforsale.com/price-features",
      description:
        "Turnberry Place Las Vegas pricing and features for luxury high-rise condos from $800K to $10M+. Four towers, Stirling Club amenities, guard-gated security, and Strip-adjacent location.",
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
      { threshold: 0.18 }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Pricing & Features | $800K-$10M+"
        ogImage="https://www.turnberryplaceforsale.com/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg"
        ogImageAlt="Turnberry Place towers near the Las Vegas Strip"
        path="/price-features"
      />
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateListingSchema) }}
        />
      </Head>
      <JsonLdSchema type="property" propertyPrice="$800,000 - $10,000,000+" />
      <BreadcrumbSchema items={[{ name: 'Price & Features', url: 'https://www.turnberryplaceforsale.com/price-features' }]} />
      
      <div className="card-content card-price-features price-features-page">
        {/* HERO */}
        <section className="price-features-hero" aria-label="Turnberry Place pricing hero">
          <div className="price-features-hero-media" aria-hidden="true">
            <Image
              src={heroImage}
              alt="Turnberry Place Las Vegas luxury high-rise condos"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="price-features-hero-overlay" aria-hidden="true" />

          <div className="container price-features-hero-inner">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <div className="price-features-eyebrow" data-reveal>
                  <span className="price-features-pill">Pricing</span>
                  <span className="price-features-sep" aria-hidden="true">
                    •
                  </span>
                  <span>Four Towers. One Block from the Strip.</span>
                </div>

                <h1 className="price-features-hero-title" data-reveal>
                  Turnberry Place Pricing & Features
                </h1>
                <p className="price-features-hero-subtitle" data-reveal>
                  Luxury high-rise condos from <strong>$800K</strong> to{" "}
                  <strong>$10M+</strong> at{" "}
                  <span className="text-decoration-underline">{propertyAddress}</span>.
                </p>

                <div className="price-features-hero-ctas" data-reveal>
                  <a
                    className="btn btn-primary btn-lg price-features-btn-gold"
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarDays aria-hidden="true" className="mr-2" />
                    Schedule Private Tour
                    <span className="sr-only"> (opens Calendly in a new tab)</span>
                  </a>
                  <a
                    className="btn btn-outline-light btn-lg"
                    href={`tel:${officePhoneTel}`}
                  >
                    Call {officePhoneDisplay}
                  </a>
                </div>

                <div className="price-features-scroll" aria-hidden="true">
                  <div className="price-features-scroll-line" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOWERS PRICING GRID */}
        <section className="price-features-section" aria-label="Tower pricing grid">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <h2 className="price-features-h2" data-reveal>
                  Tower Pricing Overview
                </h2>
                <p className="price-features-lead" data-reveal>
                  Pricing varies by tower, view, floor, and finish level. A helpful guide is{" "}
                  <strong>$600–$1,200 / sq ft</strong> across Turnberry Place.
                </p>
              </div>
            </div>

            <div
              className="price-features-tower-grid"
              style={{
                backgroundImage: `url(${towersBg})`,
              }}
            >
              <div className="price-features-tower-grid-overlay" aria-hidden="true" />

              <div className="price-features-tower-cards">
                {[
                  {
                    tower: "Tower 1",
                    range: "$800K – $4M",
                    beds: "1–3 beds",
                    sqft: "1,200–3,500+ sq ft",
                    ppsf: "$600–$900 / sq ft",
                    href: "/towers",
                  },
                  {
                    tower: "Tower 2",
                    range: "$1.2M – $7M",
                    beds: "1–4 beds",
                    sqft: "1,500–5,500+ sq ft",
                    ppsf: "$700–$1,000 / sq ft",
                    href: "/towers",
                  },
                  {
                    tower: "Tower 3",
                    range: "$1.2M – $7M",
                    beds: "1–4 beds",
                    sqft: "1,500–5,500+ sq ft",
                    ppsf: "$700–$1,000 / sq ft",
                    href: "/towers",
                  },
                  {
                    tower: "Tower 4",
                    range: "$1.5M – $10M+",
                    beds: "1–4 beds + Penthouses",
                    sqft: "2,000–8,000+ sq ft",
                    ppsf: "$800–$1,200 / sq ft",
                    href: "/towers",
                  },
                ].map((t, idx) => (
                  <div className="price-features-tower-card" key={idx} data-reveal>
                    <div className="price-features-tower-card-top">
                      <div className="price-features-tower-icon" aria-hidden="true">
                        <Building2 />
                      </div>
                      <div>
                        <div className="price-features-tower-name">{t.tower}</div>
                        <div className="price-features-tower-range">{t.range}</div>
                      </div>
                    </div>
                    <div className="price-features-tower-meta">
                      <div>{t.beds}</div>
                      <div>{t.sqft}</div>
                      <div className="price-features-ppsf">{t.ppsf}</div>
                    </div>
                    <div className="mt-3">
                      <Link href={t.href} className="btn btn-outline-light btn-sm">
                        View Tower Details
                        <ChevronDown aria-hidden="true" className="ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RealScout home valuation — kept off homepage (single script load per priority URL) */}
        <section
          className="price-features-section"
          aria-label="Home value estimate"
          id="home-value-estimate"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8 text-center">
                <h2 className="price-features-h2" data-reveal>
                  What&apos;s Your Home Worth?
                </h2>
                <p className="price-features-lead mb-4" data-reveal>
                  Get an instant estimate with our free home valuation tool.
                </p>
                <div className="widget-card--light widget-wrapper" data-reveal>
                  <Script
                    id="realscout-widget-js"
                    src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
                    type="module"
                    strategy="lazyOnload"
                  />
                  <style jsx>{`
                    realscout-home-value {
                      width: 100%;
                      min-height: 250px;
                    }
                  `}</style>
                  <realscout-home-value agent-encoded-id="QWdlbnQtMjI1MDUw" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIFESTYLE TIERS */}
        <section className="price-features-section" aria-label="Lifestyle tiers">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <h2 className="price-features-h2" data-reveal>
                  Residence Features by Price Tier
                </h2>
                <p className="price-features-lead" data-reveal>
                  Buyers aren’t just buying square footage — they’re buying lifestyle.
                </p>
              </div>
            </div>

            {/* Tier 1 */}
            <div className="price-features-tier" data-reveal>
              <div className="price-features-tier-media">
                <Image
                  src={lifestyleEntry}
                  alt="Modern condo lifestyle at Turnberry Place"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="price-features-tier-body">
                <div className="price-features-tier-kicker">The Sophisticated Entry</div>
                <h3 className="price-features-h3">$800K – $2M</h3>
                <p className="price-features-copy">
                  Your first step into Strip-adjacent luxury — premium finishes, private terraces, and
                  access to The Stirling Club.
                </p>
                <ul className="price-features-iconlist">
                  <li>
                    <CheckCircle2 aria-hidden="true" /> 1–2 bedrooms
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" /> Approx. 1,200–2,500 sq ft
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" /> Private balcony/terrace
                  </li>
                </ul>
                <div className="price-features-tier-cta">
                  <Link href="/available-condos" className="btn btn-primary price-features-btn-gold">
                    Explore Available Units
                  </Link>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="price-features-tier price-features-tier-reverse" data-reveal>
              <div className="price-features-tier-media">
                <Image
                  src={lifestyleElevated}
                  alt="Luxury interior with floor-to-ceiling windows"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="price-features-tier-body">
                <div className="price-features-tier-kicker">The Elevated Address</div>
                <h3 className="price-features-h3">$2M – $5M</h3>
                <p className="price-features-copy">
                  Space to breathe, views to remember — larger terraces, upgraded finishes, and an
                  entertaining-ready layout.
                </p>
                <ul className="price-features-iconlist">
                  <li>
                    <CheckCircle2 aria-hidden="true" /> 2–3 bedrooms
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" /> Approx. 2,000–4,000 sq ft
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" /> Premium appliances & finishes
                  </li>
                </ul>
                <div className="price-features-tier-cta">
                  <a
                    className="btn btn-primary price-features-btn-gold"
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Private Tour
                  </a>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="price-features-tier price-features-tier-full" data-reveal>
              <div className="price-features-tier-full-media" aria-hidden="true">
                <Image
                  src={lifestylePenthouse}
                  alt="Penthouse lifestyle with panoramic views"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="price-features-tier-full-overlay" aria-hidden="true" />
              <div className="price-features-tier-full-body">
                <div className="price-features-tier-kicker">The Penthouse Collection</div>
                <h3 className="price-features-h3">$5M – $10M+</h3>
                <p className="price-features-copy">
                  Above it all — dramatic views, multiple terraces, expansive layouts, and the most
                  refined finishes in the community.
                </p>
                <div className="price-features-tier-cta">
                  <Link href="/request-details" className="btn btn-primary price-features-btn-gold btn-lg">
                    Request Penthouse Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TURNBERRY */}
        <section className="price-features-section" aria-label="Why Turnberry">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <h2 className="price-features-h2" data-reveal>
                  Why Turnberry Place
                </h2>
                <p className="price-features-lead" data-reveal>
                  A fast, scannable snapshot of what supports premium pricing — in under 3 seconds.
                </p>
              </div>
            </div>

            <div className="row">
              {[
                {
                  icon: MapPin,
                  stat: "1 Block",
                  title: "Location",
                  copy: "Walk to world-class dining, shows, and entertainment near the Strip.",
                },
                {
                  icon: Building2,
                  stat: "80,000 sq ft",
                  title: "Lifestyle",
                  copy: "Private club amenities: pools, spa, tennis, dining, and more.",
                },
                {
                  icon: Shield,
                  stat: "24/7",
                  title: "Security",
                  copy: "Guard-gated entry, surveillance, and privacy-focused access.",
                },
              ].map((c, idx) => (
                <div className="col-12 col-md-4 mb-4" key={idx} data-reveal>
                  <div className="price-features-why-card">
                    <div className="price-features-why-icon" aria-hidden="true">
                      <c.icon />
                    </div>
                    <div className="price-features-why-stat">{c.stat}</div>
                    <div className="price-features-why-title">{c.title}</div>
                    <div className="price-features-why-copy">{c.copy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INVESTMENT DETAILS ACCORDION */}
        <section className="price-features-section" aria-label="Investment details accordion">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <h2 className="price-features-h2 text-center" data-reveal>
                  Investment Details
                </h2>

                <div className="price-features-accordion" data-reveal>
                  {[
                    {
                      key: "financing" as const,
                      title: "Financing Options",
                      summary: "Conventional and jumbo loans available; cash offers common.",
                      body: (
                        <>
                          <p className="mb-0">
                            Conventional financing is available for qualified buyers, and jumbo loan
                            options can support higher-priced residences. Cash purchases are common
                            in luxury transactions and can enable faster, cleaner closings.
                          </p>
                        </>
                      ),
                    },
                    {
                      key: "hoa" as const,
                      title: "Monthly HOA Fees",
                      summary: "$800–$2,500/mo depending on unit size and tower.",
                      body: (
                        <>
                          <p className="mb-0">
                            HOA dues typically range from <strong>$800 to $2,500 per month</strong>,
                            depending on unit size and tower. These often include security, building
                            operations, maintenance of common areas, and access to key amenities.
                          </p>
                        </>
                      ),
                    },
                    {
                      key: "tax" as const,
                      title: "Nevada Tax Advantages",
                      summary: "No state income tax and favorable property tax structure.",
                      body: (
                        <>
                          <p className="mb-0">
                            Nevada offers <strong>no state income tax</strong> and a generally
                            favorable property tax structure compared to many states, which can be
                            attractive for buyers relocating from higher-tax markets.
                          </p>
                        </>
                      ),
                    },
                    {
                      key: "included" as const,
                      title: "What’s Included",
                      summary: "Security, club amenities, and services that support the lifestyle.",
                      body: (
                        <ul className="mb-0">
                          <li>Guard-gated entry and 24/7 security presence</li>
                          <li>Stirling Club lifestyle amenities</li>
                          <li>Concierge-style services and building operations</li>
                        </ul>
                      ),
                    },
                  ].map((item) => {
                    const isOpen = openAccordion === item.key
                    return (
                      <div className="price-features-accordion-item" key={item.key}>
                        <button
                          type="button"
                          className="price-features-accordion-trigger"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenAccordion((prev) => (prev === item.key ? null : item.key))
                          }
                        >
                          <div>
                            <div className="price-features-accordion-title">{item.title}</div>
                            <div className="price-features-accordion-summary">{item.summary}</div>
                          </div>
                          <ChevronDown
                            aria-hidden="true"
                            className={`price-features-accordion-chevron ${isOpen ? "open" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="price-features-accordion-panel">{item.body}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / NEXT STEP */}
        <section className="price-features-cta" aria-label="Schedule a private tour">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-5 mb-4 mb-lg-0" data-reveal>
                <div className="price-features-agent-card">
                  <div className="price-features-agent-photo">
                    <Image
                      src={agentPhoto}
                      alt="Dr. Jan Duffy"
                      width={420}
                      height={520}
                      className="img-fluid-auto"
                    />
                  </div>
                  <div className="price-features-agent-body">
                    <div className="price-features-agent-name">Dr. Jan Duffy</div>
                    <div className="price-features-agent-sub">
                      Berkshire Hathaway HomeServices Nevada Properties
                    </div>
                    <div className="price-features-agent-license">License #S.0197614.LLC</div>
                    <div className="price-features-agent-phone">
                      <a href={`tel:${officePhoneTel}`}>{officePhoneDisplay}</a>
                    </div>
                    <div className="price-features-agent-logos">
                      <Image
                        src={bhhsLogo}
                        alt="Berkshire Hathaway HomeServices Nevada Properties"
                        width={260}
                        height={120}
                        className="img-auto-h"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-7" data-reveal>
                <div className="price-features-cta-panel">
                  <h2 className="price-features-h2 mb-2">Your Next Step</h2>
                  <p className="price-features-copy mb-4">
                    Want a short list of the best values in your budget range? Schedule a private
                    tour or request pricing and details.
                  </p>

                  <div className="d-flex flex-column flex-md-row gap-2 mb-4">
                    <a
                      className="btn btn-primary btn-lg price-features-btn-gold"
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CalendarDays aria-hidden="true" className="mr-2" />
                      Schedule Private Tour (30 mins)
                    </a>
                    <a className="btn btn-outline-light btn-lg" href={`tel:${officePhoneTel}`}>
                      Call {officePhoneDisplay}
                    </a>
                  </div>

                  <div className="price-features-calendly" aria-label="Schedule a private tour">
                    <div className="price-features-calendly-frame">
                      <iframe
                        title="Schedule a private tour - Calendly"
                        src={`${calendlyUrl}?hide_gdpr_banner=1`}
                        width="100%"
                        height="760"
                        className="price-features-calendly-iframe"
                        loading="lazy"
                      />
                    </div>
                    <div className="small text-muted mt-2">
                      Prefer to call?{" "}
                      <a href={`tel:${officePhoneTel}`}>{officePhoneDisplay}</a>.
                    </div>
                  </div>

                  <div className="mt-3 small text-muted">
                    Prefer to browse first?{" "}
                    <Link href="/available-condos">View current listings</Link>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* VIP Newsletter Signup - Available on homepage */}
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<PriceFeaturesPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
