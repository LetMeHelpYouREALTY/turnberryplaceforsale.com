import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TowerCardData {
  number: number
  completed: number
  stories: number
  sizeRange: string
  priceRange?: string
  highlight: string
  bestFor: string
  image?: string
  tagline?: string
  priceStart?: string
}

interface TowerCardsProps {
  towers: TowerCardData[]
}

export function TowerCards({ towers }: TowerCardsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
          Four Distinct Towers
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Each tower offers a unique living experience. Find the one that fits your lifestyle.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {towers.map((tower) => {
            const imageSrc = tower.image || `/images/turnberry/tower-${tower.number}.jpg`
            const priceDisplay = tower.priceStart || tower.priceRange
            const sizeDisplay = tower.sizeRange.includes('sq ft') ? tower.sizeRange : `${tower.sizeRange} sq ft`
            
            return (
              <div 
                key={tower.number}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Tower Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`Turnberry Place Tower ${tower.number}${tower.tagline ? ` - ${tower.tagline}` : ''}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    quality={85}
                  />
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Tower {tower.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {tower.tagline && (
                    <h3 className="text-xl font-serif mb-1 text-gray-900">{tower.tagline}</h3>
                  )}
                  {/* Price line: using #8a6d18 (darker brand gold) to pass
                      WCAG AA on white (6.1:1). Bright #D4AF37 only passes on
                      dark bgs or at 18pt+ bold with 3:1 non-text threshold. */}
                  <p className="text-[#8a6d18] font-semibold text-lg mb-4">
                    From {priceDisplay}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4 text-gray-900">
                    <div>
                      <span className="text-gray-600">Stories</span>
                      <p className="font-semibold">{tower.stories}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Built</span>
                      <p className="font-semibold">{tower.completed}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Size Range</span>
                      <p className="font-semibold">{sizeDisplay}</p>
                    </div>
                  </div>
                  
                  {/* Highlight */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Highlight:</span> {tower.highlight}
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <Link
                    href={`/available-condos?tower=${tower.number}`}
                    className="block w-full text-center py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Available
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
