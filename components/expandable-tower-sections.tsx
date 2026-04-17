'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface TowerDetail {
  number: number
  name: string
  tagline: string
  heroImage: string
  stats: Array<{ label: string; value: string }>
  description: string
  special: string[]
  bestFor: string
}

interface ExpandableTowerSectionsProps {
  towers: TowerDetail[]
}

export function ExpandableTowerSections({ towers }: ExpandableTowerSectionsProps) {
  const [openTower, setOpenTower] = useState<number | null>(null)

  const toggleTower = (towerNumber: number) => {
    setOpenTower(openTower === towerNumber ? null : towerNumber)
  }

  return (
    <section className="card-content py-5" aria-label="Detailed Tower Information">
      <div className="container">
        {towers.map((tower, index) => {
          const isOpen = openTower === tower.number
          const isEven = index % 2 === 0

          return (
            <div
              key={tower.number}
              className="tower-expandable-section mb-4"
              style={{
                backgroundColor: isEven ? '#ffffff' : '#f8f9fa',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #dee2e6',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Header - Always Visible */}
              <button
                type="button"
                onClick={() => toggleTower(tower.number)}
                className="w-100 text-left border-0 p-0"
                style={{
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
                aria-expanded={isOpen}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <span
                      className="font-weight-bold font-serif"
                      style={{
                        fontSize: '3rem',
                        color: '#D4AF37',
                        lineHeight: 1,
                      }}
                    >
                      {tower.number}
                    </span>
                    <div>
                      <h3 className="h4 mb-1" style={{ fontWeight: 600 }}>
                        Tower {tower.number} - {tower.name}
                      </h3>
                      <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                        {tower.tagline}
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={isOpen ? 'open' : ''}
                  style={{
                    width: '24px',
                    height: '24px',
                    color: '#6c757d',
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                  aria-hidden="true"
                />
              </button>

              {/* Expandable Content */}
              {isOpen && (
                <div
                  className="tower-expandable-content"
                  style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  {/* Hero Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '300px',
                      marginBottom: '1.5rem',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={tower.heroImage}
                      alt={`${tower.name} - Turnberry Place Tower ${tower.number}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      quality={85}
                    />
                  </div>

                  {/* Key Stats Grid */}
                  <div className="row g-3 mb-3" style={{ marginLeft: 0, marginRight: 0 }}>
                    {tower.stats.map((stat, idx) => (
                      <div key={idx} className="col-6 col-md-3">
                        <div
                          style={{
                            padding: '0.75rem',
                            backgroundColor: '#ffffff',
                            borderRadius: '6px',
                            border: '1px solid #e9ecef',
                          }}
                        >
                          <div className="small text-muted mb-1">{stat.label}</div>
                          <div className="font-weight-semibold" style={{ fontSize: '1.1rem' }}>
                            {stat.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description (2-3 sentences, NOT paragraphs) */}
                  <p
                    className="mb-3"
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#495057',
                    }}
                  >
                    {tower.description}
                  </p>

                  {/* What Makes It Special - Bullet Points */}
                  <div className="mb-3">
                    <h4 className="h6 mb-2" style={{ fontWeight: 600 }}>
                      What makes it special:
                    </h4>
                    <ul className="mb-0" style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
                      {tower.special.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            marginBottom: '0.5rem',
                            color: '#495057',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For Badge */}
                  <div className="mb-3">
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        backgroundColor: '#D4AF37',
                        color: '#000000',
                      }}
                    >
                      Best for: {tower.bestFor}
                    </span>
                  </div>

                  {/* View Available Units CTA */}
                  <Link
                    href={`/available-condos?tower=${tower.number}`}
                    className="btn font-weight-medium"
                    style={{
                      backgroundColor: '#374151',
                      color: '#ffffff',
                      padding: '0.75rem 2rem',
                      borderRadius: '6px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D4AF37'
                      e.currentTarget.style.color = '#000000'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#374151'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                  >
                    View Available Units
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
