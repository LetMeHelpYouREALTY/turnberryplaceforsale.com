'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from 'lib/google-business-profile'

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown')
    if (hasSeenPopup) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        
        // Track exit intent event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'exit_intent', {
            event_category: 'engagement',
            event_label: 'exit_intent_popup_shown'
          })
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_dismissed', {
        event_category: 'engagement',
        event_label: 'exit_intent_popup_closed'
      })
    }
  }

  const handleCTAClick = (type: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_cta_click', {
        event_category: 'engagement',
        event_label: `exit_intent_${type}`
      })
    }
  }

  if (!showPopup) return null

  return (
    <div 
      className="exit-intent-overlay fixed-top w-100 h-100 d-flex align-items-center justify-content-center" 
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
      onClick={handleClose}
    >
      <div 
        className="exit-intent-popup bg-white p-4 rounded shadow-lg position-relative" 
        style={{ maxWidth: '500px', width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn position-absolute"
          style={{ top: '10px', right: '15px', fontSize: '2rem', lineHeight: '1', border: 'none', background: 'transparent', cursor: 'pointer', color: '#333', zIndex: 1 }}
          onClick={handleClose}
          onKeyDown={(e) => e.key === 'Escape' && handleClose()}
          aria-label="Close popup"
          tabIndex={0}
        >
          ×
        </button>
        <h3 className="mb-3 font-weight-bold">Wait! Before You Go...</h3>
        <p className="mb-4">
          Get instant access to Turnberry Place's available luxury condos and schedule your private tour today.
        </p>
        <div className="d-flex flex-column gap-2">
          <a 
            href={`tel:${GBP_PHONE_TEL}`} 
            className="btn btn-primary btn-lg font-weight-bold"
            onClick={() => handleCTAClick('phone')}
          >
            📞 Call {GBP_PHONE_DISPLAY}
          </a>
          <Link 
            href="/request-details" 
            className="btn btn-outline-primary btn-lg"
            onClick={() => handleCTAClick('form')}
          >
            Request Details
          </Link>
        </div>
      </div>
    </div>
  )
}
