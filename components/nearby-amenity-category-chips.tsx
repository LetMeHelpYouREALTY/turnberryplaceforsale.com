'use client'

import React from 'react'
import {
  NEARBY_AMENITY_CATEGORIES,
  categoryIdToDataCategory,
  type NearbyAmenityCategoryId,
} from 'lib/nearby-amenities/config'
import { nearbyCuratedPlaces } from 'lib/nearby-amenities/curated-places'

type NearbyAmenityCategoryChipsProps = {
  activeCategory: NearbyAmenityCategoryId
  onCategoryChange: (categoryId: NearbyAmenityCategoryId) => void
  compact?: boolean
}

function countForCategory(categoryId: NearbyAmenityCategoryId): number {
  const dataCategory = categoryIdToDataCategory(categoryId)
  if (!dataCategory) {
    return nearbyCuratedPlaces.length
  }
  return nearbyCuratedPlaces.filter((p) => p.category === dataCategory).length
}

export function NearbyAmenityCategoryChips({
  activeCategory,
  onCategoryChange,
  compact = false,
}: NearbyAmenityCategoryChipsProps) {
  const labelId = 'nearby-amenity-filter-label'

  return (
    <div
      className={`nearby-amenity-chips${compact ? ' nearby-amenity-chips--compact' : ''}`}
      role="group"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        Filter nearby places by category
      </span>
      <div className="nearby-amenity-chips__scroll">
        {NEARBY_AMENITY_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id
          const count = countForCategory(category.id)
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`nearby-amenity-chips__chip${isActive ? ' nearby-amenity-chips__chip--active' : ''}`}
              aria-pressed={isActive}
            >
              <span className="nearby-amenity-chips__icon" aria-hidden="true">
                {category.icon}
              </span>
              <span>{category.label}</span>
              {!compact && (
                <span className="nearby-amenity-chips__count" aria-hidden="true">
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
