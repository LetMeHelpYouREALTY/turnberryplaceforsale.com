'use client'

import { useState } from 'react'

interface ContactMessageModalProps {
  agentName?: string
  agentPhone?: string
  agentLicense?: string
  companyName?: string
}

export function ContactMessageModal({
  agentName = 'Dr. Jan Duffy, REALTOR',
  agentPhone = '(702) 500-1971',
  agentLicense = 'S.0197614.LLC',
  companyName = 'Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy'
}: ContactMessageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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
    if (!formData.message.trim()) newErrors.push('Message is required')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    setSubmitted(true)

    // Track message sent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contact_message_sent', {
        event_category: 'engagement',
        event_label: 'contact_modal_message_sent'
      })
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setErrors([])
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
        title="Send Message"
      >
        Send Message
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

            <div className="text-center mb-4">
              <h4>{agentName}</h4>
              <p className="mb-2">{companyName}</p>
              <p className="mb-3">{agentLicense}</p>
              <p className="mb-3">
                <strong>Mobile:</strong> <a href={`tel:${agentPhone.replace(/\D/g, '')}`}>{agentPhone}</a>
              </p>
            </div>

            {submitted ? (
              <div className="text-center">
                <div className="alert alert-success">
                  <h5>Message Sent</h5>
                  <p>Thank you for your message. We'll be in touch soon!</p>
                </div>
                <button className="btn btn-primary" onClick={handleClose}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <label htmlFor="cm-name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="cm-name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cm-email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="cm-email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cm-phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    id="cm-phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cm-message" className="form-label">Message *</label>
                  <textarea
                    id="cm-message"
                    className="form-control"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Send Message
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
