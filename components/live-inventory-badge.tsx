'use client'

import React from "react"

interface LiveInventoryBadgeProps {
  count: number
  source: "realscout" | "fallback"
  lastUpdatedIso: string
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export function LiveInventoryBadge({
  count,
  source,
  lastUpdatedIso,
}: LiveInventoryBadgeProps) {
  const parsed = new Date(lastUpdatedIso)
  const isValidDate = !Number.isNaN(parsed.getTime())
  const lastUpdated = isValidDate ? parsed : new Date()
  const freshnessHours = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60)
  const isFresh = freshnessHours <= 24

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
