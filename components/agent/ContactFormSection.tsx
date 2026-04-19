'use client'

/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. The site's single conversion path is the Calendly
 * booking widget (components/calendly-embed.tsx + components/agent/CalendlySection).
 * Do NOT re-import.
 */

import { useMemo, useState } from "react"

const GOLD = "#D4AF37"

type InterestedIn = "Buying" | "Selling" | "Both" | "Just Exploring"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function ContactFormSection() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/drjanduffy/1-home-tour-30-mins"

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [interestedIn, setInterestedIn] = useState<InterestedIn>("Buying")
  const [message, setMessage] = useState("")

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string>("")

  const composedMessage = useMemo(() => {
    const parts = [
      `Agent page lead`,
      `Interested in: ${interestedIn}`,
      `Phone: ${phone}`,
      message ? `Message: ${message}` : "",
    ].filter(Boolean)
    return parts.join("\n")
  }, [interestedIn, phone, message])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) return setError("Name is required.")
    if (!phone.trim()) return setError("Phone is required.")
    if (!email.trim()) return setError("Email is required.")
    if (!isValidEmail(email.trim())) return setError("Please enter a valid email address.")

    setStatus("submitting")
    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: composedMessage,
        }),
      })

      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setName("")
      setPhone("")
      setEmail("")
      setInterestedIn("Buying")
      setMessage("")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again or call (702) 500-1971.")
    }
  }

  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Contact form">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              Send a Quick Message
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Tell me what you’re looking for and I’ll respond quickly — I live at Turnberry Place.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+17025001971"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-gray-900 shadow-sm"
                style={{ backgroundColor: GOLD }}
                aria-label="Call (702) 500-1971"
              >
                Call (702) 500-1971
              </a>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 font-bold text-gray-900 hover:bg-gray-50"
                style={{ borderColor: "rgba(17, 24, 39, 0.2)" }}
              >
                Schedule Tour
                <span className="sr-only"> (opens Calendly in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm">
            {status === "success" ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-900">
                <div className="font-semibold">Message sent.</div>
                <div className="mt-1 text-sm">
                  Thank you — I’ll respond within 2 hours. If you need immediate help, call{" "}
                  <a className="underline font-semibold" href="tel:+17025001971">
                    (702) 500-1971
                  </a>
                  .
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="agent-name">
                    Name *
                  </label>
                  <input
                    id="agent-name"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    style={{ outlineColor: GOLD }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="agent-phone">
                    Phone *
                  </label>
                  <input
                    id="agent-phone"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="agent-email">
                    Email *
                  </label>
                  <input
                    id="agent-email"
                    type="email"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="agent-interest">
                    Interested in
                  </label>
                  <select
                    id="agent-interest"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    value={interestedIn}
                    onChange={(e) => setInterestedIn(e.target.value as InterestedIn)}
                  >
                    <option>Buying</option>
                    <option>Selling</option>
                    <option>Both</option>
                    <option>Just Exploring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="agent-message">
                    Message (optional)
                  </label>
                  <textarea
                    id="agent-message"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What tower/view are you interested in?"
                  />
                </div>

                {error ? (
                  <div className="text-sm text-red-600" role="alert">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="w-full rounded-full px-6 py-3 font-bold text-gray-900 shadow-sm disabled:opacity-60"
                  style={{ backgroundColor: GOLD }}
                  disabled={status === "submitting"}
                  aria-label="Send message"
                  data-cta="agent-form-submit"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  Your information is confidential and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

