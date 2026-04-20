import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
// VIPNewsletterSignup available on homepage
import Script from "next/script"
import Link from "next/link"
import { BUILD_DATE_MONTH_YEAR } from "lib/build-date"
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"

interface AvailableCondosPageProps extends LayoutProps {}

export default function AvailableCondosPage({ menus }: AvailableCondosPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Condos for Sale | Las Vegas"
        description={`Browse available Turnberry Place luxury high-rise condos near the Las Vegas Strip. Las Vegas Strip High Rise Condos for Sale. Call ${GBP_PHONE_DISPLAY}.`}
        ogImage="https://www.turnberryplaceforsale.com/images/turnberry/condos_for_sale_Turnberry_Place.jpg"
        ogImageAlt="Turnberry Place condos for sale in Las Vegas"
        path="/available-condos"
      />
      <JsonLdSchema type="property" propertyPrice="$800,000 - $10,000,000+" />
      <BreadcrumbSchema items={[{ name: 'Available Condos', url: 'https://www.turnberryplaceforsale.com/available-condos' }]} />
      
      {/* Quick Search Widget - Keep on this page as it's relevant */}

      <div className="card-content card-embed-widget">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="page-header">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3">
                  <h1 className="mb-3 mb-md-0">Available Las Vegas Condos at Turnberry Place</h1>
                  <div className="status-badge" style={{
                    backgroundColor: 'var(--luxury-gold, #d4af37)',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)',
                  }}>
                    Updated: {BUILD_DATE_MONTH_YEAR}
                  </div>
                </div>
                <p className="lead">
                  Browse available luxury condominiums for sale at Turnberry Place Las Vegas, featuring one to four bedroom residences ranging from approximately $800,000 to over $10 million. Each available residence offers premium finishes, stunning views of the Las Vegas Strip or surrounding mountains, and exclusive access to The Stirling Club's world-class amenities. As a Las Vegas real estate expert with over 30 years of experience, I can provide comprehensive information about available properties and help you find the perfect Turnberry Place residence.
                </p>
              </div>

              {/* VIP Pre-Market Listings Section */}
              <div className="content-section mb-5">
                <div className="card border-primary shadow-sm" style={{ borderWidth: '2px' }}>
                  <div className="card-body p-4 text-center">
                    {/* h2: first section heading after the page h1 — must
                        be h2 to preserve semantic heading order (axe). */}
                    <h2 className="h3 mb-3" style={{ color: '#007bff' }}>
                      <strong>VIP Pre-Market Listings</strong>
                    </h2>
                    <p className="mb-4">
                      Get exclusive early access to Turnberry Place listings before they're available to the public. View upcoming properties, coming soon listings, and off-market opportunities.
                    </p>
                    <a
                      href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay00MDE0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg font-weight-bold mb-3"
                      style={{
                        padding: '0.875rem 2rem',
                        fontSize: '1rem',
                        borderRadius: '6px',
                        fontWeight: 600,
                        minWidth: '250px'
                      }}
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'click', {
                            event_category: 'VIP Pre-Market',
                            event_label: 'View Pre-Market Listings - Available Condos Page',
                            value: 1
                          })
                        }
                      }}
                    >
                      View Pre-Market Listings
                    </a>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                      <strong>Exclusive Access:</strong> This link provides early access to listings that may not yet be publicly available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="content-section">
              <div className="widget-wrapper">
                <Script
                  id="realscout-widget-js"
                  src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
                  type="module"
                  strategy="lazyOnload"
                />
                <style jsx>{`
                  realscout-office-listings {
                    --rs-listing-divider-color: #0e64c8;
                    width: 100%;
                  }
                `}</style>
                {/* @ts-ignore - Custom web component */}
                <realscout-office-listings
                  agent-encoded-id="QWdlbnQtMjI1MDUw"
                  sort-order="NEWEST"
                  listing-status="For Sale"
                  property-types=",TC,LAL"
                  price-min="500000"
                  price-max="16000000"
                ></realscout-office-listings>
              </div>
              <div className="text-center mt-4">
                <p className="mb-3">Interested in viewing these luxury condos?</p>
                <a href={`tel:${GBP_PHONE_TEL}`} className="btn btn-custom btn-lg" title={`Call ${GBP_PHONE_DISPLAY}`}>
                  Call {GBP_PHONE_DISPLAY}
                </a>
              </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-section">
                <h2>Available Turnberry Place Condominiums</h2>
                <p>
                  Browse available luxury condominiums at Turnberry Place, featuring 1-4 bedroom residences from $800K to over $10M. Each property includes premium finishes, stunning views, and exclusive access to The Stirling Club's world-class amenities.
                </p>
                <p>
                  The RealScout widget above displays current available properties with real-time information. Use the filters to find residences that match your preferences by price, size, or tower.
                </p>
                <p>
                  <strong>Ready to view available condos?</strong> Contact the office at <a href={`tel:${GBP_PHONE_TEL}`} className="text-decoration-underline">{GBP_PHONE_DISPLAY}</a> to schedule a private showing or discuss available properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AvailableCondosPageProps>> {
  // Handle Drupal connection errors gracefully
  try {
    return {
      props: {
        menus: await getMenus(),
      },
    }
  } catch (error) {
    // If Drupal is not available, return empty menus
    // This allows the build to continue without Drupal
    return {
      props: {
        menus: {
          main: [],
          footer: [],
        },
      },
    }
  }
}
