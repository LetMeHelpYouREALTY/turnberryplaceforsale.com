import Link from "next/link"
import Image from "next/image"
import { DrupalMenuLinkContent } from "next-drupal"
import { BUILD_DATE_DISPLAY } from "lib/build-date"
import { CalendlyLink } from "components/calendly-link"
import { tourUrl } from "lib/calendly"
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"

interface FooterProps {
  links: DrupalMenuLinkContent[]
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
const calendlyUrl = tourUrl({ utmMedium: 'footer', utmCampaign: 'footer-portrait' })

// Organization schema for footer
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy',
  url: baseUrl,
  logo: `${baseUrl}/images/turnberry/asset-19.jpg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: GBP_PHONE_TEL,
    contactType: 'sales',
  },
}

// Single source of truth for all site navigation links
const allPages = [
  { href: "/", title: "Home" },
  { href: "/available-condos", title: "Available Condos" },
  { href: "/towers", title: "Towers" },
  { href: "/price-features", title: "Price & Features" },
  { href: "/floor-plans", title: "Floor Plans" },
  { href: "/amenities", title: "Amenities" },
  { href: "/stirling-club", title: "Stirling Club" },
  { href: "/neighborhood", title: "Neighborhood" },
  { href: "/photos", title: "Photos" },
  { href: "/map", title: "Map" },
  { href: "/open-house", title: "Open House" },
  { href: "/request-details", title: "Request Details" },
  { href: "/agent", title: "Agent" },
  { href: "/share", title: "Share" },
]

// Footer links - use same array to avoid duplication
const footerLinks = allPages

export function Footer({ links }: FooterProps) {
  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Site Links Section - Above Footer */}
      <section className="card-content site-links-section py-4" aria-label="Site Links">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 id="footer-nav-heading" className="sr-only">Site Navigation</h2>
              <nav role="navigation" aria-labelledby="footer-nav-heading">
                <div className="row g-3">
                  {allPages.map((link) => (
                    <div key={link.href} className="col-6 col-sm-4 col-md-3 col-lg-2">
                      <Link 
                        href={link.href} 
                        className="site-link-item d-block text-center py-2 px-3"
                      >
                        {link.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <footer className="card-content card-site-footer footer-01 pt-5" role="contentinfo">
        <div className="container-fluid px-3 px-md-5">
          <div className="footer-main">
            {/* Navigation Links */}
            <section aria-labelledby="footer-links-heading">
              <h2 id="footer-links-heading" className="sr-only">Footer Navigation</h2>
              <div className="row">
                <div className="col-12">
                  <nav role="navigation" aria-labelledby="footer-links-heading" id="navbarFooter">
                <div className="row g-2">
                  {footerLinks.map((link) => (
                    <div key={link.href} className="col-6 col-sm-4 col-md-3 col-lg-2 text-center py-2">
                      <Link href={link.href} className="footer-nav-link">
                        {link.title}
                      </Link>
                    </div>
                  ))}
                  </div>
                </nav>
              </div>
            </div>
          </section>

          {/* Company Information */}
          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="sr-only">Contact Information</h2>
            <div className="row justify-content-center align-items-center pt-4 pt-md-5">
              <div className="agent-company-info col-12 col-lg-10 font-size-90 d-flex flex-column flex-md-row justify-content-center align-items-center text-center">
                <div className="px-2 px-md-3 mb-2 mb-md-0">Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy</div>
                <div className="px-2 px-md-3 mb-2 mb-md-0"><strong>License: S.0197614.LLC</strong></div>
                <div className="px-2 px-md-3 mb-2 mb-md-0">
                  <a href={`tel:${GBP_PHONE_TEL}`} className="footer-phone-link" title="Office phone" itemProp="telephone">
                    {GBP_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="px-2 px-md-3">
                  2827 Paradise Rd, Suite 2, Las Vegas, NV 89109
                </div>
              </div>
            </div>
          </section>
          </div>

          {/* Berkshire Hathaway Logo */}
        <div className="row mt-4 mt-md-5">
          <div className="col-12 text-center">
            <div className="d-inline-block footer-logo-wrap">
              <Image
                src="/images/turnberry/asset-19.jpg"
                className="img-fluid footer-team-logo"
                alt="Berkshire Hathaway HomeServices Nevada Properties logo"
                width={300}
                height={125}
              />
            </div>
          </div>
        </div>

        {/* Las Vegas 55 Plus Homes Logo & Copyright */}
        <div className="row py-4 py-md-5 justify-content-center align-items-center">
          <div className="col-12 col-lg-10 text-center">
            <div className="mt-4 mt-md-5">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Schedule a private tour with Dr. Jan Duffy on Calendly"
                className="d-inline-block footer-logo-wrap"
                data-cta="footer-calendly"
              >
                <Image
                  src="/images/turnberry/asset-20.jpg"
                  className="img-fluid footer-wl-logo"
                  alt="Dr. Jan Duffy — schedule a private tour on Calendly"
                  width={300}
                  height={100}
                />
              </a>
            </div>
            <div className="mt-3 font-size-80">
              <CalendlyLink
                className="footer-privacy-link"
                text="Schedule time with me"
              />
              <span className="mx-2" aria-hidden="true">|</span>
              <Link
                href="/privacy"
                className="footer-privacy-link"
                title="Privacy Policy and Cookie Policy"
              >
                Privacy, Cookie & Web Accessibility Policy
              </Link>
              <span className="mx-2" aria-hidden="true">|</span>
              <Link
                href="/accessibility"
                className="footer-privacy-link"
                title="Accessibility Statement"
              >
                Accessibility Statement
              </Link>
              <span className="mx-2" aria-hidden="true">|</span>
              <Link
                href="/sitemap.xml"
                className="footer-privacy-link"
                title="Sitemap"
              >
                Sitemap
              </Link>
            </div>
            <div className="mt-3 font-size-80 text-muted">
              Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy | 2827 Paradise Rd, Suite 2, Las Vegas, NV 89109 | <a href={`tel:${GBP_PHONE_TEL}`} className="footer-phone-link" itemProp="telephone">{GBP_PHONE_DISPLAY}</a>
            </div>
            <div className="mt-2 font-size-80 text-muted">
              Last updated: {BUILD_DATE_DISPLAY}
            </div>
          </div>
        </div>
        </div>
      </footer>
    </>
  )
}
