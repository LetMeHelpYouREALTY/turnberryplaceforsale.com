'use client'

import React, { useEffect, useState } from "react"

interface LiveInventoryBadgeProps {
  count: number
  source: "realscout" | "fallback"
  lastUpdatedIso: string
}

function formatMonthYear(date: Date) {
  // Pin timezone so server + client "Month Year" always matches. Even with a
  // stable `lastUpdatedIso`, the default renderer uses the runtime TZ, which
  // differs between Vercel (UTC) and a PT visitor around month boundaries.
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })
}

export function LiveInventoryBadge({
  count,
  source,
  lastUpdatedIso,
}: LiveInventoryBadgeProps) {
  const parsed = new Date(lastUpdatedIso)
  const isValidDate = !Number.isNaN(parsed.getTime())
  // Use a deterministic fallback instead of `new Date()` so SSR and hydration
  // resolve to the same Date instance when `lastUpdatedIso` is absent.
  const lastUpdated = isValidDate ? parsed : new Date(0)

  // Freshness depends on `Date.now()`, which drifts between the SSR request and
  // the client hydration (timezone + seconds of latency). Defer the visual
  // freshness indicator to after mount so the server renders the "stale" color
  // and the client upgrades it without a text/attribute mismatch.
  const [isFresh, setIsFresh] = useState(false)
  useEffect(() => {
    if (!isValidDate) {
      setIsFresh(false)
      return
    }
    const freshnessHours =
      (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60)
    setIsFresh(freshnessHours <= 24)
  }, [isValidDate, lastUpdated])

  return (
    <span className="d-inline-flex align-items-center" style={{ gap: "0.45rem" }}>
      <span
        aria-hidden="true"
        style={{
          width: "0.55rem",
          height: "0.55rem",
          borderRadius: "999px",
          backgroundColor: isFresh ? "#22c55e" : "#9ca3af",
          boxShadow: "0 0 0 2px rgba(255,255,255,0.25)",
          flexShrink: 0,
        }}
      />
      {source === "fallback"
        ? "12+ Luxury Residences Available"
        : `Only ${count} Units Available Now · Updated ${formatMonthYear(lastUpdated)}`}
    </span>
  )
}
