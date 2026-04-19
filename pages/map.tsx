'use client'

import { GetStaticPropsResult } from "next"
import { useState } from "react"
import { Layout, LayoutProps } from "components/layout"
import { MapHeroSection } from "components/map-hero-section"
import { CategoryFilterTabs } from "components/category-filter-tabs"
import { PlaceCardsGrid } from "components/place-cards-grid"
import { InteractiveMap } from "components/interactive-map"
import { DistanceReferenceSection } from "components/distance-reference-section"
import { NeighborhoodBenefitsSection } from "components/neighborhood-benefits-section"
import { DirectionsContactCTA } from "components/directions-contact-cta"
import { placesData, type Place } from "lib/places-data"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { MapPlaceSchema } from "components/map-place-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"

interface MapPageProps extends LayoutProps {}

export default function MapPage({ menus }: MapPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  // Google Maps JS API key — env-only per security-env.mdc rule. When
  // unset, <InteractiveMap /> renders a graceful "map pending" state.
  // Restrict the key in Google Cloud Console to the site's HTTP referrer
  // before shipping to production.
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const streetAddress = "2827 Paradise Rd, Suite 2, Las Vegas, NV 89109"

  const handleCategoryChange = (categoryId: string, query: string) => {
    setActiveCategory(categoryId)
    setSelectedPlace(null) // Clear selection when category changes
  }

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place)
    // Scroll to map smoothly
    const mapContainer = document.getElementById('map-container')
    if (mapContainer) {
      mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Location | One Block From Las Vegas Strip"
        description="Turnberry Place at 2827 Paradise Rd - one block from the Strip, 10 min to airport. See nearby dining, entertainment, and shopping. Call (702) 500-1971."
        path="/map"
      />
      <MapPlaceSchema />
      <BreadcrumbSchema currentPageTitle="Turnberry Place Location" />
      
      {/* Map Hero Section */}
      <MapHeroSection address={streetAddress} mapKey={mapKey} />
      
      <div className="card-content card-map pt-0 pt-md-5">
        <div className="container-fluid px-0 mx-0">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4">Explore Nearby Places</h2>
              <p className="lead text-center mb-4">
                Use the interactive map below to discover nearby schools, parks, restaurants, coffee shops, and other amenities that make this location ideal for luxury living.
              </p>
              
              {/* Category Filter Tabs */}
              <CategoryFilterTabs
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
              {/* Interactive Map */}
              <InteractiveMap
                mapKey={mapKey}
                center={{ lat: 36.1408, lng: -115.1564 }}
                zoom={15}
                activeCategory={activeCategory}
                places={placesData}
                onPlaceClick={handlePlaceClick}
                selectedPlace={selectedPlace}
              />
            </div>
          </div>

          {/* Place Cards Grid */}
          <PlaceCardsGrid 
            activeCategory={activeCategory} 
            onPlaceClick={handlePlaceClick}
          />

          {/* Distance Reference Section */}
          <DistanceReferenceSection />

          {/* Neighborhood Benefits Section */}
          <NeighborhoodBenefitsSection />

          {/* Directions & Contact CTA */}
          <DirectionsContactCTA address={streetAddress} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<MapPageProps>> {
  // Handle Drupal connection errors gracefully
  try {
    return {
      props: {
        menus: await getMenus({} as any),
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
