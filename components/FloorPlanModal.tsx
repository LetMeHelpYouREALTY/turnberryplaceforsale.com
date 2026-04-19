'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FloorPlan } from 'lib/floorPlans'
import { GBP_PHONE_TEL } from 'lib/google-business-profile'

interface FloorPlanModalProps {
  plan: FloorPlan
  isOpen: boolean
  onClose: () => void
}

export default function FloorPlanModal({ plan, isOpen, onClose }: FloorPlanModalProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const handleDownloadPDF = () => {
    if (plan.pdfUrl) {
      window.open(plan.pdfUrl, '_blank')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="floor-plan-title"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-lg transition"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Floor Plan Image */}
          <div className="relative bg-gray-50 p-6 flex items-center justify-center min-h-[400px]">
            <Image
              src={plan.image}
              alt={`Turnberry Place ${plan.name} floor plan layout`}
              width={800}
              height={600}
              className="object-contain max-h-[70vh]"
              priority
            />
          </div>

          {/* Floor Plan Details */}
          <div className="p-6 lg:p-8 overflow-y-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-amber-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {plan.type}
              </span>
              <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                Tower{plan.towers.length > 1 ? 's' : ''} {plan.towers.join(', ')}
              </span>
            </div>

            <h2 id="floor-plan-title" className="text-3xl font-bold text-gray-900 mb-2">
              {plan.name}
            </h2>
            
            <p className="text-2xl text-amber-600 font-semibold mb-6">
              {plan.priceRange}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="text-center bg-gray-50 rounded-xl py-4">
                <p className="text-3xl font-bold text-gray-900">{plan.beds}</p>
                <p className="text-sm text-gray-500">Bedrooms</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl py-4">
                <p className="text-3xl font-bold text-gray-900">{plan.baths}</p>
                <p className="text-sm text-gray-500">Bathrooms</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl py-4">
                <p className="text-2xl font-bold text-gray-900">{plan.sqft.split(' ')[0]}</p>
                <p className="text-sm text-gray-500">Sq Ft</p>
              </div>
              {plan.balconySqft && (
                <div className="text-center bg-gray-50 rounded-xl py-4">
                  <p className="text-2xl font-bold text-gray-900">{plan.balconySqft.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Balcony Sq Ft</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Views */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Views</h3>
              <div className="flex flex-wrap gap-2">
                {plan.views.map((view, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {view}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href={`/request-details?plan=${plan.id}`}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Request Info About {plan.name}
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${GBP_PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                
                <Link
                  href={`/available-condos?plan=${plan.id}`}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-amber-600 text-gray-700 hover:text-amber-600 py-3 px-4 rounded-lg font-medium transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  View Listings
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {plan.pdfUrl && (
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 py-2 text-sm transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                )}
                
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 py-2 text-sm transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Floor Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
