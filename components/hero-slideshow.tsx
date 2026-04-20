import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { BUILD_DATE_MONTH_YEAR } from "lib/build-date"
import { heroSlideAlt } from "lib/image-alt"

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

interface HeroSlideshowProps {
  photos: string[]
  /** Optional per-slide alt text (same length as `photos`); defaults to indexed Turnberry descriptions. */
  photoAlts?: readonly string[]
}

export function HeroSlideshow({ photos, photoAlts }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [photos.length, isPaused])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const getBrightnessFilter = (index: number) => {
    if (index === 5) {
      return "brightness(1.3) contrast(1.1)"
    }
    if (index === 1 || index === 2) {
      return "brightness(1.2) contrast(1.1)"
    }
    return "brightness(1.1) contrast(1.05)"
  }

  return (
    <header className="card-top-header relative h-screen min-h-[500px] w-full">
      {/* Slideshow: stacked next/image only (no raw CSS background — LCP + bandwidth). */}
      <div className="slick-slideshow absolute inset-0 z-0" aria-label="Hero image slideshow">
        {photos.map((photo, index) => {
          const isCurrent = index === currentSlide
          const slideAlt =
            photoAlts?.[index]?.trim() || heroSlideAlt(index, photos.length)
          const isLcpSlide = index === 0

          return (
            <div
              key={index}
              className={`slide absolute inset-0 transition-opacity duration-1000 ${
                isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isCurrent}
            >
              <div
                className="absolute inset-0"
                style={{ filter: getBrightnessFilter(index) }}
              >
                <Image
                  src={photo}
                  alt={slideAlt}
                  fill
                  sizes="100vw"
                  priority={isLcpSlide}
                  fetchPriority={isLcpSlide ? "high" : "low"}
                  {...(!isLcpSlide ? { loading: "lazy" as const } : {})}
                  quality={isLcpSlide ? 85 : 72}
                  placeholder={isLcpSlide ? "blur" : "empty"}
                  blurDataURL={isLcpSlide ? HERO_BLUR_DATA_URL : undefined}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Overlay - Reduced opacity for brighter images */}
      <div className="absolute inset-0 bg-black opacity-15 z-10" />

      {/* Hero Content */}
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
          <div className="col-12 text-center hero-content position-relative" style={{ zIndex: 14 }}>
            <h1 className="hero-headline mb-2">
              Turnberry Place Condos for Sale | Luxury High-Rise Living Near the Las Vegas Strip
            </h1>
            <div className="d-flex align-items-center justify-content-center mb-4">
              <div className="w-10 horiz-line" style={{ flex: '1', maxWidth: '100px', height: '2px', backgroundColor: '#ffffff' }}></div>
              <p className="hero-location my-0 mx-4">Las Vegas, NV</p>
              <div className="w-10 horiz-line" style={{ flex: '1', maxWidth: '100px', height: '2px', backgroundColor: '#ffffff' }}></div>
            </div>
            <div className="mt-4 d-flex flex-column align-items-center justify-content-center" style={{ gap: '1rem' }}>
              <div className="p-2 status-banner" style={{
                border: '1px solid rgba(255, 255, 255, 1)',
                borderRadius: '4px',
                minWidth: '200px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}>
                <p className="hero-status-title">Units for Sale</p>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center" style={{ gap: '0.75rem' }}>
                <Link 
                  href="/available-condos" 
                  className="btn btn-light btn-lg px-6 py-3 d-flex align-items-center"
                  style={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    gap: '0.5rem',
                  }}
                >
                  View Listings
                  <ArrowRight className="w-4 h-4" style={{ flexShrink: 0 }} aria-hidden="true" />
                </Link>
                <Link 
                  href="/request-details" 
                  className="btn btn-outline-light btn-lg px-6 py-3 d-flex align-items-center"
                  style={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderRadius: '4px',
                    borderWidth: '2px',
                    gap: '0.5rem',
                  }}
                >
                  Request Details
                  <Phone className="w-4 h-4" style={{ flexShrink: 0 }} aria-hidden="true" />
                </Link>
              </div>
              <p className="text-white mb-0" style={{ 
                fontSize: '0.875rem', 
                textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                fontStyle: 'italic',
              }}>
                Updated {BUILD_DATE_MONTH_YEAR}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Bar */}
      <div className="thumbnails-bar d-flex align-items-center justify-content-center">
        {photos.map((photo, index) => {
          const slideAlt =
            photoAlts?.[index]?.trim() || heroSlideAlt(index, photos.length)
          return (
          <button
            key={index}
            type="button"
            className={`photo-thumbnail photo-${index + 1} ${index === currentSlide ? "selected" : ""}`}
            data-idx={index + 1}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                goToSlide(index)
              }
            }}
            aria-label={`Show hero slide ${index + 1} of ${photos.length} — ${slideAlt}`}
            aria-pressed={index === currentSlide}
            style={{ cursor: 'pointer', position: 'relative', width: '100px', height: '60px', overflow: 'hidden', border: 'none', background: 'transparent', padding: 0 }}
          >
            <Image
              src={photo}
              alt=""
              fill
              sizes="100px"
              style={{ objectFit: 'cover' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={60}
              placeholder="blur"
              blurDataURL={HERO_BLUR_DATA_URL}
            />
          </button>
          )
        })}
        <Link
          href="/photos"
          className="ml-2"
          aria-label="View all Turnberry Place photos"
          style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}
        >
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: '4px',
            padding: '0.5rem',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          >
            <svg
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
              style={{ color: "#fff" }}
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 128.032v255.93c0 28.425 34.488 42.767 54.627 22.627l128-127.962c12.496-12.496 12.497-32.758 0-45.255l-128-127.968C34.528 85.305 0 99.55 0 128.032zM160 256L32 384V128l128 128z"/>
            </svg>
          </div>
        </Link>
      </div>
    </header>
  )
}
