'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Navigation, Maximize2, Map as MapIcon } from 'lucide-react'
import type { CuratedNearbyPlace } from 'lib/nearby-amenities/curated-places'
import { GBP_ADDRESS_LINE } from 'lib/google-business-profile'
import { NEARBY_AMENITIES_COMMUNITY } from 'lib/nearby-amenities/config'
import {
  getCategoryById,
  type NearbyAmenityCategoryId,
} from 'lib/nearby-amenities/config'
import { NearbyAmenityMapFallback } from 'components/nearby-amenity-map-fallback'
import { NearbyAmenityCategoryChips } from 'components/nearby-amenity-category-chips'
import { filterCuratedPlacesByCategory } from 'lib/nearby-amenities/curated-places'
import { categoryIdToDataCategory } from 'lib/nearby-amenities/config'
import { loadGoogleMaps, mapsAuthFailed } from 'lib/google-maps-loader'
import {
  placeLocationToLiteral,
  searchNearbyCategory,
} from 'lib/nearby-amenities/search-nearby'

const mapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
]

const categoryColors: Record<string, string> = {
  dining: '#ef4444',
  entertainment: '#a855f7',
  shopping: '#3b82f6',
  coffee: '#f59e0b',
  fitness: '#10b981',
  schools: '#6366f1',
  parks: '#059669',
  grocery: '#0ea5e9',
  healthcare: '#dc2626',
  pharmacy: '#ec4899',
  golf: '#16a34a',
  parking: '#64748b',
}

type ApiPlace = {
  name: string
  category: string
  address: string
  lat: number
  lng: number
  source: 'places-api'
}

function createMarkerIcon(
  category: string,
  isTurnberry: boolean,
  googleMaps: typeof google.maps,
  isActive = false,
) {
  if (isTurnberry) {
    return {
      path: googleMaps.SymbolPath.CIRCLE,
      fillColor: '#D4AF37',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: 12,
    }
  }
  const color = categoryColors[category] ?? '#6b7280'
  return {
    path: googleMaps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: isActive ? 1 : 0.85,
    strokeColor: '#ffffff',
    strokeWeight: isActive ? 3 : 2,
    scale: isActive ? 10 : 8,
  }
}

function buildInfoWindowContent(place: {
  name: string
  description?: string
  address: string
  distance?: string
}): HTMLElement {
  const root = document.createElement('div')
  root.className = 'nearby-amenity-map__infowindow'

  const title = document.createElement('h3')
  title.textContent = place.name
  root.appendChild(title)

  if (place.description) {
    const desc = document.createElement('p')
    desc.textContent = place.description
    root.appendChild(desc)
  }

  const addr = document.createElement('p')
  const addrLabel = document.createElement('strong')
  addrLabel.textContent = 'Address: '
  addr.appendChild(addrLabel)
  addr.appendChild(document.createTextNode(place.address))
  root.appendChild(addr)

  if (place.distance) {
    const dist = document.createElement('p')
    const distLabel = document.createElement('strong')
    distLabel.textContent = 'Distance: '
    dist.appendChild(distLabel)
    dist.appendChild(document.createTextNode(place.distance))
    root.appendChild(dist)
  }

  const link = document.createElement('a')
  link.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.className = 'nearby-amenity-map__directions-btn'
  link.textContent = 'Directions'
  root.appendChild(link)

  return root
}

type NearbyAmenityMapClientProps = {
  mapKey: string
  mapId?: string
  initialCategory?: NearbyAmenityCategoryId
  showCategoryChips?: boolean
}

function NearbyAmenityInteractiveMap({
  mapId,
  curatedPlaces,
  apiPlaces,
  activeCategory,
}: {
  mapId?: string
  curatedPlaces: CuratedNearbyPlace[]
  apiPlaces: ApiPlace[]
  activeCategory: NearbyAmenityCategoryId
}) {
  const center = NEARBY_AMENITIES_COMMUNITY.center
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap')

  const mergedPlaces = useMemo(() => {
    const byName = new Map<string, CuratedNearbyPlace | ApiPlace>()
    for (const p of curatedPlaces) {
      byName.set(p.name, p)
    }
    for (const p of apiPlaces) {
      if (!byName.has(p.name)) {
        byName.set(p.name, p)
      }
    }
    return Array.from(byName.values())
  }, [curatedPlaces, apiPlaces])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }
    const options: google.maps.MapOptions = {
      center,
      zoom: 14,
      styles: mapStyles,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: mapType,
      ...(mapId ? { mapId } : {}),
    }
    mapRef.current = new google.maps.Map(containerRef.current, options)
    infoWindowRef.current = new google.maps.InfoWindow()

    return () => {
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []
      mapRef.current = null
      infoWindowRef.current = null
    }
  }, [mapId, center, mapType])

  useEffect(() => {
    const map = mapRef.current
    const infoWindow = infoWindowRef.current
    if (!map || !infoWindow) {
      return
    }

    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    const communityMarker = new google.maps.Marker({
      map,
      position: center,
      icon: createMarkerIcon('', true, google.maps),
      title: NEARBY_AMENITIES_COMMUNITY.name,
      zIndex: 1000,
    })
    communityMarker.addListener('click', () => {
      const content = buildInfoWindowContent({
        name: NEARBY_AMENITIES_COMMUNITY.name,
        description: 'Luxury high-rise condominiums',
        address: GBP_ADDRESS_LINE,
      })
      infoWindow.setContent(content)
      infoWindow.setPosition(center)
      infoWindow.open({ map })
    })
    markersRef.current.push(communityMarker)

    for (const place of mergedPlaces) {
      const lat = place.lat
      const lng = place.lng
      if (lat == null || lng == null) {
        continue
      }
      const category = place.category
      const marker = new google.maps.Marker({
        map,
        position: { lat, lng },
        icon: createMarkerIcon(category, false, google.maps),
        title: place.name,
      })
      marker.addListener('click', () => {
        const content = buildInfoWindowContent({
          name: place.name,
          description: 'description' in place ? place.description : undefined,
          address: place.address,
          distance: 'distance' in place ? place.distance : undefined,
        })
        infoWindow.setContent(content)
        infoWindow.setPosition({ lat, lng })
        infoWindow.open({ map })
      })
      markersRef.current.push(marker)
    }
  }, [mergedPlaces, center, activeCategory])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setMapTypeId(mapType)
    }
  }, [mapType])

  return (
    <div className="nearby-amenity-map__canvas-wrap">
      <div ref={containerRef} className="nearby-amenity-map__canvas" />
      <div className="nearby-amenity-map__controls">
        <button
          type="button"
          onClick={() => setMapType((t) => (t === 'roadmap' ? 'satellite' : 'roadmap'))}
          className="nearby-amenity-map__control-btn"
          aria-label={mapType === 'roadmap' ? 'Switch to satellite view' : 'Switch to map view'}
        >
          <MapIcon size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              containerRef.current?.requestFullscreen()
            }
          }}
          className="nearby-amenity-map__control-btn"
          aria-label="Toggle fullscreen map"
        >
          <Maximize2 size={20} aria-hidden="true" />
        </button>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(NEARBY_AMENITIES_COMMUNITY.fullAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nearby-amenity-map__control-btn"
          aria-label="Open directions to Turnberry Place in Google Maps"
        >
          <Navigation size={20} aria-hidden="true" />
        </a>
      </div>
      <div className="nearby-amenity-map__legend">
        <span className="nearby-amenity-map__legend-dot" aria-hidden="true" />
        {NEARBY_AMENITIES_COMMUNITY.name}
      </div>
    </div>
  )
}

export function NearbyAmenityMapClient({
  mapKey,
  mapId,
  initialCategory = 'all',
  showCategoryChips = true,
}: NearbyAmenityMapClientProps) {
  const [activeCategory, setActiveCategory] =
    useState<NearbyAmenityCategoryId>(initialCategory)
  const [useFallback, setUseFallback] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [apiPlaces, setApiPlaces] = useState<ApiPlace[]>([])
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false)

  const dataCategory = categoryIdToDataCategory(activeCategory)
  const curatedPlaces = useMemo(
    () => filterCuratedPlacesByCategory(activeCategory, dataCategory),
    [activeCategory, dataCategory],
  )

  const trimmedKey = mapKey?.trim() ?? ''

  const enterFallback = useCallback(() => {
    setUseFallback(true)
    setMapReady(false)
  }, [])

  useEffect(() => {
    const onAuthFailure = () => enterFallback()
    window.addEventListener('gmaps:auth-failure', onAuthFailure)
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFailure)
  }, [enterFallback])

  useEffect(() => {
    if (!trimmedKey) {
      enterFallback()
      return
    }
    if (mapsAuthFailed) {
      enterFallback()
      return
    }

    let cancelled = false
    loadGoogleMaps(trimmedKey)
      .then(() => {
        if (!cancelled && !mapsAuthFailed) {
          setMapReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          enterFallback()
        }
      })

    return () => {
      cancelled = true
    }
  }, [trimmedKey, enterFallback])

  useEffect(() => {
    if (!mapReady || useFallback || !trimmedKey || activeCategory === 'all') {
      setApiPlaces([])
      setPlacesSearchFailed(false)
      return
    }

    const category = getCategoryById(activeCategory)
    const types = category?.placesPrimaryTypes
    if (!types?.length) {
      return
    }

    let cancelled = false
    setPlacesSearchFailed(false)

    searchNearbyCategory(activeCategory, types)
      .then((places) => {
        if (cancelled) {
          return
        }
        const mapped: ApiPlace[] = []
        for (const p of places) {
          const coords = placeLocationToLiteral(p.location)
          const name = String(p.displayName ?? 'Nearby place')
          const address = p.formattedAddress ?? ''
          if (!coords || !address) {
            continue
          }
          mapped.push({
            name,
            category: dataCategory ?? 'dining',
            address,
            lat: coords.lat,
            lng: coords.lng,
            source: 'places-api',
          })
        }
        setApiPlaces(mapped)
      })
      .catch(() => {
        if (!cancelled) {
          setApiPlaces([])
          setPlacesSearchFailed(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [mapReady, useFallback, trimmedKey, activeCategory, dataCategory])

  return (
    <div className="nearby-amenity-map">
      {showCategoryChips && (
        <NearbyAmenityCategoryChips
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}
      <div className="nearby-amenity-map__frame">
        {useFallback || !trimmedKey ? (
          <NearbyAmenityMapFallback places={curatedPlaces} />
        ) : !mapReady ? (
          <div className="nearby-amenity-map__loading" aria-busy="true">
            <div className="nearby-amenity-map__spinner" aria-hidden="true" />
            <p>Loading map…</p>
          </div>
        ) : (
          <NearbyAmenityInteractiveMap
            mapId={mapId}
            curatedPlaces={curatedPlaces}
            apiPlaces={apiPlaces}
            activeCategory={activeCategory}
          />
        )}
      </div>
      {!useFallback && mapReady && placesSearchFailed && (
        <NearbyAmenityMapFallback
          places={curatedPlaces}
          mapTitle={`Curated list near ${NEARBY_AMENITIES_COMMUNITY.name}`}
          listOnly={true}
        />
      )}
      <p className="nearby-amenity-map__note">
        Distances and live search results may vary. Curated addresses are sourced from official
        business and agency sites; the interactive map loads when enabled for this site.
      </p>
    </div>
  )
}
