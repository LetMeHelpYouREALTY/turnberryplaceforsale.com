import React from 'react'
import { JsonLd } from './json-ld'
import { GBP_PHONE_TEL } from 'lib/google-business-profile'
import { TURNBERRY_GEO } from 'lib/schema/geo'

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
      "latitude": Number(TURNBERRY_GEO.latitude),
      "longitude": Number(TURNBERRY_GEO.longitude),
    },
    "image": `${baseUrl}/images/turnberry/Turnberry_Place_For_Sale.jpg`,
    "telephone": GBP_PHONE_TEL
  }

  return (
    <>
      <JsonLd schema={placeSchema} />
    </>
  )
}
