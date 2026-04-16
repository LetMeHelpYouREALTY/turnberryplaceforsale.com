import * as React from "react"
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getMenus } from "lib/get-menus"
import { absoluteURL } from "lib/utils/absolute-url"
import { getParams } from "lib/get-params"
import { Node } from "components/node"
import { Layout, LayoutProps } from "components/layout"
import { Meta } from "components/meta"
import { HeroSlideshow } from "components/hero-slideshow"
import { ContactForm } from "components/contact-form"
import { JsonLdSchema } from "components/json-ld-schema"
import { DynamicUnitCount } from "components/dynamic-unit-count"
import { PropertyGrid } from "components/property-grid"
import { VIPNewsletterSignup } from "components/vip-newsletter-signup"
import { LuxuryAmenitiesGrid } from "components/luxury-amenities-grid"
import { LeadCaptureForm } from "components/lead-capture-form"
// Components moved to other pages:
// WhyWorkWithUs, ClientTestimonials, PowerOfNumbers, InTheMedia → /agent page
import { FeaturedListingCard } from "components/featured-listing-card"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

const RESOURCE_TYPES = ["node--page", "node--landing_page", "node--article"]

interface NodePageProps extends LayoutProps {
  node: DrupalNode
}

export default function NodePage({ node, menus }: NodePageProps) {
  const router = useRouter()

  // Handle home page when Drupal is not configured
  if (node.id === 'home' && node.type === 'node--landing_page') {
    return (
      <Layout menus={menus}>
        <Meta
          title="Turnberry Place High-Rise Condos | Near the Las Vegas Strip"
          description="Turnberry Place luxury high-rise condos near the Las Vegas Strip. Turnberry Towers Las Vegas High Rise Condos & Las Vegas Strip High Rise Condos for Sale. Call (702) 500-1971."
          keywords="Turnberry Towers Las Vegas High Rise Condos, Las Vegas Strip High Rise Condos for Sale, Turnberry Place for sale, Turnberry Place condos, Las Vegas high-rise condos, luxury condos Las Vegas, Las Vegas Strip condos, Stirling Club, Dr. Jan Duffy REALTOR"
          ogImage="https://www.turnberryplaceforsale.com/images/turnberry/Turnberry_Place_For_Sale.jpg"
          ogImageAlt="Turnberry Place Las Vegas luxury high-rise condominium community"
        />
        <Head>
          <meta name="author" content="Dr. Jan Duffy, REALTOR" />
          <meta name="geo.region" content="US-NV" />
          <meta name="geo.placename" content="Las Vegas" />
          <meta name="geo.position" content="36.1447;-115.1541" />
          <meta name="ICBM" content="36.1447, -115.1541" />
          
          {/* Performance optimizations */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://em.realscout.com" />
          
          {/* Preload critical resources for faster LCP */}
          <link
            rel="preload"
            as="image"
            href="/images/turnberry/Turnberry_Place_For_Sale.jpg"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/images/turnberry/asset-1.jpg"
          />
        </Head>
        <JsonLdSchema type="home" propertyPrice="$800,000 - $10,000,000+" />
        <HomePageContent />
      </Layout>
    )
  }

  return (
    <Layout menus={menus}>
      <Meta title={node.title} tags={node.metatag} path={node.path?.alias} />
      <Head>
        {node.content_translations?.map((translation, index) =>
          translation.langcode !== router.locale ? (
            <link
              key={index}
              rel="alternate"
              hrefLang={translation.langcode}
              href={absoluteURL(translation.path)}
            />
          ) : null
        )}
      </Head>
      <Node node={node} />
    </Layout>
  )
}

// Home page content component
function HomePageContent() {
  // Hero photos - using local images from public/images/turnberry (optimized)
  const heroPhotos = [
    "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    "/images/turnberry/optimized/StirlingClub_CigarBar_View1.optimized.jpg", // Stirling Club - Cigar Bar
    "/images/turnberry/SterlingClubDinning.avif", // Stirling Club - Dining Room
    "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg",
    "/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg",
    "/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg",
    "/images/turnberry/sterlingclubpool-.jpeg",
  ]
  
  // Additional homepage photos for various sections
  const homepagePhotos = {
    tower1: "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    tower2: "/images/turnberry/turnberry-tower-nice-view.jpg",
    tower3: "/images/turnberry/turnberry-tower-south-view.jpeg",
    tower4: "/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg",
    stirlingClub: [
      "/images/turnberry/sterlingclubpool-.jpeg",
      "/images/turnberry/optimized/StirlingClub_CigarBar_View1.optimized.jpg",
      "/images/turnberry/SterlingClubDinning.avif",
      "/images/turnberry/SterlingClubWhiteRoses.jpg",
    ],
    interior: [
      "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg",
      "/images/turnberry/photo-2.jpg",
      "/images/turnberry/photo-3.jpg",
      "/images/turnberry/photo-4.jpg",
      "/images/turnberry/photo-5.jpg",
    ],
    exterior: [
      "/images/turnberry/optimized/Turnberry-Place-May-21-2010.optimized.jpg",
      "/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg",
      "/images/turnberry/2777paradise2802-149.jpg",
    ],
  }

  return (
    <>
      {/* Hero Section with Slideshow */}
      <HeroSlideshow photos={heroPhotos} />
      
      {/* Price & Features Section - Combined like live site */}
      <section className="card-content card-price-features py-5" id="card-id-2271756" data-card-type="3" itemScope itemType="https://schema.org/Residence" aria-label="Turnberry Place Pricing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              {/* Changed from h1 to h2 - hero section already has the H1 */}
              <h2 className="mb-1" itemProp="name">Turnberry Place Las Vegas</h2>
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="addressLocality">Las Vegas</span>, <span itemProp="addressRegion">NV</span> <span itemProp="postalCode">89109</span>
              </p>
              <h2 className="h3 mb-3">4 Luxury Towers from $800,000 to $10M+</h2>
              <p className="mt-2 mb-1" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Only <DynamicUnitCount defaultCount={12} /> Units Available Now
              </p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                <time dateTime={new Date().toISOString()}>
                  Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </time>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Towers Section - Using Property Grid Component */}
      <section className="card-content card-prop-description py-5" id="card-id-2271757" data-card-type="4" aria-label="Turnberry Place Towers">
        <div className="container">
          <PropertyGrid
            title="Four Distinct Luxury Towers"
            subtitle="Turnberry Place features four luxury towers, each offering unique architectural features, premium amenities, and breathtaking views. Explore each tower to find your perfect luxury residence."
            properties={[
              {
                id: 'tower-1',
                title: 'Tower 1',
                image: homepagePhotos.tower1,
                yearCompleted: 2000,
                storyCount: 38,
                description: 'Elegant high-rise living with private elevator access and direct access to The Stirling Club.',
                href: '/available-condos?tower=1',
                alt: 'Turnberry Place Tower 1 - Elegant High-Rise Living',
              },
              {
                id: 'tower-2',
                title: 'Tower 2',
                image: homepagePhotos.tower2,
                yearCompleted: 2001,
                storyCount: 45,
                description: 'Sophisticated Strip views with larger floor plans and premium finishes.',
                href: '/available-condos?tower=2',
                alt: 'Turnberry Place Tower 2 - Sophisticated Strip Views',
              },
              {
                id: 'tower-3',
                title: 'Tower 3',
                image: homepagePhotos.tower3,
                yearCompleted: 2002,
                storyCount: 45,
                description: 'Premium desert living with contemporary designs and spacious terraces.',
                href: '/available-condos?tower=3',
                alt: 'Turnberry Place Tower 3 - Premium Desert Living',
              },
              {
                id: 'tower-4',
                title: 'Tower 4',
                image: homepagePhotos.tower4,
                yearCompleted: 2005,
                storyCount: 45,
                description: 'Ultimate luxury living with unparalleled views and exceptional finishes.',
                href: '/available-condos?tower=4',
                alt: 'Turnberry Place Tower 4 - Ultimate Luxury Living',
              },
            ]}
          />
          <div className="text-center mt-6">
            <Link href="/towers" className="btn btn-primary btn-lg">
              Learn More About All Towers
            </Link>
          </div>
        </div>
      </section>

      {/* RealScout Office Listings Widget - Featured Listings */}
      <section className="card-content card-realscout-listings py-5" id="card-id-realscout-listings" aria-label="Available Turnberry Place Condos">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-11">
              <div className="text-center mb-4">
                <h2 className="mb-3">Available Turnberry Place Condos</h2>
                <p className="lead">
                  Browse current listings with real-time availability, pricing, and property details. Use the filters to find your perfect luxury residence.
                </p>
              </div>
              <div className="widget-card--light widget-wrapper">
                <Script
                  src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
                  type="module"
                  strategy="lazyOnload"
                />
                <style jsx>{`
                  realscout-office-listings {
                    --rs-listing-divider-color: #0e64c8;
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
              <div className="text-center mt-4">
                <p className="mb-3">Interested in viewing these luxury condos?</p>
                <Link href="/available-condos" className="btn btn-primary btn-lg mr-2">
                  View All Listings
                </Link>
                <a href="tel:+17025001971" className="btn btn-outline-primary btn-lg" title="Call (702) 500-1971">
                  Call (702) 500-1971
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Amenities Section */}
      <LuxuryAmenitiesGrid />

      {/* Open House Section - Matching Live Site */}
      <section className="card-content card-open-house py-5" id="card-id-2271761" data-card-type="8" aria-label="Schedule Private Showing" style={{
        backgroundImage: "url(/images/turnberry/turnberry-tower-nice-view.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 text-center py-5">
              <div className="open-house-box p-2 p-md-4 shadow" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '4px',
              }}>
                <div className="mt-2 mb-2 text-heading text-uppercase">
                  Please join us for an
                </div>
                <div className="d-flex mb-3 mb-lg-4 align-items-center justify-content-center">
                  <div className="d-none d-md-block w-10 horiz-line" style={{ flex: '1', maxWidth: '100px', height: '1px', backgroundColor: 'rgba(222,226,230,1)' }}></div>
                  <h2 className="my-0 mx-2 text-uppercase">Open House</h2>
                  <div className="d-none d-md-block w-10 horiz-line" style={{ flex: '1', maxWidth: '100px', height: '1px', backgroundColor: 'rgba(222,226,230,1)' }}></div>
                </div>
                <div className="text-center pb-4">
                  <p className="none-scheduled mb-4">
                    Schedule a Private Showing
                  </p>
                  <Link className="btn btn-custom btn-lg" href="/request-details" title="Schedule Private Showing">
                    Schedule Private Showing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Matching Live Site */}
      <section className="card-content card-contact-form py-5" id="card-id-2271763" data-card-type="11" aria-label="Request Pricing and Details" style={{
        backgroundImage: "url(/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 text-center">
              <div className="contact-form-box p-4" style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '4px',
              }}>
                <div className="mt-0 mt-md-2 d-flex align-items-center justify-content-center">
                  <div className="w-10 horiz-line d-none d-sm-block" style={{ flex: '1', maxWidth: '100px', height: '1px', backgroundColor: 'rgba(181,152,90,1)' }}></div>
                  <h2 className="my-0 mx-2 heading-color" id="contact-label">
                    Turnberry Place Request Pricing & Details
                  </h2>
                  <div className="w-10 horiz-line d-none d-sm-block" style={{ flex: '1', maxWidth: '100px', height: '1px', backgroundColor: 'rgba(181,152,90,1)' }}></div>
                </div>
                <LeadCaptureForm variant="footer" showValuationCTA={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Value Widget - RealScout (Compact) */}
      <section className="card-content card-home-value py-5" id="card-id-home-value" aria-label="Home Value Estimate">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="text-center mb-3">
                <h2 className="h4 mb-2">What's Your Home Worth?</h2>
                <p className="small text-muted mb-3">
                  Get an instant estimate of your property's value with our free home valuation tool.
                </p>
              </div>
              <div className="widget-card--light widget-wrapper">
                <Script
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
                {/* @ts-ignore - Custom web component */}
                <realscout-home-value
                  agent-encoded-id="QWdlbnQtMjI1MDUw"
                ></realscout-home-value>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Section - Matching Live Site */}
      <section className="card-content card-agent py-5" id="card-id-2271762" data-card-type="12" aria-label="Dr. Jan Duffy, REALTOR">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="py-2 col-12 text-center">
                  <h2>Dr. Jan Duffy, REALTOR</h2>
                  <div className="my-1">
                    The Turnberry Place Team at Berkshire Hathaway HomeServices Nevada Properties
                    <br /> S.0197614.LLC
                  </div>
                </div>
                <div className="col-12 py-2 d-flex align-items-center justify-content-center">
                  <Image
                    className="img-fluid agent-photo"
                    src="/images/turnberry/asset-1.jpg"
                    alt="Photo of Dr. Jan Duffy, REALTOR - Turnberry Place Las Vegas Specialist"
                    width={225}
                    height={225}
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 225px, 225px"
                  />
                </div>
                <div className="col-12 text-center py-2">
                  <div className="py-2 d-flex flex-column flex-lg-row align-items-center justify-content-center" style={{ gap: '5px' }}>
                    <div className="mx-2" itemScope itemType="https://schema.org/LocalBusiness">
                      <span>Office:</span> <a href="tel:+17025001971" title="Phone office">(702) 500-1971</a>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link className="cursor-pointer btn-agent-bio" href="/agent" title="View Bio">
                      View Bio
                    </Link>
                  </div>
                </div>
                <div className="col-12 text-center py-2">
                  <Image
                    className="img-fluid company-logo"
                    src="/images/turnberry/asset-19.jpg"
                    alt="The Turnberry Place Team at Berkshire Hathaway HomeServices Nevada Properties Logo"
                    width={250}
                    height={100}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 200px, 250px"
                    style={{ maxHeight: '100px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Featured Images */}
      <section className="card-content card-photo-gallery py-5" id="card-id-photo-gallery" aria-label="Turnberry Place Photo Gallery">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="text-center mb-4">
                <h2 className="mb-3">Photo Gallery</h2>
                <p className="lead">
                  Explore stunning images of Turnberry Place luxury condominiums, amenities, and Las Vegas Strip views.
                </p>
              </div>
              
              {/* Featured Photo Grid */}
              <div className="row g-3 mb-4">
                {homepagePhotos.interior.slice(0, 3).map((photo, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image
                        src={photo}
                        alt={`Turnberry Place interior view ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        quality={85}
                        className="hover-zoom"
                      />
                    </div>
                  </div>
                ))}
                {homepagePhotos.exterior.slice(0, 3).map((photo, index) => (
                  <div key={`ext-${index}`} className="col-12 col-md-4">
                    <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image
                        src={photo}
                        alt={`Turnberry Place exterior view ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        quality={85}
                        className="hover-zoom"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center py-4">
                <Link href="/photos" className="btn btn-primary btn-lg">
                  View All Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section - Link to dedicated page */}
      <section className="card-content card-floor-plans py-5" id="card-id-2281722" data-card-type="34" aria-label="Floor Plans">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10 text-center">
              <h1 className="text-center mb-4">
                Floor Plans
              </h1>
              <div className="py-4">
                <Link href="/floor-plans" className="btn btn-primary btn-lg">
                  View All Floor Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Stirling Club Section - Brief Teaser with Photo Gallery */}
      <section className="card-content card-custom card-custom-03 py-5" id="card-id-2273044" data-card-type="40" aria-label="The Stirling Club">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <h1 className="text-center mb-4">The Stirling Club</h1>
              <div className="row align-items-center mb-4">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <div className="text-center">
                    <Image
                      src={homepagePhotos.stirlingClub[0]}
                      alt="The Stirling Club pool and resort-style amenities at Turnberry Place"
                      width={500}
                      height={375}
                      className="img-fluid rounded shadow-sm"
                      loading="lazy"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-content">
                    <p className="lead">
                      The crown jewel of Turnberry Place is the recently renovated Stirling Club, an 80,000 square foot private club offering world-class amenities exclusively to residents.
                    </p>
                    <p>
                      Features include state-of-the-art fitness center, resort-style pools, tennis courts, spa services, dining venues, and business facilities.
                    </p>
                    <div className="mt-3">
                      <Link href="/stirling-club" className="btn btn-primary">
                        Learn More About The Stirling Club
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stirling Club Photo Gallery */}
              <div className="row g-3 mt-3">
                {homepagePhotos.stirlingClub.slice(1, 4).map((photo, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image
                        src={photo}
                        alt={`The Stirling Club amenities ${index + 2} - Turnberry Place`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        quality={80}
                        className="hover-zoom"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turnberry Place Neighborhood Section - Link to dedicated page */}
      <section className="card-content card-areas py-5" id="card-id-2282239" data-card-type="42" aria-label="Turnberry Place Neighborhood">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
              <div className="py-4">
                <h1 className="text-center mb-4">Turnberry Place Neighborhood</h1>
                <div className="area-desc">
                  <p>Turnberry Place is located just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts. This guard-gated, four-tower condominium complex offers residents immediate proximity to the Entertainment Capital of the World while residing in a serene, tropical-inspired oasis.</p>
                </div>
                <div className="text-center mt-4">
                  <Link href="/neighborhood" className="btn btn-primary btn-lg">
                    Learn More About The Neighborhood
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  // Early return if Drupal base URL is not configured
  // Use fallback to handle root route
  if (!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        "NEXT_PUBLIC_DRUPAL_BASE_URL not set. Using fallback for all routes."
      )
    }
    return {
      paths: [],
      fallback: "blocking",
    }
  }

  // Try to get Drupal paths, but handle errors gracefully
  try {
    const drupalPaths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context, {
      params: {
        filter: {
          "field_site.meta.drupal_internal__target_id":
            process.env.DRUPAL_SITE_ID,
        },
      },
    })

    return {
      paths: drupalPaths,
      fallback: "blocking",
    }
  } catch (error) {
    // If Drupal is not available, return empty paths
    // This allows the build to continue without Drupal
    if (process.env.NODE_ENV === 'development') {
      console.warn("Drupal is not available. Using fallback for all routes.")
    }
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NodePageProps>> {
  const slug = context.params?.slug as string[] | undefined
  
  // Handle root route (/) - always return home page structure
  // Try Drupal first if configured, but fallback to static home page if it fails
  if (!slug || slug.length === 0) {
    // Try to get home page from Drupal if configured
    if (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) {
      try {
        const path = await drupal.translatePathFromContext(context)
        if (path && RESOURCE_TYPES.includes(path.jsonapi.resourceName)) {
          const node = await drupal.getResourceFromContext<DrupalNode>(path, context, {
            params: getParams(path.jsonapi.resourceName),
          })
          if (node && (context.preview || node?.status !== false)) {
            return {
              props: {
                node,
                menus: await getMenus(context),
              },
            }
          }
        }
      } catch (error) {
        // Drupal not available, fall through to static home page
        if (process.env.NODE_ENV === 'development') {
          console.warn("Drupal not available for homepage, using static fallback.")
        }
      }
    }
    
    // Return static home page structure (fallback or when Drupal not configured)
    try {
      return {
        props: {
          node: {
            type: 'node--landing_page',
            id: 'home',
            title: 'Turnberry Place Las Vegas',
            status: true,
            path: { alias: '/' },
            field_sections: [],
          } as any,
          menus: await getMenus(context),
        },
      }
    } catch (error) {
      // If getMenus fails, return empty menus
      return {
        props: {
          node: {
            type: 'node--landing_page',
            id: 'home',
            title: 'Turnberry Place Las Vegas',
            status: true,
            path: { alias: '/' },
            field_sections: [],
          } as any,
          menus: {
            main: [],
            footer: [],
          },
        },
      }
    }
  }

  // Early return if Drupal base URL is not configured for other routes
  if (!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) {
    return {
      notFound: true,
    }
  }

  // Check if this is a static page route that should be handled elsewhere
  const staticRoutes = ['towers', 'amenities', 'photos', 'floor-plans', 'stirling-club', 'neighborhood']
  if (slug && slug.length === 1 && staticRoutes.includes(slug[0])) {
    return {
      notFound: true,
    }
  }

  // Try to get Drupal data, but handle errors gracefully
  try {
    const path = await drupal.translatePathFromContext(context)

    if (!path || !RESOURCE_TYPES.includes(path.jsonapi.resourceName)) {
      return {
        notFound: true,
      }
    }

    const type = path.jsonapi.resourceName

    const node = await drupal.getResourceFromContext<DrupalNode>(path, context, {
      params: getParams(type),
    })

    if (!node || (!context.preview && node?.status === false)) {
      return {
        notFound: true,
      }
    }

    // Load initial view data.
    if (type === "node--landing_page") {
      for (const section of node.field_sections) {
        if (section.type === "paragraph--view" && section.field_view) {
          const view = await drupal.getView(section.field_view, {
            params: {
              include: "field_location,field_images.field_media_image",
            },
          })

          section.field_view = {
            name: section.field_view,
            ...view,
          }
        }
      }
    }

    return {
      props: {
        node,
        menus: await getMenus(context),
      },
    }
  } catch (error) {
    // If Drupal is not available, return not found
    // This allows the build to continue without Drupal
    if (process.env.NODE_ENV === 'development') {
      console.warn("Drupal is not available for this route. Returning not found.")
    }
    return {
      notFound: true,
    }
  }
}
