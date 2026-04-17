/**
 * JSON-LD Schema Markup Component
 * Provides LocalBusiness and RealEstateAgent schema for SEO
 * Dr. Jan Duffy - Turnberry Place Las Vegas
 */

import React from 'react'

interface JsonLdSchemaProps {
  type?: 'home' | 'agent' | 'property'
  propertyName?: string
  propertyAddress?: string
  propertyPrice?: string
  inventoryCount?: number
  inventoryLastUpdatedIso?: string
}

export function JsonLdSchema({
  type = 'home',
  propertyName = 'Turnberry Place Las Vegas',
  propertyAddress = '2827 Paradise Rd, Las Vegas, NV 89109',
  propertyPrice,
  inventoryCount,
  inventoryLastUpdatedIso,
}: JsonLdSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'

  // LocalBusiness + RealEstateAgent schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy, REALTOR',
    alternateName: 'The Turnberry Place Team',
    description:
      'Turnberry Place specialist and Las Vegas luxury high-rise condo REALTOR. Licensed REALTOR (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties.',
    url: baseUrl,
    telephone: ['+17025001971'],
    email: 'DrDuffy@TurnberryPlaceForSale.com',
    identifier: {
      '@type': 'PropertyValue',
      name: 'Nevada Real Estate License',
      value: 'S.0197614.LLC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2827 Paradise Rd',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89109',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.1447',
      longitude: '-115.1541',
    },
    areaServed: {
      '@type': 'City',
      name: 'Las Vegas',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
    },
    knowsAbout: [
      'Turnberry Place Las Vegas',
      'Luxury High-Rise Condos',
      'Las Vegas Strip Real Estate',
      'The Stirling Club',
    ],
    priceRange: '$800,000 - $10,000,000+',
    image: 'https://www.turnberryplaceforsale.com/images/turnberry/asset-1.jpg',
    logo: 'https://www.turnberryplaceforsale.com/images/turnberry/asset-19.jpg',
    sameAs: [
      'https://lasvegas55plushomes.com',
    ],
  }

  // Property schema for home page
  const propertySchema = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: propertyName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: propertyAddress,
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89109',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.1447',
      longitude: '-115.1541',
    },
    numberOfBedroomsTotal: '1-4',
    numberOfBathroomsTotal: '1-4',
    ...(inventoryCount && { numberOfAccommodationUnits: inventoryCount }),
    ...(inventoryLastUpdatedIso && { dateModified: inventoryLastUpdatedIso }),
    ...(propertyPrice && { price: propertyPrice }),
    description:
      'Luxury high-rise condominium community featuring 4 towers with 1-4 bedroom residences, Strip views, and exclusive access to The Stirling Club.',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Gated Community',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Swimming Pool',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Fitness Center',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Tennis Courts',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Spa',
      },
    ],
    image: [
      'https://www.turnberryplaceforsale.com/images/turnberry/Turnberry_Place_For_Sale.jpg',
      'https://www.turnberryplaceforsale.com/images/turnberry/turnberry-tower-nice-view.jpg',
    ],
  }

  const schemas = []

  // Always include LocalBusiness/RealEstateAgent schema
  schemas.push(localBusinessSchema)

  // Enhanced FAQ schema for home page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Turnberry Place Las Vegas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place is a luxury high-rise condominium community in Las Vegas featuring 4 towers with 1-4 bedroom residences, Strip views, and exclusive access to The Stirling Club private amenities. Located at 2827 Paradise Rd, just one block from the Las Vegas Strip.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the price range for condos at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place condos range from $800,000 to $10,000,000+ depending on tower, floor plan, floor level, and views. Tower 1 typically starts around $800K, while Tower 4 penthouses can exceed $10 million.',
        },
      },
      {
        '@type': 'Question',
        name: 'What amenities are available at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place residents enjoy exclusive access to The Stirling Club, an 80,000-square-foot private facility featuring pools, fitness center, tennis courts, spa, dining venues, and business facilities. The community is guard-gated with 24-hour security, valet parking, and concierge services.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many towers are at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place consists of 4 luxury towers: Tower 1 (38 stories, completed 2000), Tower 2 (45 stories, completed 2001), Tower 3 (45 stories, completed 2002), and Tower 4 (45 stories, completed 2005).',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I schedule a showing at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can schedule a private showing by calling the office at (702) 500-1971 or by requesting details through our online form. Dr. Jan Duffy specializes in Turnberry Place condos and offers personalized tours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Turnberry Place located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place is located at 2827 Paradise Rd, Las Vegas, NV 89109, just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts. The property offers immediate proximity to world-class dining, entertainment, and attractions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is The Stirling Club at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Stirling Club is an 80,000-square-foot private membership facility exclusively for Turnberry Place residents. It features state-of-the-art fitness center, resort-style pools, tennis courts, spa services, multiple dining venues, business center, and social lounges.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of views are available at Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Turnberry Place offers spectacular views including Las Vegas Strip skyline, Red Rock Canyon, Spring Mountain Range, and panoramic city views. Views vary by tower, floor level, and unit orientation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Turnberry Place a secure community?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Turnberry Place features guard-gated entrance, 24-hour security personnel, video surveillance, keycard access, and many units have private elevator access. The community prioritizes security and privacy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the real estate agent for Turnberry Place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Jan Duffy, REALTOR, specializes in Turnberry Place and Las Vegas luxury high-rise condos. Licensed as S.0197614.LLC with Berkshire Hathaway HomeServices Nevada Properties. Contact: (702) 500-1971.',
        },
      },
    ],
  }

  // BreadcrumbList schema for home page
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ],
  }

  // Organization schema for Berkshire Hathaway
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Berkshire Hathaway HomeServices Nevada Properties',
    url: 'https://www.berkshirehathawayhs.com',
    logo: 'https://www.turnberryplaceforsale.com/images/turnberry/asset-19.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+17025001971',
      contactType: 'Real Estate Sales',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  }

  // Add property schema for home page
  if (type === 'home') {
    schemas.push(propertySchema)
    schemas.push(faqSchema)
    schemas.push(breadcrumbSchema)
    schemas.push(organizationSchema)
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  )
}
