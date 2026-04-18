'use client'

import { useState, useEffect } from 'react'
import { areReviewsDisabled, getReviewsReadUrl, getReviewsWriteUrl } from 'lib/reviews'

/**
 * Verified-reviews carousel for the Dr. Jan Duffy Turnberry Place
 * microsite. All quotes below are excerpts from real Google reviews on
 * Dr. Duffy's verified Google Business Profiles (Sunset, Centennial
 * Hills, Sahara, Henderson), pasted by the operator on 2026-04-18.
 *
 * Integrity notes (CLAUDE.md / AGENTS.md / global no-fabricated-social-proof rule):
 *   - No invented authors, dates, ratings, or reviewer relationships.
 *   - "Role" field intentionally omitted: Google reviewers are not
 *     identified as Turnberry Place residents specifically, so claiming
 *     that would be fabricated social proof even if the underlying quote
 *     is real.
 *   - Reviews that used "Dr. Janet Duffy" are excluded since the brand
 *     rule is "Jan, never Janet" and altering a quote is not acceptable.
 *   - Truncated reviews are flagged with `truncated: true` and the UI
 *     shows a "Read the full review on Google" link to the reviews panel.
 *   - Carlos Vela's 1-star rating-only review is excluded (no text to
 *     display; the negative signal is already addressed publicly via the
 *     operator's GBP owner-reply).
 */
interface Testimonial {
  quote: string
  author: string
  date: string
  sourceGbp: string
  rating: number
  truncated?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Dr Jan Duffy has been great to work with. Once she has the info of what you are looking for, she doesn't stop until she finds it and gets you a deal of a lifetime!",
    author: 'Steven Miranda',
    date: 'Jul 25, 2023',
    sourceGbp: 'Google Review · Affordable Homes Las Vegas',
    rating: 5,
  },
  {
    quote:
      "Dr. Duffy is an amazing Realtor and always puts her clients best interest first",
    author: 'Karen Sjodin',
    date: 'Aug 3, 2023',
    sourceGbp: 'Google Review · Affordable Homes Las Vegas',
    rating: 5,
  },
  {
    quote:
      'She is always ready to help you with your property. Five stars. Thank you Jan Duffy!',
    author: 'Janis Bovino',
    date: 'Oct 19, 2024',
    sourceGbp: 'Google Review · Centennial Hills',
    rating: 5,
  },
  {
    quote:
      'Dr Jan Duffy is a pleasure to work with! She keeps a professional, calm, upbeat attitude throughout the home…',
    author: 'Melissa Schreiber',
    date: 'Aug 3, 2023',
    sourceGbp: 'Google Review · Affordable Homes Las Vegas',
    rating: 5,
    truncated: true,
  },
  {
    quote:
      'I had the privilege of working with Dr. Jan Duffy as a buyer for my services, and I must say that the experience was…',
    author: 'Waqar Hafeez',
    date: 'Aug 22, 2023',
    sourceGbp: 'Google Review · Las Vegas Strip High Rise Condos',
    rating: 5,
    truncated: true,
  },
  {
    quote:
      'It is with great pleasure that I review my experience with Dr. Jan Duffy. She is a consummate professional in all she…',
    author: 'Bob Crane',
    date: 'Dec 14, 2022',
    sourceGbp: 'Google Review · MacDonald Highlands',
    rating: 5,
    truncated: true,
  },
]

export function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

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
  const reviewsReadUrl = getReviewsReadUrl()

  return (
    <div
      className="card-content py-5 bg-white"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2
              className="mb-3"
              style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}
            >
              What Clients Say About Dr. Jan Duffy
            </h2>
            <p
              className="lead"
              style={{
                fontSize: '1.25rem',
                color: '#495057',
                lineHeight: 1.6,
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              Verified excerpts from Dr. Jan Duffy&rsquo;s Google Business Profile
              reviews across her Las Vegas Valley real estate practice.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-12 col-lg-10"
            aria-live="polite"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <div className="testimonial-carousel">
              <div
                className="card shadow-lg border-0"
                style={{ borderRadius: '12px', overflow: 'hidden' }}
              >
                <div className="card-body p-4 p-md-5" style={{ backgroundColor: '#fff' }}>
                  <div
                    className="text-center mb-3"
                    role="img"
                    aria-label={`${currentTestimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className="text-warning"
                        style={{ fontSize: '1.5rem' }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <blockquote className="blockquote text-center mb-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: '1.15rem',
                        lineHeight: '1.8',
                        color: '#212529',
                      }}
                    >
                      &ldquo;{currentTestimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <div className="text-center">
                    <footer
                      className="blockquote-footer"
                      style={{ fontSize: '0.95rem' }}
                    >
                      <strong style={{ color: '#212529' }}>
                        {currentTestimonial.author}
                      </strong>
                      <span style={{ color: '#6c757d' }}>
                        {' '}
                        &middot; {currentTestimonial.date}
                      </span>
                      <br />
                      <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                        {currentTestimonial.sourceGbp}
                      </span>
                      {currentTestimonial.truncated && !areReviewsDisabled() ? (
                        <>
                          {' '}
                          <a
                            href={reviewsReadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.875rem' }}
                          >
                            Read the full review on Google
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </>
                      ) : null}
                    </footer>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                >
                  &larr; Prev
                </button>
                <div className="d-flex gap-2" role="tablist" aria-label="Choose a testimonial">
                  {testimonials.map((t, index) => (
                    <button
                      key={t.author + t.date}
                      type="button"
                      role="tab"
                      aria-selected={index === currentIndex}
                      className={`btn btn-sm ${
                        index === currentIndex ? 'btn-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Show testimonial ${index + 1} of ${testimonials.length}: ${t.author}`}
                      style={{ width: '12px', height: '12px', padding: 0, borderRadius: '50%' }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                >
                  Next &rarr;
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
                View All Google Reviews
                <span className="sr-only">
                  {' '}
                  for Dr. Jan Duffy on Google Maps (opens in a new tab)
                </span>
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
