/**
 * Lighthouse CI configuration — production (deployed) audit.
 *
 * Runs Lighthouse against the live site on Vercel, bypassing the
 * local `next start` server. Use this for:
 *   - a true Best-Practices score (no local-only /_vercel/* 404s)
 *   - real Vercel CDN caching, compression, HTTP/2/3 behavior
 *   - CSP + security header enforcement as production delivers it
 *
 * Usage:
 *   yarn lh:prod                       # audits default production URLs
 *   LH_PROD_BASE=https://preview-abc123.vercel.app yarn lh:prod
 *                                      # override base URL (e.g. a Vercel preview deploy)
 *
 * Notes:
 *   - No `startServerCommand` — we audit what's already deployed.
 *   - Fewer runs (2) to stay polite with upstream origin and keep runtime short.
 *   - Assertions are `warn`-only here; production perf can be noisier than
 *     a controlled local build (CDN cold caches, shared runners, Google Ads
 *     3p-cookie audit, etc.). Flip to 'error' once you have a stable median.
 */

const base = (process.env.LH_PROD_BASE || 'https://www.turnberryplaceforsale.com').replace(/\/$/, '');

module.exports = {
  ci: {
    collect: {
      url: [
        `${base}/`,
        `${base}/price-features`,
        `${base}/towers`,
        `${base}/agent`,
        `${base}/available-condos`,
      ],
      numberOfRuns: 2,
      settings: {
        preset: 'desktop',
        // Skip audits that don't make sense for a public HTTPS marketing site
        // audited from a remote client:
        skipAudits: ['uses-http2', 'redirects-http'],
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },

    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // --- Category floors ---
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.95 }],

        // --- Core Web Vitals (median) ---
        // Per web.dev "Good" thresholds (2026): LCP <=2500, CLS <=0.1,
        // INP <=200ms (lab proxy: TBT <=200ms). Slightly looser here to
        // tolerate CDN cold-start and variable remote network conditions.
        'largest-contentful-paint': [
          'warn',
          { maxNumericValue: 2500, aggregationMethod: 'median' },
        ],
        'cumulative-layout-shift': [
          'warn',
          { maxNumericValue: 0.1, aggregationMethod: 'median' },
        ],
        'total-blocking-time': [
          'warn',
          { maxNumericValue: 300, aggregationMethod: 'median' },
        ],
        'first-contentful-paint': [
          'warn',
          { maxNumericValue: 1800, aggregationMethod: 'median' },
        ],
        'speed-index': [
          'warn',
          { maxNumericValue: 3400, aggregationMethod: 'median' },
        ],

        // --- Audits we knowingly don't enforce ---
        // Google Ads conversion pixel sets a 3rd-party cookie (test_cookie).
        // This is expected until Google Ads ships a cookieless alternative.
        'third-party-cookies': 'off',
        // RealScout + BHHS logo are 3p; can't always satisfy image-format audits.
        'uses-responsive-images': 'off',
        'offscreen-images': 'off',
        // PWA audits don't apply to this marketing site.
        'installable-manifest': 'off',
        'service-worker': 'off',
        'maskable-icon': 'off',
        'apple-touch-icon': 'off',
        'splash-screen': 'off',
        'themed-omnibox': 'off',
        'content-width': 'off',
        'viewport': 'off',
      },
    },

    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci-prod',
    },
  },
};
