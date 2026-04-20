/**
 * Single source for internal routes shown in global chrome (header rows, mobile menu,
 * footer grids). Keeps labels, hrefs, and optional `linkTitle` tooltips aligned.
 *
 * Internal navigation (2026): use `next/link` `Link` for same-site routes — one `<a>`
 * per link (do not nest `<a>` inside `Link`). Prefer descriptive visible anchor text and
 * optional `title` / `linkTitle` for context; use plain `<a href="tel:">` / `mailto:` /
 * external URLs with `rel="noopener noreferrer"` when `target="_blank"`.
 */

export type SiteInternalLink = {
  href: string
  title: string
  /** Shown as HTML `title` on anchors where the visible label is short. */
  linkTitle?: string
}

function L(
  href: string,
  title: string,
  linkTitle?: string,
): SiteInternalLink {
  return linkTitle ? { href, title, linkTitle } : { href, title }
}

/** Desktop header — top row (left → right). */
export const SITE_NAV_DESKTOP_ROW1: SiteInternalLink[] = [
  L('/', 'Home', 'Turnberry Place Las Vegas — home'),
  L('/price-features', 'Price & Features', 'Turnberry Place pricing and luxury condo features'),
  L('/towers', 'Towers', 'Turnberry Place towers — floor counts and residence overview'),
  L('/amenities', 'Amenities', 'Turnberry Place amenities and resort-style living'),
  L('/photos', 'Photos', 'Turnberry Place photo gallery — views, residences, Stirling Club'),
  L('/map', 'Map', 'Neighborhood map — dining, Strip access, and points of interest'),
  L('/open-house', 'Open House', 'Schedule a private showing at Turnberry Place'),
  L('/request-details', 'Request Details', 'Request Turnberry Place pricing and listing details'),
  L('/agent', 'Agent', 'Dr. Jan Duffy — Turnberry Place REALTOR'),
]

/** Desktop header — second row. */
export const SITE_NAV_DESKTOP_ROW2: SiteInternalLink[] = [
  L('/available-condos', 'Available Condos', 'Luxury high-rise condos for sale at Turnberry Place'),
  L('/floor-plans', 'Floor Plans', 'Turnberry Place floor plans and layouts'),
  L('/share', 'Share', 'Share Turnberry Place listings'),
  L('/stirling-club', 'Stirling Club', 'The Stirling Club — private amenities for residents'),
  L('/neighborhood', 'Neighborhood', 'Las Vegas Strip and Paradise corridor — neighborhood guide'),
  L('/mls', 'MLS', 'MLS listing data, IDX disclaimers, and compliance'),
]

/**
 * Footer site-link grids + mobile slide-out menu — one ordered list (includes `/mls`).
 * Order is crawl-friendly: primary funnels first, then discovery, then compliance.
 */
export const SITE_INTERNAL_LINKS_FLAT: SiteInternalLink[] = [
  L('/', 'Home', 'Turnberry Place Las Vegas — home'),
  L('/available-condos', 'Available Condos', 'Luxury high-rise condos for sale at Turnberry Place'),
  L('/floor-plans', 'Floor Plans', 'Turnberry Place floor plans and layouts'),
  L('/towers', 'Towers', 'Turnberry Place towers overview'),
  L('/price-features', 'Price & Features', 'Pricing and features — Turnberry Place'),
  L('/amenities', 'Amenities', 'Amenities at Turnberry Place Las Vegas'),
  L('/stirling-club', 'Stirling Club', 'The Stirling Club for Turnberry Place residents'),
  L('/neighborhood', 'Neighborhood', 'Neighborhood — Las Vegas Strip and Paradise Rd'),
  L('/photos', 'Photos', 'Photo gallery — Turnberry Place high-rise condos'),
  L('/map', 'Map', 'Interactive map — Turnberry Place and nearby venues'),
  L('/mls', 'MLS', 'MLS listing data, IDX disclaimers, and compliance'),
  L('/open-house', 'Open House', 'Open houses and private showings'),
  L('/request-details', 'Request Details', 'Request listing details and pricing'),
  L('/agent', 'Agent', 'Dr. Jan Duffy — your Turnberry Place REALTOR'),
  L('/share', 'Share', 'Share Turnberry Place listings'),
]
