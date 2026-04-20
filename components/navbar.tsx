import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { DrupalMenuLinkContent } from "next-drupal"
import classNames from "classnames"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import Link from "next/link"
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from "lib/google-business-profile"
import {
  SITE_INTERNAL_LINKS_FLAT,
  SITE_NAV_DESKTOP_ROW1,
  SITE_NAV_DESKTOP_ROW2,
} from "lib/site-internal-links"
import { serializeJsonLd } from "lib/schema/serializeJsonLd"

interface NavbarProps {
  links: DrupalMenuLinkContent[]
}

export function Navbar({ links, ...props }: NavbarProps) {
  const { asPath } = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const firstFocusableRef = useRef<HTMLAnchorElement>(null)
  const lastFocusableRef = useRef<HTMLAnchorElement>(null)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'

  // SiteNavigationElement schema for SEO
  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: baseUrl,
  }

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return

    const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    firstElement.focus()
    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Skip to content link - first focusable element */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* SiteNavigationElement Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteNavigationSchema, false) }}
      />

      <header role="banner" className="card-top-nav active w-100 fixed top-0 z-50 bg-gray-900 text-white">
      <nav
        aria-label="Main navigation"
        {...props}
      >
      <div className="container-fluid text-heading pr-3">
        <div className="row align-items-center no-gutters" style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <div className="col-auto" style={{ flexShrink: 0 }}>
            <div className="d-flex align-items-center pl-0 pl-sm-1 pl-lg-2 pl-xl-3">
              <div className="agent-photo-wrapper">
                <Image
                  src="/images/turnberry/asset-1.jpg"
                  className="agent-photo"
                  width={60}
                  height={60}
                  alt="Dr. Jan Duffy"
                  quality={90}
                  sizes="60px"
                />
              </div>
              <div className="agent-text">
                <div className="agent-name">DR. JAN DUFFY, REALTOR</div>
                <div className="d-none d-lg-block agent-company">
                  Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy
                </div>
                <div className="agent-phone">
                  <a href={`tel:${GBP_PHONE_TEL}`} title="Office phone">{GBP_PHONE_DISPLAY}</a>
                </div>
                {/* Street address lives in the footer only (per brand/UX rule 2026-04-18)
                    to keep the header NAP tight and avoid visual NAP duplication. */}
              </div>
            </div>
          </div>
          <div className="col" style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div className="nav-wrapper d-none d-lg-block">
              {/* Top Row Navigation */}
              <div className="d-flex flex-wrap align-items-center justify-content-end" style={{ marginBottom: '0.25rem' }}>
                {SITE_NAV_DESKTOP_ROW1.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={classNames("nav-link px-2", asPath === link.href && "active")}
                    aria-current={asPath === link.href ? "page" : undefined}
                    title={link.linkTitle ?? link.title}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              {/* Bottom Row Navigation */}
              <div className="d-flex flex-wrap align-items-center justify-content-end">
                {SITE_NAV_DESKTOP_ROW2.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={classNames("nav-link px-2", asPath === link.href && "active")}
                    aria-current={asPath === link.href ? "page" : undefined}
                    title={link.linkTitle ?? link.title}
                  >
                    {link.title}
                  </Link>
                ))}
                <a
                  href="https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https://www.turnberryplaceforsale.com"
                  className="nav-link px-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View this site in Spanish (Google Translate)"
                >
                  Español
                </a>
              </div>
            </div>
            <button
              className="ml-auto pr-2 d-inline d-lg-none nav-mobile cursor-pointer align-items-center bg-transparent border-0 text-white"
              aria-label={mobileMenuOpen ? "Close mobile navigation" : "Open mobile navigation"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="overlay overlay-data overlay-open"
          onClick={(e) => {
            // Close menu when clicking on overlay background
            if (e.target === e.currentTarget) {
              setMobileMenuOpen(false)
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav 
            role="navigation" 
            aria-label="Mobile Navigation" 
            id="navbarMobile"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {SITE_INTERNAL_LINKS_FLAT.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-mobile-link"
                    title={link.linkTitle ?? link.title}
                    aria-current={asPath === link.href ? "page" : undefined}
                    ref={index === 0 ? firstFocusableRef : index === SITE_INTERNAL_LINKS_FLAT.length - 1 ? lastFocusableRef : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMobileMenuOpen(false)
                      }
                    }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https://www.turnberryplaceforsale.com"
                  className="nav-mobile-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View this site in Spanish (Google Translate)"
                  onClick={() => setMobileMenuOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setMobileMenuOpen(false)
                    }
                  }}
                >
                  Español
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
      </nav>
      </header>
    </>
  )
}
