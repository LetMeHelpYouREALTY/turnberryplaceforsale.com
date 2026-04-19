'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { tourUrl } from 'lib/calendly'

export function TowersCTASection() {
  const calendlyUrl =
    tourUrl({ utmMedium: 'cta', utmCampaign: 'towers-cta' })

  return (
    <section
      className="card-content py-5"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
      }}
      aria-label="Contact Dr. Jan Duffy"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            {/* Badge */}
            <div className="mb-3">
              <span
                className="small font-weight-semibold"
                style={{
                  display: 'inline-block',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                Your Turnberry Place Neighbor
              </span>
            </div>

            {/* Headline */}
            <h2
              className="h3 mb-3"
              style={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '2rem',
              }}
            >
              Ready to Find Your Tower?
            </h2>

            {/* Subtext */}
            <p
              className="mb-5"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.125rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
              }}
            >
              I live here at Turnberry Place and know every floor of every tower. Let me help you
              find your perfect residence.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
              {/* Primary: View Available Condos */}
              <Link
                href="/available-condos"
                className="btn font-weight-medium px-5 py-3"
                style={{
                  backgroundColor: '#D4AF37',
                  color: '#000000',
                  borderRadius: '6px',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  minWidth: '200px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B8941F'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4AF37'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                View Available Condos
              </Link>

              {/* Secondary: Schedule a Tour */}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn font-weight-medium px-5 py-3"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  borderRadius: '6px',
                  border: '2px solid #ffffff',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  minWidth: '200px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.color = '#1a1a1a'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Schedule a Tour
              </a>
            </div>

            {/* Call Now Text Link */}
            <div className="mb-5">
              <p className="mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                Or call now:
              </p>
              <a
                href="tel:+17025001971"
                className="font-weight-semibold"
                style={{
                  color: '#D4AF37',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#D4AF37'
                  e.currentTarget.style.color = '#B8941F'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent'
                  e.currentTarget.style.color = '#D4AF37'
                }}
              >
                (702) 500-1971
              </a>
            </div>

            {/* Trust Elements */}
            <div className="mt-5 pt-4 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              {/* Berkshire Hathaway Logo */}
              <div className="mb-3">
                <div className="d-inline-block" style={{ maxWidth: '250px', width: '100%' }}>
                  <Image
                    src="/images/turnberry/asset-19.jpg"
                    alt="Berkshire Hathaway HomeServices Nevada Properties logo"
                    width={250}
                    height={104}
                    style={{
                      filter: 'brightness(1.1)',
                      opacity: 0.95,
                    }}
                  />
                </div>
              </div>

              {/* License Number */}
              <p className="small mb-0" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <strong>License: S.0197614.LLC</strong>
              </p>
              <p className="small mb-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
