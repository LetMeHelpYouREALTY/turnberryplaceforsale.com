export interface TurnberryInventory {
  count: number
  priceRange: { low: number; high: number }
  lastUpdated: Date
  source: "realscout" | "fallback"
}

const REALSCOUT_SHARED_SEARCH_URL =
  "https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay00MDE0"

const FALLBACK_INVENTORY: TurnberryInventory = {
  count: 12,
  priceRange: { low: 800000, high: 10000000 },
  lastUpdated: new Date(),
  source: "fallback",
}

function parseCountFromHtml(html: string): number | null {
  const patterns = [
    /([0-9]{1,4})\s+(?:results|listings|properties|homes)\b/i,
    /\b(?:results|listings|properties|homes)\s*[:\-]?\s*([0-9]{1,4})\b/i,
    /"total"\s*:\s*([0-9]{1,4})/i,
    /"totalCount"\s*:\s*([0-9]{1,4})/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) {
      const parsed = Number(match[1])
      if (Number.isFinite(parsed) && parsed > 0) {
        return parsed
      }
    }
  }

  return null
}

function parsePriceRangeFromHtml(html: string): { low: number; high: number } | null {
  const priceMatches = Array.from(html.matchAll(/\$([0-9][0-9,]{2,})/g))
    .map((match) => Number(match[1].replace(/,/g, "")))
    .filter((value) => Number.isFinite(value) && value >= 100000)

  if (priceMatches.length === 0) return null

  return {
    low: Math.min(...priceMatches),
    high: Math.max(...priceMatches),
  }
}

function fallbackWithWarning(reason: string): TurnberryInventory {
  console.warn(`[inventory] Falling back to static Turnberry inventory: ${reason}`)
  return {
    ...FALLBACK_INVENTORY,
    lastUpdated: new Date(),
  }
}

export async function getTurnberryInventory(): Promise<TurnberryInventory> {
  try {
    const response = await fetch(REALSCOUT_SHARED_SEARCH_URL, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; TurnberryPlaceInventoryBot/1.0; +https://www.turnberryplaceforsale.com)",
      },
      // Keep fresh enough for inventory changes, but resilient.
      ...( { next: { revalidate: 3600 } } as any),
    })

    if (!response.ok) {
      return fallbackWithWarning(`RealScout returned HTTP ${response.status}`)
    }

    const html = await response.text()
    if (!html || html.length < 100) {
      return fallbackWithWarning("RealScout response body was empty/too short")
    }

    const count = parseCountFromHtml(html)
    if (!count || count <= 0) {
      return fallbackWithWarning("Could not parse listing count from RealScout HTML")
    }

    const parsedRange = parsePriceRangeFromHtml(html)
    const priceRange = parsedRange ?? FALLBACK_INVENTORY.priceRange

    return {
      count,
      priceRange,
      lastUpdated: new Date(),
      source: "realscout",
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error"
    return fallbackWithWarning(message)
  }
}
