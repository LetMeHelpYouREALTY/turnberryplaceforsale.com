/**
 * IndexNow endpoint — notify Bing / Yandex / Seznam / Naver that
 * site URLs have changed. Google deprecated sitemap-ping in 2023
 * and does NOT support IndexNow; Google relies on sitemap `<lastmod>`
 * + its own crawl schedule instead. Submitting to IndexNow is
 * harmless for Google and beneficial for other search engines.
 *
 * Usage:
 *
 *   1. Manual trigger (after deploy):
 *      curl -X POST "https://www.turnberryplaceforsale.com/api/indexnow" \
 *           -H "Authorization: Bearer $INDEXNOW_AUTH_TOKEN"
 *
 *   2. GitHub Actions post-deploy step (recommended):
 *      - name: Ping IndexNow
 *        run: curl -X POST "$SITE_URL/api/indexnow" -H "Authorization: Bearer $INDEXNOW_AUTH_TOKEN"
 *
 *   3. Submit specific URLs (e.g. after content edit):
 *      POST body: { "urls": ["https://www.turnberryplaceforsale.com/stirling-club"] }
 *
 *   4. Omit body: submits the full sitemap URL list automatically.
 *
 * Key file (required by IndexNow spec) is served at:
 *   https://www.turnberryplaceforsale.com/010c743a9eb84ab3bc92cce5d7a4452e.txt
 *
 * @see https://www.indexnow.org/documentation
 */

import type { NextApiRequest, NextApiResponse } from 'next'

const INDEXNOW_KEY = '010c743a9eb84ab3bc92cce5d7a4452e'

// Canonical host (no protocol, matches IndexNow spec).
const HOST = 'www.turnberryplaceforsale.com'

const BASE_URL = `https://${HOST}`

const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`

// IndexNow-compatible search engines. Submitting to any ONE of these
// relays to the others in the IndexNow network, but submitting to
// multiple primaries gives stronger delivery guarantees.
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
]

/** The same static-page list used by `pages/sitemap.xml.ts`. */
const STATIC_PATHS = [
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

function defaultUrlList(): string[] {
  return STATIC_PATHS.map((p) => `${BASE_URL}${p}`)
}

function isValidUrlList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === 'string' && v.startsWith(BASE_URL),
    )
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Require a bearer token so the endpoint can't be abused to spam
  // IndexNow with junk URL lists. Set INDEXNOW_AUTH_TOKEN in Vercel
  // env (any sufficiently random string; rotate if ever leaked).
  const expected = process.env.INDEXNOW_AUTH_TOKEN
  if (!expected) {
    return res
      .status(503)
      .json({ error: 'INDEXNOW_AUTH_TOKEN not set on server' })
  }
  const provided = req.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const body = req.body ?? {}
  const urls = isValidUrlList(body.urls) ? body.urls : defaultUrlList()

  if (urls.length === 0) {
    return res.status(400).json({ error: 'No URLs to submit' })
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  const results: Array<{ endpoint: string; status: number | string; ok: boolean }> = []

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      results.push({ endpoint, status: r.status, ok: r.ok })
    } catch (err) {
      results.push({
        endpoint,
        status: 'error',
        ok: false,
      })
    }
  }

  return res.status(200).json({
    submitted: urls.length,
    results,
  })
}
