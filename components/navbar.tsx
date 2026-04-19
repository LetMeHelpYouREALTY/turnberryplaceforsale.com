import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { DrupalMenuLinkContent } from "next-drupal"
import classNames from "classnames"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { LocaleSwitcher } from "components/locale-switcher"
import Link from "next/link"

interface NavbarProps {
  links: DrupalMenuLinkContent[]
}

// Streamlined navigation structure with dropdowns
interface NavItem {
  href: string
  title: string
  children?: NavItem[]
}

const navigationStructure: NavItem[] = [
  { href: "/", title: "Home" },
  {
    title: "Properties",
    href: "/available-condos",
    children: [
      { href: "/available-condos", title: "Available Condos" },
      { href: "/towers", title: "Towers" },
      { href: "/price-features", title: "Price & Features" },
    ]
  },
  { href: "/floor-plans", title: "Floor Plans" },
  {
    title: "About",
    href: "/amenities",
    children: [
      { href: "/amenities", title: "Amenities" },
      { href: "/stirling-club", title: "Stirling Club" },
      { href: "/neighborhood", title: "Neighborhood" },
      { href: "/photos", title: "Photos" },
    ]
  },
  {
    title: "Contact",
    href: "/request-details",
    children: [
      { href: "/request-details", title: "Request Details" },
      { href: "/open-house", title: "Open House" },
      { href: "/agent", title: "Agent" },
    ]
  },
  { href: "/map", title: "Map" },
  { href: "/share", title: "Share" },
]

// Flattened list for mobile menu
const navigationLinks = [
  { href: "/", title: "Home" },
  { href: "/available-condos", title: "Available Condos" },
  { href: "/floor-plans", title: "Floor Plans" },
  { href: "/towers", title: "Towers" },
  { href: "/price-features", title: "Price & Features" },
  { href: "/amenities", title: "Amenities" },
  { href: "/stirling-club", title: "Stirling Club" },
  { href: "/neighborhood", title: "Neighborhood" },
  { href: "/photos", title: "Photos" },
  { href: "/request-details", title: "Request Details" },
  { href: "/open-house", title: "Open House" },
  { href: "/agent", title: "Agent" },
  { href: "/map", title: "Map" },
  { href: "/share", title: "Share" },
]

export function Navbar({ links, ...props }: NavbarProps) {
  const { locale, asPath } = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
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

  const isActive = (href: string, children?: NavItem[]) => {
    if (asPath === href) return true
    if (children) {
      return children.some(child => asPath === child.href)
    }
    return false
  }

  return (
    <>
      {/* Skip to content link - first focusable element */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* SiteNavigationElement Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
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
                  <a href="tel:+17025001971" title="Office phone">(702) 500-1971</a>
                </div>
                <div className="agent-address d-none d-md-block font-size-80 mt-1" style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  2827 Paradise Rd, Suite 2, Las Vegas, NV 89109
                </div>
              </div>
            </div>
          </div>
          <div className="col" style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div className="nav-wrapper d-none d-lg-block">
              {/* Top Row Navigation */}
              <div className="d-flex flex-wrap align-items-center justify-content-end" style={{ marginBottom: '0.25rem' }}>
                <Link 
                  href="/" 
                  className={classNames("nav-link px-2", asPath === "/" && "active")}
                  aria-current={asPath === "/" ? "page" : undefined}
                >
                  Home
                </Link>
                <Link 
                  href="/price-features" 
                  className={classNames("nav-link px-2", asPath === "/price-features" && "active")}
                  aria-current={asPath === "/price-features" ? "page" : undefined}
                >
                  Price & Features
                </Link>
                <Link 
                  href="/towers" 
                  className={classNames("nav-link px-2", asPath === "/towers" && "active")}
                  aria-current={asPath === "/towers" ? "page" : undefined}
                >
                  Towers
                </Link>
                <Link 
                  href="/amenities" 
                  className={classNames("nav-link px-2", asPath === "/amenities" && "active")}
                  aria-current={asPath === "/amenities" ? "page" : undefined}
                >
                  Amenities
                </Link>
                <Link 
                  href="/photos" 
                  className={classNames("nav-link px-2", asPath === "/photos" && "active")}
                  aria-current={asPath === "/photos" ? "page" : undefined}
                >
                  Photos
                </Link>
                <Link 
                  href="/map" 
                  className={classNames("nav-link px-2", asPath === "/map" && "active")}
                  aria-current={asPath === "/map" ? "page" : undefined}
                >
                  Map
                </Link>
                <Link 
                  href="/open-house" 
                  className={classNames("nav-link px-2", asPath === "/open-house" && "active")}
                  aria-current={asPath === "/open-house" ? "page" : undefined}
                >
                  Open House
                </Link>
                <Link 
                  href="/request-details" 
                  className={classNames("nav-link px-2", asPath === "/request-details" && "active")}
                  aria-current={asPath === "/request-details" ? "page" : undefined}
                >
                  Request Details
                </Link>
                <Link 
                  href="/agent" 
                  className={classNames("nav-link px-2", asPath === "/agent" && "active")}
                  aria-current={asPath === "/agent" ? "page" : undefined}
                >
                  Agent
                </Link>
              </div>
              {/* Bottom Row Navigation */}
              <div className="d-flex flex-wrap align-items-center justify-content-end">
                <Link 
                  href="/available-condos" 
                  className={classNames("nav-link px-2", asPath === "/available-condos" && "active")}
                  aria-current={asPath === "/available-condos" ? "page" : undefined}
                >
                  Available Condos
                </Link>
                <Link 
                  href="/floor-plans" 
                  className={classNames("nav-link px-2", asPath === "/floor-plans" && "active")}
                  aria-current={asPath === "/floor-plans" ? "page" : undefined}
                >
                  Floor Plans
                </Link>
                <Link 
                  href="/share" 
                  className={classNames("nav-link px-2", asPath === "/share" && "active")}
                  aria-current={asPath === "/share" ? "page" : undefined}
                >
                  Share
                </Link>
                <Link 
                  href="/stirling-club" 
                  className={classNames("nav-link px-2", asPath === "/stirling-club" && "active")}
                  aria-current={asPath === "/stirling-club" ? "page" : undefined}
                >
                  Stirling Club
                </Link>
                <Link 
                  href="/neighborhood" 
                  className={classNames("nav-link px-2", asPath === "/neighborhood" && "active")}
                  aria-current={asPath === "/neighborhood" ? "page" : undefined}
                >
                  Neighborhood
                </Link>
                <Link
                  href="https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https://www.turnberryplaceforsale.com"
                  className="nav-link px-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Español
                </Link>
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
              {navigationLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-mobile-link"
                    title={link.title}
                    aria-current={asPath === link.href ? "page" : undefined}
                    ref={index === 0 ? firstFocusableRef : index === navigationLinks.length - 1 ? lastFocusableRef : undefined}
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
                <Link
                  href="https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https://www.turnberryplaceforsale.com"
                  className="nav-mobile-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setMobileMenuOpen(false)
                    }
                  }}
                >
                  Español
                </Link>
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
