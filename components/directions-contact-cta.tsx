'use client'

import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Calendar, Navigation } from 'lucide-react'

interface DirectionsContactCTAProps {
  address?: string
  phone?: string
  calendlyUrl?: string
}

export function DirectionsContactCTA({
  address = '2827 Paradise Rd, Las Vegas, NV 89109',
  phone = '(702) 500-1971',
  calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/drjanduffy/1-home-tour-30-mins',
}: DirectionsContactCTAProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* LEFT - Directions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <MapPin size={24} className="text-gray-900" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white">
                  Visit Turnberry Place
                </h2>
              </div>
              
              {/* Address */}
              <address className="not-italic text-gray-200 text-lg mb-6 flex items-start gap-2">
                <MapPin size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{address}</span>
              </address>
            </div>

            {/* Get Directions Button */}
            <Link
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#D4AF37] text-gray-900 font-semibold rounded-lg hover:bg-[#B8941F] transition-colors text-lg"
            >
              <Navigation size={20} className="mr-2" aria-hidden="true" />
              Get Directions
            </Link>

            {/* Direction Tips */}
            <div className="pt-6 border-t border-gray-700 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-gray-200 mb-1">From Airport:</p>
                  <p className="text-sm text-gray-400">Take Paradise Rd north, 10 min</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-gray-200 mb-1">From Strip:</p>
                  <p className="text-sm text-gray-400">One block east on any cross street</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Contact */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <Phone size={24} className="text-gray-900" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white">
                  Schedule a Private Tour
                </h2>
              </div>
              
              <p className="text-gray-200 text-lg mb-6">
                See the location in person with Dr. Jan Duffy
              </p>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <Link
                href={`tel:+1${phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-[#D4AF37] hover:text-[#B8941F] transition-colors"
              >
                <Phone size={32} aria-hidden="true" />
                <span>{phone}</span>
              </Link>
            </div>

            {/* Schedule Online Button */}
            <Link
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-gray-900 transition-colors text-lg"
            >
              <Calendar size={20} className="mr-2" aria-hidden="true" />
              Schedule Online
            </Link>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            <span className="text-[#D4AF37] font-semibold">Note:</span> Guard-gated community - please call ahead for access
          </p>
        </div>
      </div>
    </section>
  )
}
