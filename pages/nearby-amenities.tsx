import { GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, LayoutProps } from 'components/layout'
import { Meta } from 'components/meta'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { DirectionsContactCTA } from 'components/directions-contact-cta'
import { NearbyAmenityMap } from 'components/nearby-amenity-map'
import { getMenus } from 'lib/get-menus'
import {
  NEARBY_AMENITIES_COMMUNITY,
  NEARBY_AMENITIES_PAGE_PATH,
} from 'lib/nearby-amenities/config'
import {
  NEARBY_AMENITIES_FAQ,
  NEARBY_AMENITIES_SECTIONS,
} from 'lib/nearby-amenities/content'
import { GBP_PHONE_DISPLAY } from 'lib/google-business-profile'
import { buildNearbyAmenitiesPageGraph } from 'lib/schema/nearbyAmenitiesPage'
import { buildBreadcrumbListSchema } from 'lib/schema/breadcrumbList'
import { serializeJsonLd } from 'lib/schema/serializeJsonLd'

interface NearbyAmenitiesPageProps extends LayoutProps {}

export default function NearbyAmenitiesPage({ menus }: NearbyAmenitiesPageProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  const pageUrl = `${baseUrl}${NEARBY_AMENITIES_PAGE_PATH}`
  const pageTitle = `Nearby Amenities in ${NEARBY_AMENITIES_COMMUNITY.name}, Las Vegas`
  const metaDescription = `Restaurants, grocery, healthcare, shopping, and Strip resorts near Turnberry Place at 2827 Paradise Rd—hyperlocal guide by Dr. Jan Duffy. Call ${GBP_PHONE_DISPLAY}.`

  const graph = buildNearbyAmenitiesPageGraph({ baseUrl, pageUrl })
  const breadcrumbSchema = buildBreadcrumbListSchema({
    items: [
      { name: 'Home', item: baseUrl },
      { name: 'Nearby Amenities', item: pageUrl },
    ],
  })

  return (
    <Layout menus={menus}>
      <Meta
        title={pageTitle}
        description={metaDescription}
        path={NEARBY_AMENITIES_PAGE_PATH}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@graph': graph,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
        />
      </Head>
      <BreadcrumbSchema
        items={[
          {
            name: 'Nearby Amenities',
            url: pageUrl,
          },
        ]}
      />

      <div className="card-content nearby-amenities-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <header className="page-header text-center mb-4">
                <h1>{pageTitle}</h1>
                <p className="lead">
                  Turnberry Place sits at {NEARBY_AMENITIES_COMMUNITY.fullAddress}, one block east
                  of the Las Vegas Strip. Use the map to explore verified dining, shopping,
                  healthcare, and recreation nearby—then connect with Dr. Jan Duffy for a private
                  tour of the towers.
                </p>
              </header>

              <NearbyAmenityMap showCategoryChips={true} />

              {NEARBY_AMENITIES_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  className="content-section nearby-amenities-page__section"
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2 id={`${section.id}-heading`}>{section.title}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <section
                className="content-section nearby-amenities-page__faq"
                aria-labelledby="nearby-faq-heading"
              >
                <h2 id="nearby-faq-heading">Nearby amenities FAQ</h2>
                <div className="nearby-amenities-page__faq-list">
                  {NEARBY_AMENITIES_FAQ.map((item) => (
                    <details key={item.question} className="nearby-amenities-page__faq-item">
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section
                className="content-section nearby-amenities-page__agent"
                aria-labelledby="nearby-agent-heading"
              >
                <h2 id="nearby-agent-heading">Your Turnberry Place REALTOR</h2>
                <p>
                  Dr. Jan Duffy, REALTOR, focuses on luxury high-rise condos at Turnberry Place
                  and across the Las Vegas Strip corridor. She is licensed in Nevada
                  (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties.
                </p>
                <p>
                  <Link href="/agent" title="Dr. Jan Duffy — Turnberry Place REALTOR profile">
                    Meet Dr. Jan Duffy
                  </Link>
                  {' · '}
                  <Link href="/available-condos" title="Turnberry Place condos for sale">
                    Browse available condos
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <DirectionsContactCTA />
    </Layout>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<NearbyAmenitiesPageProps>
> {
  try {
    return {
      props: {
        menus: await getMenus(),
      },
    }
  } catch {
    return {
      props: {
        menus: { main: [], footer: [] },
      },
    }
  }
}
