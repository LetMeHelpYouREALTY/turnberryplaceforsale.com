/**
 * Calendly — single source of truth
 * =================================
 *
 * Centralizes all Calendly URLs and URL-builder logic used across the
 * Turnberry Place site. Any component that renders a Calendly button,
 * badge, link, inline widget, or popup trigger should import from this
 * file — NOT hardcode URLs.
 *
 * 2026 best practices applied:
 *
 *   1. **Two slot types, one module.**
 *      - `CALENDLY_TOUR_URL` — 30-min private in-person / video tour
 *        (serious buyers, scheduled with Dr. Jan Duffy).
 *      - `CALENDLY_CONSULTATION_URL` — 15-min discovery conversation
 *        (anyone curious about Turnberry Place — lower commitment,
 *        higher top-of-funnel conversion).
 *
 *   2. **Env override for ops flexibility.**
 *      `NEXT_PUBLIC_CALENDLY_URL` overrides the tour URL per env so QA
 *      / staging can route bookings to a sandbox Calendly account.
 *
 *   3. **Brand-consistent embeds.**
 *      `buildCalendlyUrl()` always appends `primary_color=D4AF37` (site
 *      gold) + `hide_gdpr_banner=1` (Nevada real estate site, no EU
 *      visitor GDPR banner needed, fewer clicks to booking).
 *
 *   4. **UTM attribution.**
 *      Every Calendly link can tag where on the site it was clicked
 *      (`utm_medium=badge|inline|button|link|sticky`) so the
 *      Calendly → FUB webhook carries campaign data into the CRM.
 *      Calendly preserves UTM params into the scheduled-event payload.
 *
 *   5. **Script loading is centralized.**
 *      `<CalendlyBadge />` (in components/layout.tsx) loads
 *      `widget.js` ONCE per page via next/script. Every other Calendly
 *      component (`<CalendlyEmbed />`, `<CalendlyButton />`,
 *      `<CalendlyLink />`) reuses the resulting `window.Calendly`
 *      object — no duplicate <script> tags, no race conditions.
 *
 *   6. **No hardcoded URLs in UI code.**
 *      Import `CALENDLY_TOUR_URL` / `CALENDLY_CONSULTATION_URL` or call
 *      `buildCalendlyUrl()` — never paste `https://calendly.com/...`
 *      literally into a component file.
 */

// ---------------------------------------------------------------------------
// 1. Base URLs
// ---------------------------------------------------------------------------

/** 30-minute private tour (the default "Schedule a Tour" CTA site-wide). */
export const CALENDLY_TOUR_URL: string =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  'https://calendly.com/drjanduffy/1-home-tour-30-mins'

/** 15-minute conversation ("Schedule time with me" top-of-funnel CTA). */
export const CALENDLY_CONSULTATION_URL: string =
  process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL ??
  'https://calendly.com/drjanduffy/dr-duffy-private-15-min-conversation'

// ---------------------------------------------------------------------------
// 2. Brand + behavior defaults applied to every Calendly URL
// ---------------------------------------------------------------------------

/** Site brand gold (matches --luxury-gold CSS var + button palette). */
const BRAND_PRIMARY_COLOR_HEX = 'D4AF37'

type UtmMedium =
  | 'badge'    // floating site-wide badge
  | 'inline'   // inline widget embed
  | 'button'   // button → popup
  | 'link'     // inline text link → popup
  | 'sticky'   // mobile sticky CTA bar
  | 'footer'   // footer link
  | 'cta'      // generic CTA (directions-contact-cta, towers-cta, etc.)

type BuildCalendlyUrlOpts = {
  /** Add UTM parameters so Calendly → FUB events carry click-location metadata. */
  utmMedium?: UtmMedium
  /** Override utm_campaign. Defaults to the year-month so campaigns chunk monthly. */
  utmCampaign?: string
  /** Override the Calendly primary color. Defaults to site gold. */
  primaryColor?: string
  /** Keep the GDPR banner (default: hidden — Nevada market, no EU visitors expected). */
  showGdprBanner?: boolean
}

/**
 * Append best-practice query params to a Calendly URL so that every
 * embed/link on the site looks and behaves consistently:
 *   - hide_gdpr_banner=1   (US-only audience)
 *   - primary_color=D4AF37 (site brand gold)
 *   - utm_source=website
 *   - utm_medium=[badge|inline|button|link|sticky|footer|cta]
 *   - utm_campaign=[yyyy-mm or operator-provided]
 *
 * Existing params on the input URL are preserved; any keys we set are
 * overwritten so callers can't accidentally disable branding.
 */
export function buildCalendlyUrl(
  baseUrl: string,
  opts: BuildCalendlyUrlOpts = {},
): string {
  const {
    utmMedium,
    utmCampaign,
    primaryColor = BRAND_PRIMARY_COLOR_HEX,
    showGdprBanner = false,
  } = opts

  const [pathPart, queryPart = ''] = baseUrl.split('?')
  const params = new URLSearchParams(queryPart)

  params.set('primary_color', primaryColor)
  if (!showGdprBanner) params.set('hide_gdpr_banner', '1')

  if (utmMedium) {
    params.set('utm_source', 'website')
    params.set('utm_medium', utmMedium)
    const campaign = utmCampaign ?? defaultCampaign()
    if (campaign) params.set('utm_campaign', campaign)
  }

  return `${pathPart}?${params.toString()}`
}

/** yyyy-mm fallback, e.g. "2026-04". Quiet failure to empty string in SSR. */
function defaultCampaign(): string {
  try {
    const now = new Date()
    const y = now.getUTCFullYear()
    const m = String(now.getUTCMonth() + 1).padStart(2, '0')
    return `${y}-${m}`
  } catch {
    return ''
  }
}

// ---------------------------------------------------------------------------
// 3. Convenience wrappers for the two canonical flows
// ---------------------------------------------------------------------------

/** 30-minute private tour URL with brand + UTM applied. */
export function tourUrl(opts?: BuildCalendlyUrlOpts): string {
  return buildCalendlyUrl(CALENDLY_TOUR_URL, opts)
}

/** 15-minute conversation URL with brand + UTM applied. */
export function consultationUrl(opts?: BuildCalendlyUrlOpts): string {
  return buildCalendlyUrl(CALENDLY_CONSULTATION_URL, opts)
}
