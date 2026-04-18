'use client'

import React from 'react'

interface Destination {
  name: string
  distance: string
  time: string
  icon: string
  category: 'strip' | 'resort' | 'shopping' | 'airport' | 'nature'
}

const distances: Destination[] = [
  { name: 'Las Vegas Strip', distance: '0.1 mi', time: '2 min walk', icon: '⭐', category: 'strip' },
  { name: 'Wynn/Encore', distance: '0.3 mi', time: '5 min walk', icon: '🎰', category: 'resort' },
  { name: 'Resorts World', distance: '0.5 mi', time: '8 min walk', icon: '🎰', category: 'resort' },
  { name: 'Fashion Show Mall', distance: '0.8 mi', time: '4 min drive', icon: '🛍️', category: 'shopping' },
  { name: 'Harry Reid Airport', distance: '3.5 mi', time: '10 min drive', icon: '✈️', category: 'airport' },
  { name: 'T-Mobile Arena', distance: '1.2 mi', time: '5 min drive', icon: '🏀', category: 'resort' },
  { name: 'Allegiant Stadium', distance: '2.0 mi', time: '8 min drive', icon: '🏈', category: 'resort' },
  { name: 'Red Rock Canyon', distance: '20 mi', time: '25 min drive', icon: '🏜️', category: 'nature' },
  { name: 'UNLV', distance: '3.0 mi', time: '10 min drive', icon: '📚', category: 'resort' },
]

export function DistanceReferenceSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
          Minutes From Everything
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Turnberry Place puts you at the center of Las Vegas
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {distances.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{item.name}</h3>
              <p className="text-2xl font-bold text-[#D4AF37] mb-1">{item.distance}</p>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
