'use client'

import React from 'react'
import { MapPin } from 'lucide-react'
import {
  GBP_ADDRESS_LINE,
  getDirectionsUrl,
  getMapEmbedUrl,
} from 'lib/google-business-profile'
import { TURNBERRY_MAPS_Q_LATLNG } from 'lib/schema/geo'

interface MapHeroSectionProps {
  address?: string
  mapKey?: string
}

export function MapHeroSection({
  address = GBP_ADDRESS_LINE,
  mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
}: MapHeroSectionProps) {
  const pinQ = encodeURIComponent(TURNBERRY_MAPS_Q_LATLNG)
  const mapsEmbedSrc =
    mapKey.length > 0
      ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapKey)}&q=${pinQ}&zoom=15`
      : getMapEmbedUrl()
  const directionsHref = getDirectionsUrl()

  const distances = [
    { text: '1 min walk to Las Vegas Strip', icon: '🚶' },
    { text: '5 min to Wynn/Encore', icon: '🚗' },
    { text: '10 min to airport', icon: '✈️' },
  ]

  return (
    <section className="w-full h-screen min-h-[600px] flex flex-col lg:flex-row">
      {/* Left Content - 40% */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center bg-white p-8 lg:p-12">
        <div className="max-w-lg mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            One Block From the Strip
          </h1>
          
          {/* Address */}
          <div className="flex items-start gap-3 mb-8">
            <MapPin className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: '#D4AF37' }} aria-hidden="true" />
            <address className="not-italic text-gray-700 text-lg leading-relaxed">
              {address}
            </address>
          </div>
          
          {/* Key Distances */}
          <div className="space-y-4 mb-8">
            {distances.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span className="text-gray-700 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* Get Directions — external Google Maps URL */}
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-gray-900 font-semibold rounded-lg hover:bg-[#B8941F] transition-colors shadow-md hover:shadow-lg"
            title="Open directions to Turnberry Place in Google Maps"
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* Right Map - 60% */}
      <div className="w-full lg:w-3/5 h-[400px] lg:h-auto relative bg-gray-200">
        <iframe
          title="Turnberry Place Location Map"
          src={mapsEmbedSrc}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
