import React from 'react'
import Link from 'next/link'
import type { Place } from 'lib/places-data'
import { NEARBY_AMENITIES_COMMUNITY } from 'lib/nearby-amenities/config'
import { TURNBERRY_MAPS_Q_LATLNG } from 'lib/schema/geo'

type NearbyAmenityMapFallbackProps = {
  places: Place[]
  mapTitle?: string
}

export function NearbyAmenityMapFallback({
  places,
  mapTitle = `Map centered on ${NEARBY_AMENITIES_COMMUNITY.name}`,
}: NearbyAmenityMapFallbackProps) {
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(TURNBERRY_MAPS_Q_LATLNG)}&z=14&output=embed`

  return (
    <div className="nearby-amenity-map-fallback">
      <div className="nearby-amenity-map-fallback__map">
        <iframe
          src={embedSrc}
          title={mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="nearby-amenity-map-fallback__iframe"
        />
      </div>
      <div className="nearby-amenity-map-fallback__list">
        <h3 className="nearby-amenity-map-fallback__list-title">
          Curated places near {NEARBY_AMENITIES_COMMUNITY.name}
        </h3>
        <ul className="nearby-amenity-map-fallback__places">
          {places.slice(0, 12).map((place) => (
            <li key={`${place.name}-${place.address}`}>
              <strong>{place.name}</strong>
              <span className="nearby-amenity-map-fallback__meta">
                {place.distance}
                {place.address ? ` · ${place.address}` : ''}
              </span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nearby-amenity-map-fallback__directions"
              >
                Directions
                <span className="sr-only"> to {place.name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        {places.length > 12 && (
          <p className="nearby-amenity-map-fallback__more">
            Showing 12 of {places.length} curated locations.{' '}
            <Link href="/nearby-amenities">See the full nearby amenities guide</Link>
          </p>
        )}
      </div>
    </div>
  )
}
