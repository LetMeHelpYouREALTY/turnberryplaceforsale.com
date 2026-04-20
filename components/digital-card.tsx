'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import {
  GBP_ADDRESS_LINE,
  GBP_EMAIL,
  GBP_PHONE_DISPLAY,
  GBP_PHONE_TEL,
} from 'lib/google-business-profile'

interface DigitalCardProps {
  cardId?: string
}

export default function DigitalCard({ cardId = '2271764' }: DigitalCardProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  
  const cardUrl = `https://www.turnberryplaceforsale.com/#card-id-${cardId}`
  const siteUrl = 'https://www.turnberryplaceforsale.com'
  
  // vCard data for contact saving
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Dr. Jan Duffy
N:Duffy;Jan;Dr.;;
ORG:Berkshire Hathaway HomeServices Nevada Properties
TITLE:REALTOR - Turnberry Place Specialist
TEL;TYPE=WORK,VOICE:${GBP_PHONE_DISPLAY}
EMAIL:${GBP_EMAIL}
ADR;TYPE=WORK:;Suite 2;2827 Paradise Rd;Las Vegas;NV;89109;USA
URL:${siteUrl}
NOTE:Turnberry Place Las Vegas Luxury Condo Specialist. License S.0197614.LLC
END:VCARD`

  const handleDownloadVCard = () => {
    const blob = new Blob([vCardData], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Dr-Jan-Duffy-Turnberry-Place.vcf'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = siteUrl
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleShareSMS = () => {
    const message = encodeURIComponent(
      `Check out Turnberry Place luxury condos in Las Vegas! Contact Dr. Jan Duffy: ${GBP_PHONE_DISPLAY} - ${siteUrl}`
    )
    window.open(`sms:?body=${message}`, '_blank')
  }

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `Discover luxury high-rise condos at Turnberry Place Las Vegas! 4 towers near the Strip. Contact Dr. Jan Duffy: ${GBP_PHONE_DISPLAY} ${siteUrl}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Turnberry Place Las Vegas - Luxury Condos')
    const body = encodeURIComponent(
      `I thought you might be interested in Turnberry Place, a luxury high-rise condo community near the Las Vegas Strip.\n\nContact Dr. Jan Duffy for more information:\nPhone: ${GBP_PHONE_DISPLAY}\nWebsite: ${siteUrl}\n\nFeatures include:\n- 4 luxury towers\n- Guard-gated security\n- The Stirling Club amenities\n- Strip and mountain views`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
      {/* Card Header */}
      <div className="relative h-32 bg-gradient-to-r from-amber-600 to-amber-800">
        <div className="absolute -bottom-12 left-6">
          <Image
            src="/images/turnberry/asset-1.jpg"
            alt="Dr. Jan Duffy - Turnberry Place Las Vegas Specialist"
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>
      
      {/* Card Body */}
      <div className="pt-14 px-6 pb-6 text-white">
        <h3 className="text-xl font-bold">Dr. Jan Duffy</h3>
        <p className="text-amber-400 text-sm">REALTOR® | Turnberry Place Specialist</p>
        <p className="text-gray-400 text-xs mt-1">
          Berkshire Hathaway HomeServices Nevada Properties
        </p>
        <p className="text-gray-500 text-xs mt-1">
          License: S.0197614.LLC
        </p>
        
        {/* Contact Info */}
        <div className="mt-4 space-y-2 text-sm">
          <a 
            href={`tel:${GBP_PHONE_TEL}`}
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            itemProp="telephone"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {GBP_PHONE_DISPLAY}
          </a>
          <p className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {GBP_ADDRESS_LINE}
          </p>
        </div>

        {/* QR Code Toggle */}
        {showQR && (
          <div className="mt-4 flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG 
              value={siteUrl}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadVCard}
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
            aria-label="Download contact to phone"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Save Contact
          </button>
          
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
            aria-label={showQR ? 'Hide QR code' : 'Show QR code'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            {showQR ? 'Hide QR' : 'Show QR'}
          </button>
          
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
            aria-label={copied ? 'Link copied' : 'Copy website link'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          
          <button
            onClick={handleShareSMS}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
            aria-label="Share via SMS text message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Text
          </button>
        </div>

        {/* Additional Share Options */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleShareWhatsApp}
            className="p-2 bg-[#25D366] hover:bg-[#128C7E] rounded-full transition"
            aria-label="Share via WhatsApp"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          
          <button
            onClick={handleShareEmail}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition"
            aria-label="Share via Email"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
