# Google Search Console setup — Turnberry Place

One-page checklist for preparing and operating this site in Google
Search Console (GSC). Companion to `NAP_EMAIL_AUDIT_REPORT.md` (NAP
canonical values) and the portfolio rules at
`C:\Users\geneb\.cursor\rules\global-portfolio-gbp-mission.mdc`.

---

## 0. What's already in the code (no action required)

| Artifact | Location | Status |
|---|---|---|
| Dynamic `/sitemap.xml` | `pages/sitemap.xml.ts` | 20 URLs + **image sitemap** entries for 69 gallery photos; build-stable `<lastmod>`; `www`-forced canonical |
| `robots.txt` | `public/robots.txt` | Allows Googlebot + Bingbot + AI crawlers; disallows `/api/`, `/admin/`; references sitemap |
| Meta `robots` tag (global) | `pages/_document.tsx` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| GSC verification meta tag | `pages/_document.tsx` | Env-gated via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| Canonical URLs | `components/meta.tsx` | Per-page, `www`-forced, trailing-slash-normalized |
| `hreflang` (en, es, x-default) | `components/meta.tsx` | Per-page |
| JSON-LD (RealEstateAgent, ApartmentComplex, Organization, FAQPage, BreadcrumbList) | `lib/schema/*.ts` + `components/json-ld-schema.tsx` | Per-page, unique NAP |
| OG + Twitter Card | `components/meta.tsx` | Per-page |
| HTTPS | Vercel (automatic) | Always-on, HSTS enabled |
| Core Web Vitals telemetry | `@vercel/speed-insights` | Running on every page |
| Custom `404.tsx` | `pages/404.tsx` | Returns HTTP 404 (Next.js default) |
| `.well-known/security.txt` | `public/.well-known/security.txt` | RFC 9116 |
| IndexNow key file | `public/010c743a9eb84ab3bc92cce5d7a4452e.txt` | Verifies ownership for Bing/Yandex notification |
| IndexNow ping endpoint | `pages/api/indexnow.ts` | `POST /api/indexnow` (Bearer-token gated) |

---

## 1. One-time GSC dashboard setup (~10 min)

### 1a. Add the property

1. Visit https://search.google.com/search-console.
2. Click **Add Property** → choose **URL-prefix** and enter
   `https://www.turnberryplaceforsale.com` (exact, with `www`).
3. Also add the non-`www` variant (`https://turnberryplaceforsale.com`)
   and the `http://` variants — GSC will treat them as separate
   properties but show redirects as 301s → all good.

### 1b. Verify ownership

**Recommended method: DNS TXT record** (survives domain moves,
works across all properties, easy to revoke).

1. In GSC, choose **DNS TXT record** verification.
2. Copy the `google-site-verification=...` TXT value.
3. In Cloudflare DNS, add a `TXT` record:
   - Name: `@`
   - Content: `google-site-verification=<token>`
   - TTL: Auto (gray cloud — DNS only, no proxy)
4. Wait 1-5 minutes, click **Verify** in GSC.

**Alternative: HTML meta tag** (faster, but site-specific).

1. Copy the verification string from GSC.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<the string>` in
   Vercel → Project Settings → Environment Variables (both
   **Production** and **Preview**).
3. Redeploy. The meta tag auto-renders from `pages/_document.tsx`.
4. Click **Verify** in GSC.

### 1c. Set up property preferences

1. In GSC, open the property → **Settings** (gear icon).
2. **International targeting** → **Country** → United States.
3. **Associations** → link Google Analytics (GA4 property
   `G-0H44Y5TX5Q`) and Google Ads (`AW-859648231`).
4. **Users and permissions** → confirm owner access.

### 1d. Submit the sitemap

1. In GSC, open the property → **Sitemaps**.
2. Enter `sitemap.xml` (the full URL
   `https://www.turnberryplaceforsale.com/sitemap.xml` auto-resolves).
3. Click **Submit**.
4. Within 24-48h, GSC should show "Success" and discover all 20
   URLs + 69 images.

### 1e. Request indexing for the top-5 pages

1. In GSC, open **URL Inspection** (top search bar).
2. For each of these URLs, paste and click **Request indexing**:
   - `https://www.turnberryplaceforsale.com/`
   - `https://www.turnberryplaceforsale.com/available-condos`
   - `https://www.turnberryplaceforsale.com/price-features`
   - `https://www.turnberryplaceforsale.com/amenities`
   - `https://www.turnberryplaceforsale.com/stirling-club`
3. GSC limits this to ~10 requests/day/property. Spread across 2-3
   days if needed.

---

## 2. Link Google Business Profile → website

**The site exists to support the GBP.** This step is non-negotiable.

1. Visit https://business.google.com/ for the Turnberry Place GBP
   (or whichever sibling GBP this site supports).
2. **Info** tab → **Website** → enter
   `https://www.turnberryplaceforsale.com`.
3. **Reviews** tab → confirm the site's "View Reviews" / "Write
   Review" CTAs resolve to this GBP.
4. Once the GBP is verified:
   - Remove `NEXT_PUBLIC_GBP_REVIEWS_DISABLED` from Vercel (or set
     to `false`).
   - Add `NEXT_PUBLIC_GBP_PLACE_ID=ChIJ...` (copy from Google's
     Place ID Finder or the GBP dashboard).
   - Redeploy — reviews CTAs now deep-link to the verified GBP.

---

## 3. Validate structured data

Run each of these at least once per major content change:

1. **Rich Results Test**
   https://search.google.com/test/rich-results
   Paste homepage + `/price-features` + `/neighborhood` URLs. Confirm
   `RealEstateAgent`, `ApartmentComplex`, `FAQPage`, `BreadcrumbList`
   parse without errors.

2. **Schema Markup Validator**
   https://validator.schema.org/
   Same URLs. Stricter than Rich Results; flags type errors.

3. **Mobile-Friendly Test**
   https://search.google.com/test/mobile-friendly
   Homepage.

4. **PageSpeed Insights**
   https://pagespeed.web.dev/
   Homepage + `/photos`. Target: LCP < 2.5s mobile, CLS < 0.1,
   INP < 200ms.

---

## 4. Notify search engines on deploy

### 4a. Google — relies on sitemap `<lastmod>`

Google deprecated sitemap-ping in 2023. The correct signal is
accurate sitemap `<lastmod>` (already automated via
`BUILD_DATE_ISO`). Googlebot re-reads the sitemap on its own
schedule (typically every few days for active sites). No per-deploy
action needed.

For major content changes, manually request indexing via GSC URL
Inspection (see §1e).

### 4b. Bing / Yandex / Seznam / Naver — IndexNow

This site exposes an IndexNow endpoint that notifies the IndexNow
network of URL changes.

1. **Set the auth token in Vercel** (once):
   ```
   INDEXNOW_AUTH_TOKEN=<any-sufficiently-random-string>
   ```
   Set for Production env only.

2. **Trigger after each deploy** (one of):

   **Option A** — Vercel Deploy Hook + GitHub Action (recommended):
   ```yaml
   # .github/workflows/indexnow.yml
   name: IndexNow ping after deploy
   on:
     deployment_status:
   jobs:
     ping:
       if: github.event.deployment_status.state == 'success'
       runs-on: ubuntu-latest
       steps:
         - run: |
             curl -X POST "${{ github.event.deployment_status.environment_url }}/api/indexnow" \
                  -H "Authorization: Bearer ${{ secrets.INDEXNOW_AUTH_TOKEN }}"
   ```

   **Option B** — manual curl after each `vercel --prod`:
   ```bash
   curl -X POST "https://www.turnberryplaceforsale.com/api/indexnow" \
        -H "Authorization: Bearer $INDEXNOW_AUTH_TOKEN"
   ```

   **Option C** — targeted URL push (content edit):
   ```bash
   curl -X POST "https://www.turnberryplaceforsale.com/api/indexnow" \
        -H "Authorization: Bearer $INDEXNOW_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"urls": ["https://www.turnberryplaceforsale.com/stirling-club"]}'
   ```

   Response shows submission results per endpoint (api.indexnow.org,
   Bing, Yandex). HTTP 200 or 202 = accepted.

---

## 5. Weekly monitoring

| Metric | GSC location | Red flag |
|---|---|---|
| Indexing coverage | **Coverage** → **Valid** count | Drops > 20% week-over-week |
| Impressions | **Performance** → **Queries** | Sudden drop in branded queries |
| Core Web Vitals | **Experience** → **Core Web Vitals** | Any URL in "Needs improvement" or "Poor" |
| Mobile usability | **Experience** → **Mobile Usability** | Any error |
| Security issues | **Security & Manual Actions** | Any notice |
| Manual actions | **Security & Manual Actions** → **Manual actions** | Any notice (urgent) |

Set up email alerts in **Settings** → **Users and permissions** so
regressions reach you immediately.

---

## 6. Troubleshooting — common issues

| Symptom | Cause | Fix |
|---|---|---|
| "URL not in Google" (URL Inspection) | Just submitted; needs 1-7 days | Wait, re-check |
| "Crawled — currently not indexed" | Content quality / duplicate concern | Check canonical + uniqueness of H1/title/meta |
| "Discovered — currently not indexed" | Crawl budget exhausted | Reduce `Disallow` breadth, submit fewer low-priority URLs |
| "Page with redirect" | Non-`www` or `http://` version submitted | Submit only `www` + `https://` |
| CSP violations in Console | New third-party added | Add to allowlist in `next.config.js` `async headers()` |
| RealScout widget empty | CSP missing `em.` or `www.realscout.com` | Both domains in `script-src` + `connect-src` |
| Sitemap shows 0 URLs | CDN caching stale sitemap | Open `https://www.turnberryplaceforsale.com/sitemap.xml` in incognito; hard-refresh |
| GBP not showing in local pack | GBP ↔ website not linked | Re-link in GBP dashboard |

---

## 7. Portfolio note

This checklist is specific to `turnberryplaceforsale.com`. For each
sibling site in the Dr. Jan Duffy portfolio (`heyberkshire.com`,
`skyesummithomes.com`, `yourdivorcerealtor.com`, etc.) repeat the
process with that site's unique GBP Place ID and canonical URL. The
IndexNow key should be **unique per site** — generate a new one
with `[guid]::NewGuid().ToString('N')` (PowerShell) or `uuidgen`
(Unix).

See `C:\Users\geneb\.cursor\rules\global-portfolio-gbp-mission.mdc`
for the 1:1 site↔GBP architecture that underpins this whole setup.
