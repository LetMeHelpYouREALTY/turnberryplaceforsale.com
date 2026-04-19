'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL, GBP_EMAIL } from 'lib/google-business-profile'

interface AgentBioModalProps {
  agentId?: string
}

export function AgentBioModal({ agentId = '14435' }: AgentBioModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="cursor-pointer btn-agent-bio"
        data-agentid={agentId}
        onClick={() => setIsOpen(true)}
        title="View Bio"
      >
        View Bio
      </button>

      {isOpen && (
        <div
          className="modal-overlay fixed-top w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-content bg-white p-4 rounded shadow-lg position-relative"
            style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn position-absolute"
              style={{ top: '10px', right: '15px', fontSize: '2rem', lineHeight: '1', border: 'none', background: 'transparent', cursor: 'pointer', color: '#333', zIndex: 1 }}
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
              aria-label="Close modal"
              tabIndex={0}
            >
              ×
            </button>

            <div className="text-center mb-4">
              <h3>Dr. Jan Duffy, REALTOR</h3>
              <p className="mb-2">
                Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy
              </p>
              <p className="mb-3">S.0197614.LLC</p>
              <Image
                className="img-fluid agent-photo rounded-circle mb-3"
                src="/images/turnberry/asset-1.jpg"
                alt="Photo of Dr. Jan Duffy, REALTOR"
                width={200}
                height={200}
              />
              <p className="mb-3">
                <strong>Office:</strong> <a href={`tel:${GBP_PHONE_TEL}`}>{GBP_PHONE_DISPLAY}</a>
              </p>
            </div>

            <div className="agent-bio-content">
              <p>
                Dr. Jan Duffy specializes in luxury high-rise properties at Turnberry Place, bringing expertise and dedication to Las Vegas' premier residential community. As a Realtor with Berkshire Hathaway HomeServices Nevada Properties, she combines in-depth knowledge of Turnberry Place with exceptional client service.
              </p>
              <p>
                Known as the "Good to Know Realtor," Dr. Duffy offers comprehensive insights into Turnberry Place's unique lifestyle, amenities, and real estate opportunities. Her expertise extends beyond transactions to include detailed understanding of The Stirling Club, property values, and the distinctive features of each Turnberry Place tower.
              </p>
              <p>
                Dr. Duffy's commitment to client success is reflected in her extensive knowledge of Las Vegas luxury real estate, particularly along the Strip corridor. She assists both buyers and sellers at Turnberry Place, providing detailed market analysis, strategic pricing guidance, and skilled negotiations.
              </p>
              <p>
                Based at Berkshire Hathaway's office at 7475 West Sahara Avenue, Dr. Duffy serves clients seven days a week from 6:00 AM to 9:00 PM. As a veteran-owned, women-owned business, she brings professionalism and dedication to every client interaction.
              </p>
              <p className="mt-4">
                <strong>For expert guidance in Turnberry Place real estate, contact Dr. Jan Duffy:</strong><br />
                Phone: <a href={`tel:${GBP_PHONE_TEL}`}>{GBP_PHONE_DISPLAY}</a><br />
                Email: <a href={`mailto:${GBP_EMAIL}`}>{GBP_EMAIL}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
