'use client'

import { FloorPlan } from 'lib/floorPlans'
import Image from 'next/image'

interface ComparisonProps {
  plans: FloorPlan[]
  onRemove: (planId: string) => void
  onClear: () => void
}

export default function FloorPlanComparison({ plans, onRemove, onClear }: ComparisonProps) {
  if (plans.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-600 shadow-2xl z-40 transform transition-transform">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">
            Compare Floor Plans ({plans.length}/3)
          </h3>
          <button 
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-red-600 transition"
            aria-label="Clear all comparisons"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="relative bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <button
                onClick={() => onRemove(plan.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                aria-label={`Remove ${plan.name} from comparison`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={plan.image}
                alt={`${plan.name} — Turnberry Place Las Vegas floor plan`}
                width={60}
                height={45}
                className="object-contain bg-white rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{plan.name}</p>
                <p className="text-xs text-gray-500">{plan.beds} bed • {plan.sqft} sq ft</p>
              </div>
            </div>
          ))}
          
          {/* Empty Slots */}
          {Array.from({ length: 3 - plans.length }).map((_, idx) => (
            <div key={`empty-${idx}`} className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center text-gray-400 text-sm">
              + Add floor plan
            </div>
          ))}
        </div>

        {plans.length >= 2 && (
          <button 
            className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
            onClick={() => {
              // Scroll to comparison section or open comparison view
              document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Compare {plans.length} Floor Plans
          </button>
        )}
      </div>
    </div>
  )
}
