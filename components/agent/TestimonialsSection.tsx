'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const GOLD = "#D4AF37"

type Testimonial = {
  quote: string
  author: string
  role: "Buyer" | "Seller"
  towerNote: string
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        quote: "Her knowledge of the towers helped us find the perfect unit — the view, the light, everything.",
        author: "Buyer",
        role: "Buyer",
        towerNote: "Turnberry Place buyer",
      },
      {
        quote: "Having an agent who lives in the building made all the difference. Questions were answered immediately.",
        author: "Buyer",
        role: "Buyer",
        towerNote: "Turnberry Place neighbor-client",
      },
      {
        quote: "Jan sold our condo in 3 weeks because she knows every sale and what buyers are really looking for.",
        author: "Seller",
        role: "Seller",
        towerNote: "Turnberry Place seller",
      },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [testimonials.length])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
            Clients Choose a Neighbor Advantage
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Fast answers. Better decisions. Smoother transactions.
          </p>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 md:p-10 relative">
            <div
              className="flex items-center justify-center gap-1"
              role="img"
              aria-label="5 star rating"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" style={{ color: GOLD }} fill={GOLD} aria-hidden="true" />
              ))}
            </div>

            <blockquote className="mt-6 text-center text-xl md:text-2xl text-gray-900 leading-relaxed">
              “{current.quote}”
            </blockquote>

            <div className="mt-6 text-center">
              <div className="font-semibold text-gray-900">{current.author}</div>
              <div className="text-sm text-gray-600">
                {current.role} • {current.towerNote}
              </div>
            </div>

            {/* Pagination dots: visible dot stays 10px for brand aesthetic,
                but the <button> hit area expands to 24x24 via padding so we
                meet WCAG 2.5.8 AA (target size). bg-transparent on the button
                keeps the color on the inner span only. */}
            <div className="mt-8 flex items-center justify-center gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-2 rounded-full bg-transparent border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: GOLD }}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={
                      i === index
                        ? "block h-2.5 w-8 rounded-full"
                        : "block h-2.5 w-2.5 rounded-full"
                    }
                    style={{
                      backgroundColor: i === index ? GOLD : "rgba(17, 24, 39, 0.3)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: GOLD }}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: GOLD }}
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="https://www.google.com/search?q=Turnberry+Place+Las+Vegas+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
              style={{ borderColor: "rgba(212, 175, 55, 0.45)" }}
            >
              View Google Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

