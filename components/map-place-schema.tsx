import React from 'react'
import { JsonLd } from './json-ld'

export function MapPlaceSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Turnberry Place Las Vegas",
    "description": "Luxury high-rise condominium community located one block from the Las Vegas Strip",
    "url": `${baseUrl}/map`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2827 Paradise Rd",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89109",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.1408,
      "longitude": -115.1564
    },
    "image": `${baseUrl}/images/turnberry/Turnberry_Place_For_Sale.jpg`,
    "telephone": "+17025001971"
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Turnberry Place Las Vegas",
    "description": "Luxury high-rise condominium community one block from the Las Vegas Strip",
    "url": `${baseUrl}/map`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2827 Paradise Rd",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89109",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.1408,
      "longitude": -115.1564
    },
    "telephone": "+17025001971",
    "priceRange": "$800,000 - $10,000,000+",
    "image": `${baseUrl}/images/turnberry/Turnberry_Place_For_Sale.jpg`
  }

  return (
    <>
      <JsonLd schema={placeSchema} />
      <JsonLd schema={localBusinessSchema} />
    </>
  )
}
