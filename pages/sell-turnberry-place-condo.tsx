import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { Layout, LayoutProps } from 'components/layout'
import { getMenus } from 'lib/get-menus'
import { Meta } from 'components/meta'
import { JsonLdSchema } from 'components/json-ld-schema'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { BUILD_DATE_ISO } from 'lib/build-date'
import {
  GBP_ADDRESS,
  GBP_EMAIL,
  GBP_PHONE_DISPLAY,
  GBP_PHONE_TEL,
} from 'lib/google-business-profile'
import {
  apartmentComplexEntityId,
  realEstateAgentEntityId,
} from 'lib/schema/entityIds'
import { TURNBERRY_GEO } from 'lib/schema/geo'
import { serializeJsonLd } from 'lib/schema/serializeJsonLd'

const LISTING_CONSULTATION_URL =
  'https://calendly.com/drjanduffy/listing-consultation?utm_source=turnberryplaceforsale.com&utm_medium=website&utm_content=seller-page'

const PAGE_TITLE = 'Sell Your Turnberry Place Condo | Dr. Jan Duffy'
const PAGE_DESCRIPTION =
  'Sell your Turnberry Place condo at 2827 Paradise Rd. Dr. Jan Duffy guides Turnberry sellers. Estimate value and book a listing consultation.'

interface SellTurnberryPageProps extends LayoutProps {}

export default function SellTurnberryPlaceCondoPage({ menus }: SellTurnberryPageProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/sell-turnberry-place-condo`,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${baseUrl}/sell-turnberry-place-condo`,
    inLanguage: 'en-US',
    dateModified: BUILD_DATE_ISO,
    isPartOf: {
      '@type': 'ApartmentComplex',
      '@id': apartmentComplexEntityId(baseUrl),
    },
    about: {
      '@type': 'Place',
      name: 'Turnberry Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: GBP_ADDRESS.streetAddress,
        addressLocality: GBP_ADDRESS.addressLocality,
        addressRegion: GBP_ADDRESS.addressRegion,
        postalCode: GBP_ADDRESS.postalCode,
        addressCountry: GBP_ADDRESS.addressCountry,
      },
      geo: TURNBERRY_GEO,
    },
    provider: {
      '@id': realEstateAgentEntityId(baseUrl),
    },
  }

  const propertyAddress = `${GBP_ADDRESS.streetAddress}, ${GBP_ADDRESS.addressLocality}, ${GBP_ADDRESS.addressRegion} ${GBP_ADDRESS.postalCode}`

  return (
    <Layout menus={menus}>
      <Meta
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/sell-turnberry-place-condo"
      />
      <JsonLdSchema type="property" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(webPageSchema, true),
        }}
      />
      <BreadcrumbSchema
        items={[
          {
            name: 'Sell Your Turnberry Place Condo',
            url: `${baseUrl}/sell-turnberry-place-condo`,
          },
        ]}
      />

      <div className="card-content card-open-house">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="page-header mb-4">
                <h1>Sell Your Turnberry Place Condo</h1>
                <p className="lead">
                  Dr. Jan Duffy helps owners market and sell residences at Turnberry
                  Place, the four-tower guard-gated condominium community at 2827
                  Paradise Rd, ZIP 89109, one block east of the Las Vegas Strip.
                </p>
              </div>

              <div className="content-section mb-5">
                <h2>About Turnberry Place</h2>
                <p>
                  Turnberry Place comprises four residential towers, each 38 stories,
                  completed between 2001 and 2006. Public references (Wikipedia,
                  SkyscraperPage, and the CTBUH Skyscraper Center) describe roughly
                  720–778 condominium units across the campus, with resident access to
                  The Stirling Club on site. The property sits in unincorporated
                  Winchester; tours and showings use the Paradise Rd address above.
                </p>
              </div>

              <div className="content-section mb-5">
                <h2>What&apos;s my Turnberry Place condo worth?</h2>
                <p>
                  Start with the building-specific home value tool on our Price &amp;
                  Features page. It uses the same RealScout estimate widget we maintain
                  for Turnberry Place — no duplicate forms on this site.
                </p>
                <p>
                  <Link
                    href="/price-features#home-value-estimate"
                    title="Turnberry Place home value estimate"
                  >
                    What&apos;s my Turnberry Place condo worth?
                  </Link>
                </p>
              </div>

              <div className="content-section mb-5">
                <h2>Listing consultation</h2>
                <p>
                  Ready to discuss timing, pricing strategy, and marketing for your
                  Turnberry tower and floor plan? Schedule a listing consultation with
                  Dr. Jan Duffy, REALTOR® (license S.0197614.LLC), Berkshire Hathaway
                  HomeServices Nevada Properties.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 flex-wrap">
                  <a
                    href={LISTING_CONSULTATION_URL}
                    className="btn btn-custom btn-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Schedule a Turnberry Place listing consultation"
                  >
                    Schedule listing consultation
                    <span className="sr-only"> (opens Calendly in a new tab)</span>
                  </a>
                  <a
                    href={`tel:${GBP_PHONE_TEL}`}
                    className="btn btn-custom btn-lg"
                    title={`Call ${GBP_PHONE_DISPLAY}`}
                  >
                    Call {GBP_PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${GBP_EMAIL}`}
                    className="btn btn-custom btn-lg"
                    title={`Email ${GBP_EMAIL}`}
                  >
                    Email Dr. Jan Duffy
                  </a>
                </div>
              </div>

              <div className="content-section">
                <h2>Buyers still shopping Turnberry Place</h2>
                <p>
                  This page is for owners preparing to sell. If you are comparing
                  residences for purchase, browse{' '}
                  <Link href="/available-condos" title="Turnberry Place condos for sale">
                    available Turnberry Place condos
                  </Link>
                  ,{' '}
                  <Link href="/towers" title="Turnberry Place towers overview">
                    tower overview
                  </Link>
                  , and{' '}
                  <Link href="/stirling-club" title="The Stirling Club at Turnberry Place">
                    Stirling Club amenities
                  </Link>
                  .
                </p>
                <p className="mb-0 text-muted">
                  Office: {propertyAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<SellTurnberryPageProps>
> {
  return {
    props: {
      menus: await getMenus(),
    },
  }
}
