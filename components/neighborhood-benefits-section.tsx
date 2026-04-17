'use client'

import React from 'react'
import { Star, Shield, Footprints, Car } from 'lucide-react'

interface BenefitCard {
  title: string
  icon: React.ReactNode
  points: string[]
  highlight?: string
}

const benefits: BenefitCard[] = [
  {
    title: 'Strip Adjacent',
    icon: <Star size={32} />,
    points: [
      "One block from the world's most famous boulevard",
      'Wynn, Encore, Resorts World within walking distance',
    ],
    highlight: 'The Entertainment Capital at your doorstep',
  },
  {
    title: 'Guard-Gated Privacy',
    icon: <Shield size={32} />,
    points: [
      '24/7 security with controlled access',
      'Elevated position minimizes street noise',
    ],
    highlight: 'Security meets serenity',
  },
  {
    title: 'Walkable Luxury',
    icon: <Footprints size={32} />,
    points: [
      '20+ Zagat-rated restaurants within walking distance',
      'No car needed for world-class dining',
    ],
    highlight: 'Fine dining steps away',
  },
  {
    title: 'Easy Access',
    icon: <Car size={32} />,
    points: [
      '10 minutes to airport',
      'Direct access to I-15 and Beltway',
    ],
    highlight: 'Connected to everything',
  },
]

export function NeighborhoodBenefitsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
            The Paradise Neighborhood
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turnberry Place sits in one of Las Vegas's most prestigious neighborhoods, offering the perfect blend of Strip proximity and residential tranquility.
          </p>
        </div>

        {/* Benefits Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  benefit: BenefitCard
}

function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 text-[#D4AF37]">
        {benefit.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>

      {/* Points */}
      <ul className="space-y-2 mb-3">
        {benefit.points.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="text-[#D4AF37] mt-1.5 flex-shrink-0" aria-hidden="true">
              •
            </span>
            <span className="text-sm leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      {/* Highlight (optional) */}
      {benefit.highlight && (
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 pt-4 border-t border-gray-100">
          {benefit.highlight}
        </p>
      )}
    </div>
  )
}
