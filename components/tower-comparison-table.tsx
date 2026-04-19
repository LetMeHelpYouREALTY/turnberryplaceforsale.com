import React from 'react'
import Link from 'next/link'
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from 'lib/google-business-profile'

interface TowerData {
  number: number
  completed: number
  stories: number
  minSize: string
  maxSize: string
  startingPrice: string
  ceilingHeight: string
  stirlingAccess: string
  concierge: string
  bestViews: string
}

interface TowerComparisonTableProps {
  towers: TowerData[]
}

export function TowerComparisonTable({ towers }: TowerComparisonTableProps) {
  // Helper to get best for text
  const getBestFor = (towerNumber: number): string => {
    const bestForMap: Record<number, string> = {
      1: 'Entry buyers',
      2: 'Families',
      3: 'Modern lovers',
      4: 'Ultimate luxury',
    }
    return bestForMap[towerNumber] || ''
  }

  // Helper to format size range
  const getSizeRange = (tower: TowerData): string => {
    return `${tower.minSize.replace(/[^0-9,]/g, '')} - ${tower.maxSize.replace(/[^0-9,+]/g, '')}`
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
          Compare All Four Towers
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Find the tower that matches your lifestyle
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-6 text-left">Feature</th>
                <th className="py-4 px-6 text-center">Tower 1</th>
                <th className="py-4 px-6 text-center">Tower 2</th>
                <th className="py-4 px-6 text-center">Tower 3</th>
                <th className="py-4 px-6 text-center">Tower 4</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-900">
              {/* Completed */}
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">Completed</td>
                {towers.map((tower) => (
                  <td key={`completed-${tower.number}`} className="py-4 px-6 text-center">
                    {tower.completed}
                  </td>
                ))}
              </tr>
              
              {/* Stories */}
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="py-4 px-6 font-medium">Stories</td>
                {towers.map((tower) => (
                  <td key={`stories-${tower.number}`} className="py-4 px-6 text-center">
                    {tower.stories}
                  </td>
                ))}
              </tr>
              
              {/* Starting Price */}
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">Starting Price</td>
                {towers.map((tower) => (
                  <td
                    key={`price-${tower.number}`}
                    className="py-4 px-6 text-center text-[#8a6d18] font-semibold"
                  >
                    {tower.startingPrice}
                  </td>
                ))}
              </tr>
              
              {/* Size Range */}
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="py-4 px-6 font-medium">Size Range (sq ft)</td>
                {towers.map((tower) => (
                  <td key={`size-${tower.number}`} className="py-4 px-6 text-center">
                    {getSizeRange(tower)}
                  </td>
                ))}
              </tr>
              
              {/* Ceiling Height */}
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">Ceiling Height</td>
                {towers.map((tower) => (
                  <td 
                    key={`ceiling-${tower.number}`} 
                    className={`py-4 px-6 text-center ${tower.ceilingHeight === 'Up to 12ft' ? 'font-semibold' : ''}`}
                  >
                    {tower.ceilingHeight === 'Standard' ? 'Standard' : tower.ceilingHeight}
                  </td>
                ))}
              </tr>
              
              {/* Best For */}
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="py-4 px-6 font-medium">Best For</td>
                {towers.map((tower) => (
                  <td key={`bestfor-${tower.number}`} className="py-4 px-6 text-center text-sm">
                    {getBestFor(tower.number)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-center text-gray-500 mt-8">
          Not sure which tower?{' '}
          <Link
            href={`tel:${GBP_PHONE_TEL}`}
            className="text-[#8a6d18] font-semibold hover:underline"
          >
            Call {GBP_PHONE_DISPLAY}
          </Link>
          {' '}for guidance
        </p>
      </div>
    </section>
  )
}
