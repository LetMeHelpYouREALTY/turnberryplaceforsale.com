/**
 * Next.js Configuration
 * Built with Cursor AI, deployed on Vercel, version controlled on GitHub
 */

function getImageDomain() {
  if (process.env.NEXT_IMAGE_DOMAIN) {
    return [process.env.NEXT_IMAGE_DOMAIN]
  }
  if (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)
      return [url.hostname]
    } catch {
      // Invalid URL, return empty array
    }
  }
  return []
}

// Freeze "last updated" / "updated" display dates at build time so server SSR
// and client hydration always resolve to the same string. Without this,
// `new Date()` inside a rendered component would be evaluated once on Vercel
// (in UTC, at request time) and again in the visitor's browser (in their local
// timezone), producing different strings and triggering React #425 (text
// content mismatch) + #423 (bail out to client-only render). Both errors were
// firing on every route in production Lighthouse before this change.
// Timezone pinned to America/Los_Angeles (site's operating market — Las Vegas).
const BUILD_NOW = new Date()
const TZ = 'America/Los_Angeles'
const BUILD_DATE_ISO = BUILD_NOW.toISOString()
const BUILD_DATE_DISPLAY = BUILD_NOW.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: TZ,
})
const BUILD_DATE_MONTH_YEAR = BUILD_NOW.toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: TZ,
})

module.exports = {
  env: {
    NEXT_PUBLIC_BUILD_DATE_ISO: BUILD_DATE_ISO,
    NEXT_PUBLIC_BUILD_DATE_DISPLAY: BUILD_DATE_DISPLAY,
    NEXT_PUBLIC_BUILD_DATE_MONTH_YEAR: BUILD_DATE_MONTH_YEAR,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  images: {
    domains: getImageDomain(),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos.cribflyer-proxy.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.cribflyer-proxy.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Encourage long CDN caching for optimized images.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    // Content-Security-Policy for the whole site.
    //
    // Allowlist covers every third-party the site actually embeds:
    //   - RealScout (PRIMARY conversion): em.realscout.com (script host) +
    //     www.realscout.com (API host). BOTH are required; missing either
    //     causes the widget to fail silently (empty shell, console warning).
    //   - Calendly (secondary conversion): assets.calendly.com + calendly.com.
    //   - Google Maps (iframe embed): www.google.com (frame) +
    //     maps.googleapis.com + maps.gstatic.com (JS API + tiles).
    //   - Google Analytics + Google Ads + Tag Manager.
    //   - Vercel Analytics + Speed Insights: *.vercel-analytics.com +
    //     *.vercel-insights.com + vercel.live.
    //   - Calendly iframe popup: calendly.com + assets.calendly.com.
    //   - Fonts from Google Fonts (next/font/google self-hosts at build
    //     time, so only fonts.gstatic.com for fallback).
    //
    // `unsafe-inline` + `unsafe-eval` are required for Next.js's
    // hydration shim, Calendly widget initialization, and Google
    // Tag Manager. When Next.js ships stable CSP nonce support in a
    // future major, revisit to remove `unsafe-inline` from script-src.
    const CSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
        "https://em.realscout.com https://www.realscout.com " +
        "https://assets.calendly.com " +
        "https://maps.googleapis.com " +
        "https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net " +
        "https://va.vercel-scripts.com https://vercel.live",
      "connect-src 'self' " +
        "https://em.realscout.com https://www.realscout.com " +
        "https://calendly.com https://assets.calendly.com " +
        "https://maps.googleapis.com " +
        "https://www.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net " +
        "https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
      "frame-src 'self' " +
        "https://em.realscout.com https://www.realscout.com " +
        "https://calendly.com https://assets.calendly.com " +
        "https://www.google.com " +
        "https://vercel.live",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
      "media-src 'self' blob: https://*.vimeocdn.com https://player.vimeo.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://calendly.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ')

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: CSP },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
      },
    ]

    return [
      {
        // Baseline security + CSP for every route
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Strong caching for locally hosted gallery images
        source: '/images/turnberry/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Redirect old/legacy routes to current pages (301 permanent redirects)
      {
        source: '/ap',
        destination: '/agent',
        permanent: true,
      },
      {
        source: '/lc',
        destination: '/available-condos',
        permanent: true,
      },
      {
        source: '/tour',
        destination: '/available-condos',
        permanent: true,
      },
      {
        source: '/tour/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/ub',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ub/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/accessibility',
        permanent: true,
      },
      // Redirect old property address pages to map page
      {
        source: '/2877-paradise-rd',
        destination: '/map',
        permanent: true,
      },
      // Redirect old API/legacy routes
      {
        source: '/visit-api',
        destination: '/available-condos',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/blog/page/0",
      },
      {
        source: "/es",
        destination: "/es/home",
        locale: false,
      },
      {
        source: "/en/principal",
        destination: "/",
        locale: false,
      },
    ]
  },
}
