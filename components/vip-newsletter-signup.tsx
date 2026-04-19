'use client'

/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. The site's single conversion path is the Calendly
 * booking widget (components/calendly-embed.tsx). Do NOT re-import.
 */

import { useState } from 'react'

interface VIPNewsletterSignupProps {
  title?: string
  subtitle?: string
  compact?: boolean
}

export function VIPNewsletterSignup({
  title = "Join Our VIP List",
  subtitle = "Join our list of insiders and be the first to receive exclusive listings and market updates",
  compact = false
}: VIPNewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Track newsletter signup
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'vip_list_signup'
        })
      }

      // Here you would typically send to your email service (Mailchimp, ConvertKit, etc.)
      // For now, we'll just show success
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitted(true)
      setEmail('')
      setName('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`vip-newsletter-signup ${compact ? 'compact' : ''}`}>
        <div className="alert alert-success text-center">
          <h5 className="mb-2">Thank You!</h5>
          <p className="mb-0">You've been added to our VIP list. Check your email for exclusive updates.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`vip-newsletter-signup ${compact ? 'compact' : ''}`}>
      {!compact && (
        <>
          <h3 className="text-center mb-2">{title}</h3>
          <p className="text-center mb-4 text-muted">{subtitle}</p>
        </>
      )}
      <form onSubmit={handleSubmit} className="vip-newsletter-form">
        {!compact && (
          <div className="mb-3">
            <label htmlFor="vip-name" className="form-label">Name</label>
            <input
              type="text"
              id="vip-name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        )}
        <div className={compact ? "d-flex gap-2" : "mb-3"}>
          <div className={compact ? "flex-grow-1" : ""}>
            <label htmlFor="vip-email" className="form-label sr-only">Email</label>
            <input
              type="email"
              id="vip-email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${compact ? '' : 'w-100'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : compact ? 'Join' : 'Join VIP List'}
          </button>
        </div>
        {error && (
          <div className="alert alert-danger mt-2 mb-0" role="alert">
            {error}
          </div>
        )}
        <p className="text-muted small mt-2 mb-0 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
}
