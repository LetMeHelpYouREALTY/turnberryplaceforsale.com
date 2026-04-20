import Image from 'next/image'
import Link from 'next/link'
import { GBP_PHONE_TEL } from 'lib/google-business-profile'
import { listingCardImageAlt } from 'lib/image-alt'

interface FeaturedListingCardProps {
  image: string
  title: string
  price: string
  beds: number
  baths: number
  sqft: number
  views: string
  tower?: string
  unit?: string
  href?: string
  featured?: boolean
  priority?: boolean
}

export function FeaturedListingCard({
  image,
  title,
  price,
  beds,
  baths,
  sqft,
  views,
  tower,
  unit,
  href = '/available-condos',
  featured = false,
  priority = false
}: FeaturedListingCardProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'listing_card_click', {
        event_category: 'engagement',
        event_label: title
      })
    }
  }

  return (
    <div 
      className="featured-listing-card card h-100 shadow-sm border-0 position-relative overflow-hidden"
      style={{ 
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {featured && (
        <div className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 small font-weight-bold" style={{ 
          zIndex: 10,
          borderRadius: '0 12px 0 8px',
          fontSize: '0.85rem'
        }}>
          Featured
        </div>
      )}
      <div className="card-img-wrapper position-relative" style={{ height: '250px', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={image}
            alt={listingCardImageAlt(title, tower, unit)}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-2" style={{ zIndex: 5 }}>
          <div className="h4 mb-0 font-weight-bold">{price}</div>
        </div>
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title mb-2" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#333' }}>
          {title}
        </h5>
        {tower && unit && (
          <p className="text-muted small mb-2">
            {tower} • {unit}
          </p>
        )}
        <div className="listing-details mb-3">
          <div className="d-flex flex-wrap gap-3 mb-2">
            <span className="d-flex align-items-center">
              <svg width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.63A7 7 0 0 0 8 3z"/>
              </svg>
              <strong>{beds}</strong> Bed{beds !== 1 ? 's' : ''}
            </span>
            <span className="d-flex align-items-center">
              <svg width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-3zM2.5 5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3zM2.5 9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3z"/>
              </svg>
              <strong>{baths}</strong> Bath{baths !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <svg width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
              <path d="M8.5 1.5A1.5 1.5 0 0 0 7 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L8.5 1.5z"/>
            </svg>
            <span className="text-muted">{sqft.toLocaleString()} sqft</span>
          </div>
          <div className="d-flex align-items-center">
            <svg width="16" height="16" fill="currentColor" className="mr-1 text-primary" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span className="text-muted small">{views}</span>
          </div>
        </div>
        <div className="mt-auto pt-3">
          <div className="d-flex gap-2">
            <Link
              href={href}
              className="btn btn-primary btn-sm flex-grow-1"
              onClick={handleClick}
            >
              View Details
            </Link>
            <a
              href={`tel:${GBP_PHONE_TEL}`}
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'listing_phone_click', {
                    event_category: 'engagement',
                    event_label: title
                  })
                }
              }}
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
