'use client'

/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. The site's single conversion path is the Calendly
 * booking widget (components/calendly-embed.tsx). Any gated-document
 * requests should be replaced with a Calendly flow (book a call to
 * receive the document). Do NOT re-import this modal.
 */

import { useState } from 'react'

interface DocumentViewerModalProps {
  documentName: string
  documentUrl?: string
  requiresPassword?: boolean
}

export function DocumentViewerModal({ documentName, documentUrl, requiresPassword = false }: DocumentViewerModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [showDocument, setShowDocument] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (requiresPassword && password) {
      setShowDocument(true)
      setError('')
    } else if (!requiresPassword) {
      setShowDocument(true)
    } else {
      setError('Password required for access')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setShowDocument(false)
    setPassword('')
    setError('')
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
        title={`View ${documentName}`}
      >
        View Document
      </button>

      {isOpen && (
        <div
          className="modal-overlay fixed-top w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
          onClick={handleClose}
        >
          <div
            className="modal-content bg-white p-4 rounded shadow-lg position-relative"
            style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh' }}
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

            <h4 className="mb-4">{documentName}</h4>

            {!showDocument ? (
              <form onSubmit={handleSubmit}>
                <p className="mb-3">Please enter your contact information to view</p>
                {requiresPassword && (
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password Required For Access</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={requiresPassword}
                    />
                  </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    View Document
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="text-center mb-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                <div className="alert alert-success">
                  <h5>Thank You</h5>
                  <p>Click to view</p>
                  {documentUrl && (
                    <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      View Document
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
