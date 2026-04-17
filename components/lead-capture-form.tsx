'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, Mail, User, MessageSquare, Home } from 'lucide-react'
import Link from 'next/link'

// Zod validation schema
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number (e.g., (702) 555-1234)')
    .optional()
    .or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type LeadFormData = z.infer<typeof leadFormSchema>

interface LeadCaptureFormProps {
  variant?: 'sidebar' | 'footer'
  showValuationCTA?: boolean
}

export function LeadCaptureForm({ variant = 'footer', showValuationCTA = true }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length === 0) return ''
    if (phoneNumber.length <= 3) return `(${phoneNumber}`
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const phoneValue = watch('phone')

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)

    // Track form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'lead_capture',
        event_label: 'lead_form_submitted',
        form_name: 'Lead Capture Form',
      })
    }

    try {
      // Send data to API endpoint
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details 
          ? Object.values(errorData.details).filter(Boolean).join(', ')
          : errorData.error || 'Failed to submit form'
        throw new Error(errorMessage)
      }

      const result = await response.json()
      
      setSubmitted(true)
      reset()
      
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to submit form. Please try again or call (702) 500-1971.'
      
      // Error will be shown via form validation or user notification
      // In production, you might want to use a toast notification library
      // For now, we'll rely on form validation to show errors
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div 
        className={`lead-form-container ${variant === 'sidebar' ? 'sidebar-sticky' : ''}`}
        style={variant === 'sidebar' ? {
          position: 'sticky',
          top: '100px',
          zIndex: 10,
        } : {}}
      >
        <div className="alert alert-success text-center" role="alert">
          <h3 className="h4 mb-2">Thank You!</h3>
          <p className="mb-3">Your message was sent successfully. We'll be in touch soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-outline-success btn-sm"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`lead-form-container ${variant === 'sidebar' ? 'sidebar-sticky' : ''}`}
      style={variant === 'sidebar' ? {
        position: 'sticky',
        top: '100px',
        zIndex: 10,
      } : {}}
    >
      <div 
        className="lead-form-card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef',
        }}
      >
        <h2 className="h4 mb-3 text-center" style={{ fontWeight: 600 }}>
          Get In Touch
        </h2>
        <p className="text-muted text-center small mb-4">
          Fill out the form below and we'll get back to you promptly.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="lead-name" className="form-label d-flex align-items-center">
              <User className="w-4 h-4 mr-2" aria-hidden="true" />
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="lead-name"
              {...register('name')}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Your full name"
            />
            {errors.name && (
              <div className="invalid-feedback d-block">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lead-email" className="form-label d-flex align-items-center">
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="lead-email"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lead-phone" className="form-label d-flex align-items-center">
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              Phone
            </label>
            <input
              type="tel"
              id="lead-phone"
              {...register('phone')}
              value={phoneValue}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                setValue('phone', formatted, { shouldValidate: true })
              }}
              maxLength={14}
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="(702) 555-1234"
            />
            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lead-message" className="form-label d-flex align-items-center">
              <MessageSquare className="w-4 h-4 mr-2" aria-hidden="true" />
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="lead-message"
              {...register('message')}
              rows={4}
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              placeholder="Tell us about your interest in Turnberry Place..."
            />
            {errors.message && (
              <div className="invalid-feedback d-block">{errors.message.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-block w-100 mb-3"
            style={{ fontWeight: 600 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {showValuationCTA && (
          <div className="mt-4 pt-3 border-top text-center">
            <Link
              href="/price-features#home-value-estimate"
              className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center"
            >
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              Get Home Valuation
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
