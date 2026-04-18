/**
 * Lighthouse CI configuration — local (no CI upload, no GitHub Action).
 *
 * Usage:
 *   yarn lh             # full autorun: starts `yarn preview`, audits 5 URLs x 3 runs, asserts
 *   yarn lh:collect     # just run audits (skip assertions) — use for baselining
 *   yarn lh:assert      # re-run assertions against the most recent .lighthouseci/ results
 *
 * Tuning: all assertions are `warn` initially. After the first real run, tighten
 * the ones you care about to `error` and set `maxNumericValue` to
 * ~10-20% above the observed median (per current web.dev / LHCI docs, April 2026).
 */

module.exports = {
  ci: {
    collect: {
      // Reuse the existing `yarn preview` script, which does `next build && next start -p 3001`.
      // This keeps LHCI in sync with whatever port/flags the repo already uses.
      startServerCommand: 'yarn preview',
      // Next 14 production mode prints lines like `✓ Ready in 820ms` — match the common substring.
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 60000,
      url: [
        'http://localhost:3001/',
        'http://localhost:3001/price-features',
        'http://localhost:3001/towers',
        'http://localhost:3001/agent',
        'http://localhost:3001/available-condos',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        // Skip audits that are noisy / irrelevant for a Next.js marketing site on Vercel:
        skipAudits: ['uses-http2', 'redirects-http'],
        // RealScout + GA + GTM are expected third-party scripts; don't let them dominate
        // the "unused JS" blame without context (we still see the numbers, just not as errors).
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },

    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // --- Category floors (warn-level for the baseline run) ---
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.95 }],

        // --- Core Web Vitals (median over numberOfRuns) ---
        // Targets per web.dev "Good" thresholds as of 2026:
        //   LCP <= 2500ms, CLS <= 0.1, INP <= 200ms (lab proxy: TBT <= 200ms).
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

        // --- Resource budgets (tighten after the first baseline) ---
        'resource-summary:script:size': ['warn', { maxNumericValue: 300000 }],
        'resource-summary:total:size': ['warn', { maxNumericValue: 1500000 }],

        // --- Audits we knowingly don't enforce ---
        // RealScout + BHHS logo are third-party; we can't always hit perfect image policy.
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
      // Local-only: results stay in ./.lighthouseci/ (gitignored).
      // Switch to 'temporary-public-storage' if you want a shareable report URL per run,
      // or stand up an LHCI server for historical trends.
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
