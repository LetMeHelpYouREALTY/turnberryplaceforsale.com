'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Navigation, Maximize2, Map as MapIcon } from 'lucide-react'
import type { Place } from 'lib/places-data'
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

const mapStyles = [
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

type DynamicPlace = Place & { placeId?: string; source: 'curated' | 'places-api' }

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

type NearbyAmenityMapClientProps = {
  mapKey: string
  mapId?: string
  initialCategory?: NearbyAmenityCategoryId
  showCategoryChips?: boolean
  heightClassName?: string
}

function InteractiveMapWithKey({
  mapKey,
  mapId,
  activeCategory,
  curatedPlaces,
  dynamicPlaces,
}: {
  mapKey: string
  mapId?: string
  activeCategory: NearbyAmenityCategoryId
  curatedPlaces: Place[]
  dynamicPlaces: DynamicPlace[]
}) {
  const center = NEARBY_AMENITIES_COMMUNITY.center
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null)
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap')
  const [loadError, setLoadError] = useState(false)

  const { isLoaded, loadError: loaderError } = useJsApiLoader({
    id: 'google-map-nearby-amenities',
    googleMapsApiKey: mapKey,
    libraries: ['places'],
  })

  useEffect(() => {
    if (loaderError) {
      setLoadError(true)
    }
  }, [loaderError])

  const mergedPlaces = useMemo(() => {
    const byName = new Map<string, DynamicPlace>()
    for (const p of curatedPlaces) {
      byName.set(p.name, { ...p, source: 'curated' })
    }
    for (const p of dynamicPlaces) {
      if (!byName.has(p.name)) {
        byName.set(p.name, p)
      }
    }
    return Array.from(byName.values())
  }, [curatedPlaces, dynamicPlaces])

  const getCoords = useCallback(
    (place: DynamicPlace) => {
      if (place.lat != null && place.lng != null) {
        return { lat: place.lat, lng: place.lng }
      }
      return center
    },
    [center],
  )

  if (loadError) {
    return (
      <NearbyAmenityMapFallback places={curatedPlaces} />
    )
  }

  if (!isLoaded) {
    return (
      <div className="nearby-amenity-map__loading" aria-busy="true">
        <div className="nearby-amenity-map__spinner" aria-hidden="true" />
        <p>Loading map…</p>
      </div>
    )
  }

  const mapOptions: google.maps.MapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: mapType,
    ...(mapId ? { mapId } : {}),
  }

  return (
    <div className="nearby-amenity-map__canvas-wrap">
      <GoogleMap
        mapContainerClassName="nearby-amenity-map__canvas"
        center={center}
        zoom={14}
        options={mapOptions}
      >
        <Marker
          position={center}
          icon={createMarkerIcon('', true, google.maps)}
          title={NEARBY_AMENITIES_COMMUNITY.name}
          onClick={() => setInfoWindowOpen('community')}
          zIndex={1000}
        />
        {infoWindowOpen === 'community' && (
          <InfoWindow position={center} onCloseClick={() => setInfoWindowOpen(null)}>
            <div className="nearby-amenity-map__infowindow">
              <h3>{NEARBY_AMENITIES_COMMUNITY.name}</h3>
              <p>{GBP_ADDRESS_LINE}</p>
              <p className="nearby-amenity-map__infowindow-muted">
                Luxury high-rise condominiums
              </p>
            </div>
          </InfoWindow>
        )}
        {mergedPlaces.map((place) => {
          const coords = getCoords(place)
          const open = infoWindowOpen === place.name
          return (
            <React.Fragment key={`${place.name}-${place.source}`}>
              <Marker
                position={coords}
                icon={createMarkerIcon(place.category, false, google.maps, open)}
                title={place.name}
                onClick={() => setInfoWindowOpen(place.name)}
              />
              {open && (
                <InfoWindow position={coords} onCloseClick={() => setInfoWindowOpen(null)}>
                  <div className="nearby-amenity-map__infowindow">
                    <h3>{place.name}</h3>
                    {place.description && <p>{place.description}</p>}
                    {place.rating != null && (
                      <p className="nearby-amenity-map__rating">
                        Rating: {place.rating}
                      </p>
                    )}
                    <p>
                      <strong>Address:</strong> {place.address}
                    </p>
                    {place.distance && (
                      <p>
                        <strong>Distance:</strong> {place.distance}
                      </p>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nearby-amenity-map__directions-btn"
                    >
                      Directions
                      <span className="sr-only"> to {place.name} (opens in a new tab)</span>
                    </a>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          )
        })}
      </GoogleMap>
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
              document.documentElement.requestFullscreen()
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
  const [dynamicPlaces, setDynamicPlaces] = useState<DynamicPlace[]>([])

  const dataCategory = categoryIdToDataCategory(activeCategory)
  const curatedPlaces = useMemo(
    () => filterCuratedPlacesByCategory(activeCategory, dataCategory),
    [activeCategory, dataCategory],
  )

  const trimmedKey = mapKey?.trim() ?? ''

  useEffect(() => {
    if (!trimmedKey || activeCategory === 'all') {
      setDynamicPlaces([])
      return
    }

    let cancelled = false
    const category = getCategoryById(activeCategory)
    const types = category?.placesPrimaryTypes
    if (!types?.length) {
      return
    }

    async function runSearch() {
      try {
        const g = window.google
        if (!g?.maps) {
          return
        }
        const placesLib = (await g.maps.importLibrary('places')) as google.maps.PlacesLibrary
        type PlaceWithSearchNearby = {
          searchNearby: (req: {
            fields: string[]
            locationRestriction: {
              center: { lat: number; lng: number }
              radius: number
            }
            includedPrimaryTypes: string[]
            maxResultCount: number
          }) => Promise<{ places: google.maps.places.Place[] }>
        }
        const PlaceCtor = placesLib.Place as PlaceWithSearchNearby
        if (!PlaceCtor?.searchNearby) {
          return
        }
        const primaryTypes = types ?? []
        const { places } = await PlaceCtor.searchNearby({
          fields: ['displayName', 'location', 'formattedAddress', 'rating', 'id'],
          locationRestriction: {
            center: NEARBY_AMENITIES_COMMUNITY.center,
            radius: 2500,
          },
          includedPrimaryTypes: primaryTypes,
          maxResultCount: 12,
        })
        if (cancelled) {
          return
        }
        const mapped: DynamicPlace[] = []
        for (const p of places) {
          const loc = p.location
          const lat = loc?.lat()
          const lng = loc?.lng()
          const name = String(p.displayName ?? 'Nearby place')
          const address = p.formattedAddress ?? ''
          if (lat == null || lng == null || !address) {
            continue
          }
          mapped.push({
            name,
            category: dataCategory ?? 'dining',
            distance: '',
            address,
            lat,
            lng,
            rating: p.rating ?? undefined,
            placeId: p.id,
            source: 'places-api',
          })
        }
        setDynamicPlaces(mapped)
      } catch {
        if (!cancelled) {
          setDynamicPlaces([])
        }
      }
    }

    const timer = window.setTimeout(runSearch, 400)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [trimmedKey, activeCategory, dataCategory])

  return (
    <div className="nearby-amenity-map">
      {showCategoryChips && (
        <NearbyAmenityCategoryChips
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}
      <div className="nearby-amenity-map__frame">
        {!trimmedKey ? (
          <NearbyAmenityMapFallback places={curatedPlaces} />
        ) : (
          <InteractiveMapWithKey
            mapKey={trimmedKey}
            mapId={mapId}
            activeCategory={activeCategory}
            curatedPlaces={curatedPlaces}
            dynamicPlaces={dynamicPlaces}
          />
        )}
      </div>
      <p className="nearby-amenity-map__note">
        Distances and live search results may vary. The curated list uses verified addresses near
        Paradise Road; the interactive map loads when enabled for this site.
      </p>
    </div>
  )
}
