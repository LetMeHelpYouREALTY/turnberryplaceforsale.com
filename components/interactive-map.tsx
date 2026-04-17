'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Navigation, Maximize2, Map as MapIcon } from 'lucide-react'

interface Place {
  name: string
  category: string
  distance: string
  walkTime?: string
  image?: string
  rating?: number
  priceLevel?: string
  address: string
  description?: string
  mapQuery?: string
  lat?: number
  lng?: number
}

interface InteractiveMapProps {
  mapKey: string
  center?: { lat: number; lng: number }
  zoom?: number
  activeCategory: string
  places: Place[]
  onPlaceClick?: (place: Place) => void
  selectedPlace?: Place | null
}

const TURNBERRY_LOCATION = {
  lat: 36.1408,
  lng: -115.1564,
}

const categoryColors: Record<string, string> = {
  dining: '#ef4444', // red
  entertainment: '#a855f7', // purple
  shopping: '#3b82f6', // blue
  coffee: '#f59e0b', // amber
  fitness: '#10b981', // green
  schools: '#6366f1', // indigo
  parks: '#059669', // emerald
}

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#0f172a' }],
  },
]

// Create custom marker icon using Google Maps Symbol API
// This function is only called after the map is loaded, so google.maps is available
const createMarkerIcon = (
  category: string,
  isActive = false,
  isTurnberry = false,
  googleMaps?: typeof google.maps
) => {
  if (!googleMaps) {
    // Fallback if google.maps is not available
    return undefined
  }

  if (isTurnberry) {
    return {
      path: googleMaps.SymbolPath.CIRCLE,
      fillColor: '#D4AF37',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: 12,
      anchor: new googleMaps.Point(0, 0),
    }
  }

  const color = categoryColors[category] || '#6b7280'
  const scale = isActive ? 10 : 8

  return {
    path: googleMaps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: isActive ? 1 : 0.8,
    strokeColor: '#ffffff',
    strokeWeight: isActive ? 3 : 2,
    scale,
    anchor: new googleMaps.Point(0, 0),
  }
}

export function InteractiveMap({
  mapKey,
  center = TURNBERRY_LOCATION,
  zoom = 15,
  activeCategory,
  places = [],
  onPlaceClick,
  selectedPlace,
}: InteractiveMapProps) {
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null)
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey,
    libraries: ['places'],
  })

  // Get place coordinates (use provided lat/lng or calculate)
  const getPlaceCoordinates = useCallback(
    (place: Place): { lat: number; lng: number } => {
      if (place.lat && place.lng) {
        return { lat: place.lat, lng: place.lng }
      }
      // Fallback: approximate based on distance
      const baseOffset = 0.001
      const distance = parseFloat(place.distance.replace(/[^0-9.]/g, '')) || 0.5
      const offset = (distance * baseOffset) / 0.1

      return {
        lat: center.lat + (Math.random() - 0.5) * offset * 2,
        lng: center.lng + (Math.random() - 0.5) * offset * 2,
      }
    },
    [center]
  )

  // Filter places by active category
  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') {
      return places
    }
    return places.filter((place) => place.category === activeCategory)
  }, [activeCategory, places])

  // Center on selected place
  const mapCenter = useMemo(() => {
    if (selectedPlace) {
      return getPlaceCoordinates(selectedPlace)
    }
    return center
  }, [selectedPlace, center, getPlaceCoordinates])

  const handleMarkerClick = useCallback(
    (place: Place) => {
      setInfoWindowOpen(place.name)
      if (onPlaceClick) {
        onPlaceClick(place)
      }
    },
    [onPlaceClick]
  )

  const handleInfoWindowClose = useCallback(() => {
    setInfoWindowOpen(null)
  }, [])

  const toggleMapType = useCallback(() => {
    setMapType((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))
  }, [])

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // This would need a ref to the map instance to update center
        // For now, just show alert
        alert(`Your location: ${position.coords.latitude}, ${position.coords.longitude}`)
      },
      () => {
        alert('Error: Unable to retrieve your location.')
      }
    )
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  if (loadError) {
    return (
      <div className="w-full h-[600px] md:h-[700px] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading map</p>
          <p className="text-gray-600 text-sm">Please check your Google Maps API key</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] md:h-[700px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gray-200 rounded-lg overflow-hidden">
      {/* Google Map */}
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-lg"
        center={mapCenter}
        zoom={selectedPlace ? 16 : zoom}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeId: mapType,
        }}
      >
        {/* Turnberry Place Marker (Gold Star) */}
        <Marker
          position={TURNBERRY_LOCATION}
          icon={createMarkerIcon('', false, true, google?.maps)}
          title="Turnberry Place"
          onClick={() => setInfoWindowOpen('turnberry')}
          zIndex={1000}
        />

        {/* Turnberry Info Window */}
        {infoWindowOpen === 'turnberry' && (
          <InfoWindow
            position={TURNBERRY_LOCATION}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Turnberry Place</h3>
              <p className="text-sm text-gray-600 mb-2">2827 Paradise Rd, Las Vegas, NV 89109</p>
              <p className="text-xs text-gray-500">Luxury High-Rise Condominiums</p>
            </div>
          </InfoWindow>
        )}

        {/* Nearby Places Markers */}
        {filteredPlaces.map((place) => {
          const coords = getPlaceCoordinates(place)
          const isSelected = selectedPlace?.name === place.name
          const isOpen = infoWindowOpen === place.name

          return (
            <React.Fragment key={place.name}>
              <Marker
                position={coords}
                icon={createMarkerIcon(place.category, isSelected, false, google?.maps)}
                title={place.name}
                onClick={() => handleMarkerClick(place)}
                animation={isSelected && google?.maps ? google.maps.Animation.BOUNCE : undefined}
              />

              {/* Info Window */}
              {isOpen && (
                <InfoWindow
                  position={coords}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div className="p-3 min-w-[200px] max-w-[300px]">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{place.name}</h3>
                    {place.description && (
                      <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                    )}
                    <div className="text-xs text-gray-600 mb-2">
                      <strong>Distance:</strong> {place.distance}
                      {place.walkTime && ` • ${place.walkTime} walk`}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <strong>Address:</strong> {place.address}
                    </div>
                    {place.rating && (
                      <div className="text-sm text-[#D4AF37] mb-2">
                        {'★'.repeat(Math.floor(place.rating))}
                        {'☆'.repeat(5 - Math.floor(place.rating))} {place.rating}
                      </div>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        place.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1.5 bg-[#D4AF37] text-gray-900 text-xs font-semibold rounded hover:bg-[#B8941F] transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          )
        })}
      </GoogleMap>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {/* Map/Satellite Toggle */}
        <button
          onClick={toggleMapType}
          className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50 transition-colors"
          aria-label={mapType === 'roadmap' ? 'Switch to satellite view' : 'Switch to map view'}
        >
          <MapIcon size={20} className="text-gray-700" />
        </button>

        {/* Current Location */}
        <button
          onClick={getCurrentLocation}
          className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50 transition-colors"
          aria-label="Center on current location"
        >
          <Navigation size={20} className="text-gray-700" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          <Maximize2 size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Turnberry Place Label */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#D4AF37' }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-gray-900">Turnberry Place</span>
        </div>
      </div>
    </div>
  )
}
