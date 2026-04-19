'use client'

import { GetStaticPropsResult } from 'next'
import { Layout, LayoutProps } from 'components/layout'
import { getMenus } from 'lib/get-menus'
import { Meta } from 'components/meta'
import { JsonLdSchema } from 'components/json-ld-schema'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from 'lib/google-business-profile'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { TowerCards } from 'components/tower-cards'
import { LuxuryAmenitiesGrid } from 'components/luxury-amenities-grid'

interface MLSPageProps extends LayoutProps {}

export default function MLSPage({ menus }: MLSPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Las Vegas | MLS Property Listing"
        description={`Turnberry Place luxury high-rise condos in Las Vegas, NV 89109. 4 luxury towers from $800,000 to $10M+. Exclusive Stirling Club amenities. Call ${GBP_PHONE_DISPLAY}.`}
        keywords="Turnberry Place Las Vegas, luxury condos Las Vegas, high-rise condos for sale, Las Vegas Strip condos, MLS listing"
        ogImage="/images/turnberry/Turnberry_Place_For_Sale.jpg"
        ogImageAlt="Turnberry Place Las Vegas luxury high-rise condominium community"
        path="/mls"
      />
      <JsonLdSchema type="property" propertyPrice="$800,000 - $10,000,000+" />
      <BreadcrumbSchema currentPageTitle="Turnberry Place MLS Listing" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Turnberry Place Las Vegas
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">Las Vegas, NV</p>
            <p className="text-lg text-gray-400">Units for Sale</p>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Turnberry Place Las Vegas
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Las Vegas, NV 89109
            </p>
            <div className="inline-block bg-amber-600 text-black px-6 py-3 rounded-lg font-bold text-xl mb-6">
              Property For Sale
            </div>
            <p className="text-2xl md:text-3xl font-bold text-amber-400 mb-6">
              4 Luxury Towers from $800,000 to $10M+
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Turnberry Place | Las Vegas' Premier High-Rise Community
            </p>
          </div>
        </div>
      </section>

      {/* Tower Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Four Luxury Towers
          </h2>
          
          <TowerCards
            towers={[
              {
                number: 1,
                completed: 2000,
                stories: 38,
                sizeRange: '1,200 - 4,000',
                priceStart: '$800K',
                highlight: 'Direct Stirling Club Access',
                bestFor: 'Entry to Turnberry lifestyle',
                tagline: 'The Original',
                image: '/images/turnberry/Turnberry_Place_For_Sale.jpg',
              },
              {
                number: 2,
                completed: 2001,
                stories: 45,
                sizeRange: '1,500 - 5,000',
                priceStart: '$1.2M',
                highlight: 'Largest Floor Plans',
                bestFor: 'Space & Strip views',
                tagline: 'The Spacious One',
                image: '/images/turnberry/turnberry-tower-nice-view.jpg',
              },
              {
                number: 3,
                completed: 2002,
                stories: 45,
                sizeRange: '1,500 - 5,000',
                priceStart: '$1.2M',
                highlight: 'Contemporary Design',
                bestFor: 'Modern aesthetic lovers',
                tagline: 'The Modern Classic',
                image: '/images/turnberry/turnberry-tower-south-view.jpeg',
              },
              {
                number: 4,
                completed: 2005,
                stories: 45,
                sizeRange: '2,000 - 8,000+',
                priceStart: '$3M',
                highlight: 'Ultimate Penthouses',
                bestFor: 'Pinnacle luxury seekers',
                tagline: 'The Crown Jewel',
                image: '/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg',
              },
            ]}
          />
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Amenities
          </h2>
          <LuxuryAmenitiesGrid />
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Photo Gallery
            </h2>
            <Link
              href="/photos"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Launch Slideshow Viewer
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/turnberry/Turnberry_Place_For_Sale.jpg',
              '/images/turnberry/turnberry-tower-nice-view.jpg',
              '/images/turnberry/turnberry-tower-south-view.jpeg',
              '/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg',
            ].map((src, idx) => (
              <Link key={idx} href="/photos" className="relative aspect-square overflow-hidden rounded-lg group">
                <Image
                  src={src}
                  alt={`Turnberry Place Las Vegas - Photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-4">4 Photos - Swipe to view. Tap to zoom.</p>
        </div>
      </section>

      {/* Map & Nearby Places */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Map & Nearby Places
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['Map', 'Schools', 'Parks', 'Bars', 'Restaurants', 'Coffee', 'ATMs', 'Gyms'].map((item) => (
                <Link
                  key={item}
                  href="/map"
                  className="px-4 py-2 bg-white hover:bg-amber-600 hover:text-white text-gray-700 rounded-lg transition"
                >
                  {item}
                </Link>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Turnberry Place Las Vegas</strong>
            </p>
            <p className="text-gray-600 mb-4">Las Vegas, NV 89109</p>
            <Link
              href="/map"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View Map
            </Link>
          </div>
        </div>
      </section>

      {/* Available Condos Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Available Las Vegas Condos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Browse current listings with real-time availability, pricing, and property details.
            </p>
          </div>

          <div className="widget-wrapper">
            <Script
              id="realscout-widget-js"
              src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
              type="module"
              strategy="lazyOnload"
            />
            <style jsx>{`
              realscout-office-listings {
                --rs-listing-divider-color: #d4af37;
                width: 100%;
                min-height: 400px;
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

          <div className="text-center mt-6">
            <Link
              href="/available-condos"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition mr-4"
            >
              View All Listings
            </Link>
            <a
              href={`tel:${GBP_PHONE_TEL}`}
              className="inline-block border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Call {GBP_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Floor Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Explore 9 distinctive luxury floor plans ranging from elegant 1-bedroom residences to spectacular penthouses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {['A', 'B', 'C', 'D', 'E', 'ER', 'F', 'G', 'H'].map((plan) => (
              <Link
                key={plan}
                href="/floor-plans"
                className="bg-white hover:bg-amber-50 border-2 border-gray-200 hover:border-amber-600 rounded-lg p-4 text-center transition"
              >
                <p className="font-semibold text-gray-900">
                  Turnberry Place Floor Plan {plan}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/floor-plans"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View All Floor Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stirling Club Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                The Stirling Club
              </h2>
              <p className="text-xl text-amber-600 font-semibold mb-6">
                Exclusive Luxury at Your Doorstep
              </p>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">
              The crown jewel of Turnberry Place is the recently renovated Stirling Club, an 80,000 square foot private club offering world-class amenities exclusively to residents. This luxurious facility includes:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                'State-of-the-art fitness center',
                'Resort-style swimming pools (both indoor and outdoor)',
                'Tennis courts',
                'Spa and beauty services center',
                'Multiple dining venues and bars',
                'Business center with conference rooms',
                'Various lounges for socializing and relaxation',
              ].map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">{amenity}</p>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 mb-6">
              The Stirling Club serves as the social and recreational hub of the Turnberry Place community, providing residents with a private oasis of luxury and convenience. Its extensive offerings contribute significantly to the upscale lifestyle that defines Turnberry Place, making it a central feature that distinguishes this development from other luxury condominiums in Las Vegas.
            </p>

            <div className="text-center">
              <Link
                href="/stirling-club"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Learn More About The Stirling Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
              Turnberry Place Neighborhood and Area Profile
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Turnberry Place stands as a pinnacle of luxury living in Las Vegas, offering an unparalleled blend of privacy, convenience, and access to world-class amenities. Situated just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts, this guard-gated, four-tower condominium complex redefines upscale urban living with its strategic location and meticulously curated environment.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Prime Location</h3>
                <p className="text-gray-700">
                  Turnberry Place's location at 2747–2877 Paradise Road positions it at the heart of Las Vegas' most dynamic corridor. The property lies within a one-mile radius of over twenty Zagat-rated restaurants, including establishments at the Wynn, Encore, and Resorts World.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Security and Privacy</h3>
                <p className="text-gray-700">
                  Turnberry Place's guard-gated entrance, 24/7 security personnel, and video surveillance systems ensure a secure environment. The property's raised elevation and strategic positioning minimize street noise, while keycard access and private elevators enhance privacy.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/neighborhood"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Explore Neighborhood
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in Turnberry Place?
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact Dr. Jan Duffy for expert guidance on available properties, private showings, and comprehensive market information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${GBP_PHONE_TEL}`}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Call {GBP_PHONE_DISPLAY}
            </a>
            <Link
              href="/request-details"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Request Details
            </Link>
          </div>
          <p className="mt-6 text-gray-400">
            Dr. Jan Duffy, REALTOR® | Berkshire Hathaway HomeServices Nevada Properties<br />
            License: S.0197614.LLC
          </p>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<MLSPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
