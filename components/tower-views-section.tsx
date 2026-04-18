'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sunrise, Sunset, Sun, Moon } from 'lucide-react'

interface ViewCard {
  id: string
  name: string
  direction: string
  image: string
  imageAlt: string
  towers: number[]
  timeIcon: 'sunrise' | 'sunset' | 'day' | 'night'
  timeLabel: string
}

interface TowerViewsSectionProps {
  views?: ViewCard[]
}

const defaultViews: ViewCard[] = [
  {
    id: 'strip',
    name: 'Strip Views',
    direction: 'South-facing',
    image: '/images/turnberry/turnberry-tower-nice-view.jpg',
    imageAlt: 'Las Vegas Strip skyline view from Turnberry Place',
    towers: [1, 2, 3, 4],
    timeIcon: 'night',
    timeLabel: 'Evening/Night',
  },
  {
    id: 'sunrise',
    name: 'Sunrise Views',
    direction: 'East-facing',
    image: '/images/turnberry/Turnberry_Place_For_Sale.jpg',
    imageAlt: 'Desert sunrise view from Turnberry Place',
    towers: [1, 2, 3, 4],
    timeIcon: 'sunrise',
    timeLabel: 'Morning',
  },
  {
    id: 'sunset',
    name: 'Sunset Views',
    direction: 'West-facing',
    image: '/images/turnberry/turnberry-tower-south-view.jpeg',
    imageAlt: 'Red Rock Canyon sunset view from Turnberry Place',
    towers: [2, 3, 4],
    timeIcon: 'sunset',
    timeLabel: 'Evening',
  },
  {
    id: 'valley',
    name: 'Valley Views',
    direction: 'North-facing',
    image: '/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg',
    imageAlt: 'Las Vegas Valley view from Turnberry Place',
    towers: [2, 3, 4],
    timeIcon: 'day',
    timeLabel: 'Daytime',
  },
]

const timeIcons = {
  sunrise: Sunrise,
  sunset: Sunset,
  day: Sun,
  night: Moon,
}

export function TowerViewsSection({ views = defaultViews }: TowerViewsSectionProps) {
  return (
    <section className="card-content py-5" aria-label="Views from Turnberry Place">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5">
          <h2 className="h3 mb-2">Views From Every Angle</h2>
          <p className="text-muted">
            Experience stunning vistas from each of Turnberry Place's four towers
          </p>
        </div>

        {/* 2x2 Grid of View Cards */}
        <div className="row g-4 mb-5">
          {views.map((view) => {
            const TimeIcon = timeIcons[view.timeIcon]
            return (
              <div key={view.id} className="col-12 col-md-6">
                <div
                  className="position-relative overflow-hidden"
                  style={{
                    height: '400px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Background Image */}
                  <Image
                    src={view.image}
                    alt={view.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    quality={85}
                  />

                  {/* Dark Overlay */}
                  <div
                    className="position-absolute"
                    style={{
                      inset: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
                      zIndex: 1,
                    }}
                  />

                  {/* Content Overlay */}
                  <div
                    className="position-absolute d-flex flex-column justify-content-end"
                    style={{
                      inset: 0,
                      padding: '2rem',
                      zIndex: 2,
                      color: '#ffffff',
                    }}
                  >
                    {/* Time Icon */}
                    <div className="mb-3 d-flex align-items-center" style={{ gap: '0.5rem' }}>
                      <TimeIcon
                        size={24}
                        style={{
                          color: '#D4AF37',
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="small font-weight-medium"
                        style={{
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {view.timeLabel}
                      </span>
                    </div>

                    {/* View Name */}
                    <h3
                      className="h4 mb-2"
                      style={{
                        fontWeight: 600,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                        color: '#ffffff',
                      }}
                    >
                      {view.name}
                    </h3>

                    {/* Direction */}
                    <p
                      className="small mb-3"
                      style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {view.direction}
                    </p>

                    {/* Which Towers Offer This View */}
                    <div className="d-flex align-items-center flex-wrap" style={{ gap: '0.5rem' }}>
                      <span
                        className="small"
                        style={{
                          color: 'rgba(255, 255, 255, 0.85)',
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        Available in:
                      </span>
                      {view.towers.map((towerNum, idx) => (
                        <React.Fragment key={towerNum}>
                          <span
                            className="font-weight-bold"
                            style={{
                              color: '#D4AF37',
                              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                              fontSize: '1rem',
                            }}
                          >
                            Tower {towerNum}
                          </span>
                          {idx < view.towers.length - 1 && (
                            <span
                              style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                              }}
                            >
                              •
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-3" style={{ fontSize: '1.1rem' }}>
            Schedule a tour to see these views in person
          </p>
          <Link
            href="/available-condos"
            className="btn font-weight-medium"
            style={{
              backgroundColor: '#D4AF37',
              color: '#000000',
              padding: '0.75rem 2rem',
              borderRadius: '6px',
              border: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B8941F'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#D4AF37'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Schedule a Tour
          </Link>
        </div>
      </div>
    </section>
  )
}
