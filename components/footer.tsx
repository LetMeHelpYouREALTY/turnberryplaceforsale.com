import Link from "next/link"
import Image from "next/image"
import { BUILD_DATE_DISPLAY } from "lib/build-date"
import { CalendlyLink } from "components/calendly-link"
import { tourUrl } from "lib/calendly"
import { GBP_ADDRESS_LINE, GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"
import { SITE_INTERNAL_LINKS_FLAT } from "lib/site-internal-links"

const calendlyUrl = tourUrl({ utmMedium: "footer", utmCampaign: "footer-portrait" })

const footerLinks = SITE_INTERNAL_LINKS_FLAT

/**
 * Site footer: internal nav from `SITE_INTERNAL_LINKS_FLAT` (same source as header rows;
 * Drupal footer menu is unused on this template). NAP + JSON-LD live in Layout / schema.
 */
export function Footer() {
  return (
    <footer className="card-content card-site-footer footer-01 pt-5">
      <div className="container-fluid px-3 px-md-5">
        <div className="footer-main">
          <section aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="sr-only">
              Footer Navigation
            </h2>
            <nav aria-labelledby="footer-links-heading" id="navbarFooter">
              <ul className="row g-2 list-unstyled mb-0">
                {footerLinks.map((link) => (
                  <li
                    key={link.href}
                    className="col-6 col-sm-4 col-md-3 col-lg-2 text-center py-2"
                  >
                    <Link
                      href={link.href}
                      className="footer-nav-link"
                      title={link.linkTitle ?? link.title}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="sr-only">
              Contact Information
            </h2>
            <div className="row justify-content-center align-items-center pt-4 pt-md-5">
              <div className="agent-company-info col-12 col-lg-10 font-size-90 d-flex flex-column flex-md-row justify-content-center align-items-center text-center">
                <div className="px-2 px-md-3 mb-2 mb-md-0">
                  Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy
                </div>
                <div className="px-2 px-md-3 mb-2 mb-md-0">
                  <strong>License: S.0197614.LLC</strong>
                </div>
                <div className="px-2 px-md-3 mb-2 mb-md-0">
                  <a
                    href={`tel:${GBP_PHONE_TEL}`}
                    className="footer-phone-link"
                    title="Office phone"
                  >
                    {GBP_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="px-2 px-md-3">{GBP_ADDRESS_LINE}</div>
              </div>
            </div>
          </section>
        </div>

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
              <span className="mx-2" aria-hidden="true">
                |
              </span>
              <Link
                href="/privacy"
                className="footer-privacy-link"
                title="Privacy Policy and Cookie Policy"
              >
                Privacy, Cookie & Web Accessibility Policy
              </Link>
              <span className="mx-2" aria-hidden="true">
                |
              </span>
              <Link
                href="/accessibility"
                className="footer-privacy-link"
                title="Accessibility Statement"
              >
                Accessibility Statement
              </Link>
              <span className="mx-2" aria-hidden="true">
                |
              </span>
              <Link
                href="/sitemap.xml"
                className="footer-privacy-link"
                title="Sitemap"
              >
                Sitemap
              </Link>
            </div>
            <div className="mt-3 font-size-80 text-muted">
              Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy | {GBP_ADDRESS_LINE}{" "}
              |{" "}
              <a href={`tel:${GBP_PHONE_TEL}`} className="footer-phone-link">
                {GBP_PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-2 font-size-80 text-muted">
              Last updated: {BUILD_DATE_DISPLAY}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
