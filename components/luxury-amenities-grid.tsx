'use client'

import React from 'react'
import { Shield, Dumbbell, Waves, Activity, Sparkles } from 'lucide-react'

interface Amenity {
  name: string
  icon: React.ReactNode
  description: string
}

const amenities: Amenity[] = [
  {
    name: 'Guard Gated',
    icon: <Shield className="w-8 h-8" aria-hidden="true" />,
    description: '24-hour security with controlled access',
  },
  {
    name: 'Gym',
    icon: <Dumbbell className="w-8 h-8" aria-hidden="true" />,
    description: 'State-of-the-art fitness center',
  },
  {
    name: 'Pool',
    icon: <Waves className="w-8 h-8" aria-hidden="true" />,
    description: 'Resort-style swimming pools',
  },
  {
    name: 'Tennis Courts',
    icon: <Activity className="w-8 h-8" aria-hidden="true" />,
    description: 'Professional tennis facilities',
  },
  {
    name: 'Spa',
    icon: <Sparkles className="w-8 h-8" aria-hidden="true" />,
    description: 'Luxury spa and wellness services',
  },
]

export function LuxuryAmenitiesGrid() {
  return (
    <section className="card-content card-amenities py-5" aria-label="Luxury Amenities">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="text-center mb-5">
              <h2 className="mb-3">Luxury Amenities</h2>
              <p className="lead">
                Turnberry Place residents enjoy exclusive access to world-class amenities designed for luxury living and relaxation.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="row g-4 mb-5">
              {amenities.map((amenity, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                  <div 
                    className="amenity-card h-100 text-center p-4"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="mb-3 d-flex justify-content-center" style={{ color: '#007bff' }}>
                      {amenity.icon}
                    </div>
                    <h3 className="h5 mb-2" style={{ fontWeight: 600, color: '#212529' }}>
                      {amenity.name}
                    </h3>
                    <p className="small text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stirling Club Description */}
            <div className="stirling-club-description mt-5 p-4" style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
              border: '1px solid #3a3a3a',
            }}>
              <h3 className="h4 mb-3 text-center" style={{ color: '#ffffff' }}>
                Exclusive Access to The Stirling Club
              </h3>
              <p style={{ color: '#e0e0e0', lineHeight: 1.7, marginBottom: 0 }}>
                The crown jewel of Turnberry Place is the recently renovated Stirling Club, an 80,000 square foot private club offering world-class amenities exclusively to residents. This premier facility features state-of-the-art fitness centers, resort-style pools, professional tennis courts, luxury spa services, fine dining venues, and business facilities. The Stirling Club represents the pinnacle of luxury living, providing residents with a resort-style experience right at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
