'use client'

import { useState, useEffect } from 'react'
import { areReviewsDisabled, getReviewsReadUrl, getReviewsWriteUrl } from 'lib/reviews'

interface Testimonial {
  quote: string
  author: string
  role?: string
  rating?: number
}

export function ClientTestimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "Dr. Jan Duffy made our Turnberry Place purchase seamless. Her knowledge of the towers and attention to detail helped us find the perfect unit with Strip views. We couldn't be happier!",
      author: "Michael & Sarah Chen",
      role: "Turnberry Place Residents",
      rating: 5
    },
    {
      quote: "As a luxury real estate investor, I've worked with many agents. Dr. Jan Duffy's expertise in high-rise condos and her negotiation skills are unmatched. She helped us acquire multiple units at Turnberry Place.",
      author: "Robert Martinez",
      role: "Real Estate Investor",
      rating: 5
    },
    {
      quote: "Selling our Turnberry Place condo was stress-free thanks to Dr. Jan Duffy. Her marketing strategy, professional photography, and network of buyers resulted in a quick sale above asking price.",
      author: "Jennifer & David Thompson",
      role: "Turnberry Place Sellers",
      rating: 5
    },
    {
      quote: "Dr. Jan Duffy's 30+ years of experience in Las Vegas real estate shows in every interaction. She guided us through every step of the process and made buying at Turnberry Place a dream come true.",
      author: "Amanda Rodriguez",
      role: "First-Time Luxury Buyer",
      rating: 5
    },
    {
      quote: "The Stirling Club access was a major selling point for us, and Dr. Jan Duffy's detailed explanation of all the amenities helped us understand the true value of Turnberry Place living.",
      author: "James & Lisa Park",
      role: "Turnberry Place Buyers",
      rating: 5
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="card-content py-5 bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="mb-3" style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              What Our Clients Say
            </h2>
            <p className="lead" style={{ 
              fontSize: '1.25rem', 
              color: '#6c757d',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Real experiences from satisfied Turnberry Place buyers and sellers
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="testimonial-carousel">
              <div className="card shadow-lg border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div className="card-body p-4 p-md-5" style={{ backgroundColor: '#fff' }}>
                  {currentTestimonial.rating && (
                    <div className="text-center mb-3">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <span key={i} className="text-warning" style={{ fontSize: '1.5rem' }}>⭐</span>
                      ))}
                    </div>
                  )}
                  <blockquote className="blockquote text-center mb-4">
                    <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      "{currentTestimonial.quote}"
                    </p>
                  </blockquote>
                  <div className="text-center">
                    <footer className="blockquote-footer">
                      <strong>{currentTestimonial.author}</strong>
                      {currentTestimonial.role && (
                        <span className="text-muted"> — {currentTestimonial.role}</span>
                      )}
                    </footer>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                >
                  ← Prev
                </button>
                <div className="d-flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm ${index === currentIndex ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      style={{ width: '12px', height: '12px', padding: 0, borderRadius: '50%' }}
                    />
                  ))}
                </div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
        {!areReviewsDisabled() ? (
          <div className="row mt-4">
            <div className="col-12 text-center d-flex flex-wrap justify-content-center gap-2">
              <a
                href={getReviewsReadUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                View Google Reviews
                <span className="sr-only"> for Turnberry Place (opens Google Maps in a new tab)</span>
              </a>
              <a
                href={getReviewsWriteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary"
              >
                Write a Review
                <span className="sr-only"> on Google (opens in a new tab)</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
