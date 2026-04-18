import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Layers } from 'lucide-react'

export interface PropertyCard {
  id: string
  title: string
  image: string
  yearCompleted: number
  storyCount: number
  description?: string
  href: string
  alt?: string
}

interface PropertyGridProps {
  properties: PropertyCard[]
  title?: string
  subtitle?: string
}

export function PropertyGrid({ properties, title, subtitle }: PropertyGridProps) {
  return (
    <div className="py-8" aria-label="Property listings">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h2 className="mb-3">{title}</h2>
            )}
            {subtitle && (
              <p className="lead">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="row">
          {properties.map((property) => (
            <div key={property.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property }: { property: PropertyCard }) {
  // Note: we intentionally do NOT set aria-label on the Link.
  // The whole card is a link with rich visible content (title, stories,
  // year, description, and a "View Listings" CTA). axe's
  // `label-content-name-mismatch` rule requires the accessible name to
  // include the visible text, so we let the concatenated visible text
  // serve as the accessible name (WAI "Card" pattern).
  return (
    <Link
      href={property.href}
      className="text-decoration-none"
    >
      <div
        className="card border-0 shadow-sm h-100 property-card-hover" 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
      >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <Image
          src={property.image}
          alt={property.alt || property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
          loading="lazy"
          quality={85}
          className="property-card-image"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <h3 className="h5 mb-2" style={{ fontWeight: 600 }}>
          {property.title}
        </h3>

        {/* Meta Info */}
        <div className="mb-2">
          <p className="small text-muted mb-1 d-flex align-items-center">
            <Layers className="w-3 h-3 mr-1" style={{ flexShrink: 0 }} aria-hidden="true" />
            <span>{property.storyCount} Stories</span>
          </p>
          <p className="small text-muted mb-2 d-flex align-items-center">
            <Calendar className="w-3 h-3 mr-1" style={{ flexShrink: 0 }} aria-hidden="true" />
            <span>Completed {property.yearCompleted}</span>
          </p>
        </div>
        
        {property.description && (
          <p style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            {property.description}
          </p>
        )}

        {/* CTA Button */}
        <div className="btn btn-outline-primary btn-sm btn-block text-center">
          View Listings
        </div>
      </div>
    </div>
    </Link>
  )
}
