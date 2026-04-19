'use client'

/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. The site's single conversion path is the Calendly
 * booking widget (components/calendly-embed.tsx). Visitors who want a
 * virtual tour book a time slot and Dr. Jan Duffy runs the tour over
 * video during that slot. Do NOT re-import this modal.
 */

import { useState } from 'react'

interface VirtualOpenHouseModalProps {
  meetingLink?: string
}

export function VirtualOpenHouseModal({ meetingLink }: VirtualOpenHouseModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!formData.name.trim()) newErrors.push('Name is required')
    if (!formData.email.trim()) newErrors.push('Email is required')
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Invalid email address')
    }
    if (!formData.phone.trim()) newErrors.push('Phone is required')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    setSubmitted(true)

    // Track RSVP
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'virtual_open_house_rsvp', {
        event_category: 'engagement',
        event_label: 'virtual_open_house_registered'
      })
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '' })
    setErrors([])
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
        title="RSVP for Virtual Open House"
      >
        RSVP for Virtual Open House
      </button>

      {isOpen && (
        <div
          className="modal-overlay fixed-top w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
          onClick={handleClose}
        >
          <div
            className="modal-content bg-white p-4 rounded shadow-lg position-relative"
            style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn position-absolute"
              style={{ top: '10px', right: '15px', fontSize: '2rem', lineHeight: '1', border: 'none', background: 'transparent', cursor: 'pointer', color: '#333', zIndex: 1 }}
              onClick={handleClose}
              onKeyDown={(e) => e.key === 'Escape' && handleClose()}
              aria-label="Close modal"
              tabIndex={0}
            >
              ×
            </button>

            <h3 className="mb-4">Virtual Open House</h3>

            {submitted ? (
              <div>
                <div className="alert alert-success">
                  <h4>Thanks for your interest!</h4>
                  <p>We look forward to seeing you at the virtual open house. Your online meeting info is below. A copy has also been sent to your email address.</p>
                  {meetingLink && (
                    <div className="mt-3">
                      <p><strong>Please join us online:</strong></p>
                      <p><strong>Meeting link:</strong> <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>
                    </div>
                  )}
                </div>
                <button className="btn btn-primary" onClick={handleClose}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="mb-4">
                  Please enter your contact information and we'll send you instructions on how to join the virtual open house.
                </p>

                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <strong>Missing required fields</strong>
                    <ul className="mb-0 mt-2">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="voh-name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="voh-name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="voh-email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="voh-email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="voh-phone" className="form-label">Phone *</label>
                  <input
                    type="tel"
                    id="voh-phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    RSVP
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
