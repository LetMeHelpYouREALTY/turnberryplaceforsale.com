import React from 'react'
import Link from 'next/link'
import { NearbyAmenityMap } from 'components/nearby-amenity-map'
import { NEARBY_AMENITIES_COMMUNITY, NEARBY_AMENITIES_PAGE_PATH } from 'lib/nearby-amenities/config'

type NearbyAmenitiesSectionProps = {
  /** Optional override for section heading level (default h2). */
  heading?: string
  id?: string
}

export function NearbyAmenitiesSection({
  heading = `Life Near ${NEARBY_AMENITIES_COMMUNITY.name}`,
  id = 'whats-nearby',
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      className="card-content nearby-amenities-section py-5"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <h2 id={`${id}-title`} className="text-center mb-3">
              {heading}
            </h2>
            <p className="lead text-center mb-4">
              Explore dining, Strip resorts, grocery, healthcare, and more within minutes of{' '}
              {NEARBY_AMENITIES_COMMUNITY.fullAddress}—one block east of the Las Vegas Strip.
            </p>
            <NearbyAmenityMap showCategoryChips={true} />
            <div className="text-center mt-4">
              <Link
                href={NEARBY_AMENITIES_PAGE_PATH}
                className="btn btn-primary btn-lg"
                title="Full guide to restaurants, shopping, and services near Turnberry Place"
              >
                Nearby amenities guide for Turnberry Place
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
