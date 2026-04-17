'use client'

import React from 'react'
import { ShoppingBag, UtensilsCrossed, Plane, MapPin } from 'lucide-react'

interface NearbyHighlight {
  icon: React.ElementType
  title: string
  description: string
}

interface NeighborhoodSectionProps {
  description?: string
  mapPlaceholder?: boolean
  showNearbyHighlights?: boolean
}

export function NeighborhoodSection({
  description = "Turnberry Place stands as a pinnacle of luxury living in Las Vegas, offering an unparalleled blend of privacy, convenience, and access to world-class amenities. Situated just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts, this guard-gated, four-tower condominium complex redefines upscale urban living with its strategic location and meticulously curated environment.",
  mapPlaceholder = true,
  showNearbyHighlights = true,
}: NeighborhoodSectionProps) {
  const nearbyHighlights: NearbyHighlight[] = [
    {
      icon: ShoppingBag,
      title: 'Premium Shopping',
      description: 'Fashion Show Mall, Crystals at CityCenter, and luxury boutiques within 5 minutes',
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining',
      description: '20+ Zagat-rated restaurants including Joël Robuchon, é by José Andrés, and Twist by Pierre Gagnaire',
    },
    {
      icon: Plane,
      title: 'McCarran International Airport',
      description: 'Just 10 minutes from the airport, making travel convenient for residents',
    },
  ]

  return (
    <section className="neighborhood-section py-5" aria-label="Neighborhood Information">
      <div className="container">
        <div className="row">
          {/* Left Column: Text Description */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <h2 className="mb-4">Prime Location & Neighborhood</h2>
            <div className="neighborhood-description">
              <p className="lead mb-4">{description}</p>
              
              <h3 className="h5 mb-3">Strategic Location Advantages</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>One block from Las Vegas Strip</strong> - Immediate access to world-class entertainment
                </li>
                <li className="mb-2">
                  <strong>Between Wynn Encore and Sahara resorts</strong> - Prime corridor location
                </li>
                <li className="mb-2">
                  <strong>Guard-gated community</strong> - Privacy and security in the heart of Las Vegas
                </li>
                <li className="mb-2">
                  <strong>20+ Zagat-rated restaurants</strong> - Fine dining within walking distance
                </li>
                <li className="mb-2">
                  <strong>T-Mobile Arena & Allegiant Stadium</strong> - Minutes from major venues
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Google Maps Integration */}
          <div className="col-12 col-lg-6">
            <div className="map-container" style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1a1a1a',
              border: '2px solid var(--luxury-gold, #d4af37)',
            }}>
              {mapPlaceholder ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#e0e0e0',
                  textAlign: 'center',
                  padding: '2rem',
                }}>
                  <MapPin size={48} style={{ marginBottom: '1rem', color: 'var(--luxury-gold, #d4af37)' }} aria-hidden="true" />
                  <h4 className="h5 mb-2">Interactive Map</h4>
                  <p className="mb-3" style={{ fontSize: '0.9rem' }}>
                    Google Maps integration placeholder
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#999' }}>
                    Address: 2827 Paradise Rd, Las Vegas, NV 89109
                  </p>
                  {/* Google Maps Embed - Replace with your API key */}
                  <iframe
                    src="https://www.google.com/maps?q=2827+Paradise+Rd,+Las+Vegas,+NV+89109&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Turnberry Place Location Map"
                  />
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#e0e0e0',
                }}>
                  <p>Map will be loaded here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nearby Highlights Section */}
        {showNearbyHighlights && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="text-center mb-4">Nearby Highlights</h3>
              <div className="row">
                {nearbyHighlights.map((highlight, index) => (
                  <div key={index} className="col-12 col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm" style={{
                      backgroundColor: '#1a1a1a',
                      borderTop: `3px solid var(--luxury-gold, #d4af37)`,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                          }}>
                            <highlight.icon size={24} style={{ color: 'var(--luxury-gold, #d4af37)' }} aria-hidden="true" />
                          </div>
                          <h4 className="h5 mb-0">{highlight.title}</h4>
                        </div>
                        <p className="mb-0" style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
