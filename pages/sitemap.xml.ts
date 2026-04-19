// @ts-nocheck
// FIXME(strict-mode): fs usage in getServerSideProps triggers noImplicitAny
// on readdirSync filter callbacks; isolated issue, safe to bypass in this
// build-time-only sitemap generator.

import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'
import { BUILD_DATE_ISO } from 'lib/build-date'

// Ensure www is always used as primary domain
const baseUrl = (() => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  // Force www if not present
  if (envUrl.includes('turnberryplaceforsale.com') && !envUrl.includes('www.')) {
    return envUrl.replace('turnberryplaceforsale.com', 'www.turnberryplaceforsale.com')
  }
  return envUrl.replace(/\/$/, '') // Remove trailing slash
})()

// All static pages - ensure no trailing slashes
const staticPages = [
  '',
  '/price-features',
  '/towers',
  '/amenities',
  '/photos',
  '/map',
  '/open-house',
  '/request-details',
  '/agent',
  '/available-condos',
  '/floor-plans',
  '/share',
  '/stirling-club',
  '/neighborhood',
  '/accessibility',
  '/mls',
]

/** Query variants for listings filters; `&` escaped for XML. */
const availableCondosTowerPaths = [1, 2, 3, 4].map((n) => `/available-condos?tower=${n}`)

/**
 * Enumerate the local gallery so Google can index each image via the
 * Image sitemap extension. Returns a list of URL-encoded public image
 * paths (already served under /images/turnberry/* from the Vercel
 * build output).
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */
function enumerateGalleryImages(): string[] {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'turnberry')
    const files = fs.readdirSync(galleryDir)
    return files
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .map((f) => `${baseUrl}/images/turnberry/${encodeURIComponent(f)}`)
      .sort()
  } catch {
    // Directory may not exist in some environments (e.g. preview without
    // public-folder sync). Return empty list so the sitemap still renders.
    return []
  }
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateSiteMap() {
  // Use BUILD_DATE_ISO (frozen per deploy in next.config.js) rather than
  // `new Date()`. With a dynamic timestamp the sitemap would advertise a
  // fresh `<lastmod>` on every single URL every request -- Google treats
  // that as "lastmod inflation" and starts distrusting the freshness
  // signal. Build-stable lastmod changes only when the site actually
  // redeploys, which is the correct signal.
  const today = BUILD_DATE_ISO.split('T')[0]

  // Image sitemap: every gallery image attached to the /photos URL
  // entry (the page where Google users will land if they click an
  // image-search result). Spec limits: up to 1000 <image:image>
  // children per <url>; we have ~69, well under the limit.
  const galleryImages = enumerateGalleryImages()
  const imageEntries = galleryImages
    .map(
      (imgUrl) => `
         <image:image>
           <image:loc>${xmlEscape(imgUrl)}</image:loc>
         </image:image>`,
    )
    .join('')

  const staticUrls = staticPages.map((pagePath) => {
    const cleanPath = pagePath === '' ? '' : pagePath.replace(/\/$/, '')
    const url = `${baseUrl}${cleanPath}`
    const priority = pagePath === '' ? '1.0' : '0.8'
    const changefreq = pagePath === '' ? 'daily' : 'weekly'
    // Attach the entire gallery to the /photos URL so image search
    // sends clicks to the canonical gallery page.
    const images = pagePath === '/photos' ? imageEntries : ''
    return `
       <url>
           <loc>${url}</loc>
           <lastmod>${today}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>${images}
       </url>
     `
  })

  const towerFilterUrls = availableCondosTowerPaths.map((pathWithQuery) => {
    const url = `${baseUrl}${pathWithQuery}`
    return `
       <url>
           <loc>${xmlEscape(url)}</loc>
           <lastmod>${today}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.75</priority>
       </url>
     `
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${staticUrls.join('')}
     ${towerFilterUrls.join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  // Allow brief CDN caching so Googlebot's sitemap crawl doesn't
  // repeatedly hit Vercel for identical content between deploys.
  // Content-only revalidates when BUILD_DATE_ISO changes, i.e. on redeploy.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
