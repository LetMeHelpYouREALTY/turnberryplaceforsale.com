/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. The site's single conversion path is the Calendly
 * booking widget (components/calendly-embed.tsx). Do NOT re-import.
 */

import React, { useState } from "react"

interface ContactFormProps {
  title?: string
  onSubmit?: (data: FormData) => void
}

export function ContactForm({ title = "Request Pricing & Details", onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length === 0) return ''
    if (phoneNumber.length <= 3) return `(${phoneNumber}`
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '')
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number'
      }
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Track form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: 'contact_form_submitted',
        form_name: title
      })
    }
    
    try {
      if (onSubmit) {
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          data.append(key, value)
        })
        await onSubmit(data)
      }
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
      }, 5000)
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again or call (702) 500-1971.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="alert alert-success text-center" role="alert">
        <h3 className="h4 mb-2">THANKS!</h3>
        <p className="mb-3">Your message was sent. We'll be in touch soon.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn btn-outline-success btn-sm"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <div className="mt-3 mt-md-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="name" className="form-label">
              Your name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(702) 555-1234"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                setFormData({ ...formData, phone: formatted })
                if (errors.phone) setErrors({ ...errors, phone: '' })
              }}
              maxLength={14}
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            />
            {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="message" className="form-label">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value })
                if (errors.message) setErrors({ ...errors, message: '' })
              }}
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            />
            {errors.message && <div className="invalid-feedback d-block">{errors.message}</div>}
          </div>
          {errors.submit && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            </div>
          )}
          <div className="col-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-100"
            >
              {isSubmitting ? 'Submitting...' : 'Request Pricing & Details'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
