"use client"

/**
 * @deprecated 2026-04-18
 *
 * ORPHANED component. Removed from /agent on 2026-04-18 — the site's
 * single conversion path is the Calendly booking widget (via
 * <CalendlySection />). Do NOT re-import.
 */

import { useState } from "react"

const GOLD = "#D4AF37"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim()) return setError("Email is required.")
    if (!isValidEmail(email.trim())) return setError("Please enter a valid email address.")

    setStatus("submitting")
    try {
      // Reuse existing lead endpoint for now (keeps infra simple).
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "VIP List Signup",
          email: email.trim(),
          message: "VIP signup: Get Exclusive Turnberry Listings First",
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="bg-gray-900 py-16 lg:py-24 text-white" aria-label="VIP newsletter signup">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-serif">
              Get Exclusive Turnberry Listings First
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Join insiders who see new listings before they hit the market.
            </p>

            {status === "success" ? (
              <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5">
                <div className="font-semibold" style={{ color: GOLD }}>
                  You’re on the list.
                </div>
                <div className="mt-1 text-white/80 text-sm">Unsubscribe anytime.</div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                <label className="sr-only" htmlFor="agent-vip-email">
                  Email
                </label>
                <input
                  id="agent-vip-email"
                  type="email"
                  className="flex-1 rounded-full border border-white/15 bg-black/30 px-5 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2"
                  style={{ outlineColor: GOLD }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                />
                <button
                  type="submit"
                  className="rounded-full px-6 py-3 font-bold text-gray-900 disabled:opacity-60"
                  style={{ backgroundColor: GOLD }}
                  disabled={status === "submitting"}
                  aria-label="Join the VIP list"
                  data-cta="agent-vip-join"
                >
                  {status === "submitting" ? "Joining…" : "Join the VIP List"}
                </button>
              </form>
            )}

            {error ? (
              <div className="mt-3 text-sm text-red-300" role="alert">
                {error}
              </div>
            ) : null}

            <p className="mt-4 text-sm text-white/70">Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

