import Link from 'next/link'

/**
 * In The Media — press / coverage callout.
 *
 * **SEVERE INTEGRITY RISK PRIOR TO 2026-04-18:** this component shipped
 * six fabricated media features:
 *   - "Las Vegas Review-Journal" feature
 *   - "Luxury Lifestyle Magazine" coverage
 *   - "Las Vegas Business Press" insights
 *   - "Architectural Digest" design feature  <-- MAJOR PUBLICATION
 *   - "Forbes Real Estate" market analysis   <-- MAJOR PUBLICATION
 *   - "Las Vegas Magazine" profile
 *
 * None of these featured items had a URL (`url?` was never populated on
 * any item) and none could be verified via public search. Claiming
 * Architectural Digest and Forbes coverage that did not happen is a
 * deceptive-practice risk (FTC endorsement/advertising guides + NAR
 * Code of Ethics Article 12) and was live in the repo, available to
 * ship the moment anyone imported the component.
 *
 * This file has been converted to a prop-driven component. Default
 * render output: `null`. Callers MUST pass a verified `items` array,
 * each with a real source + real URL, before anything appears on
 * screen. No hardcoded press claims live in this file anymore.
 *
 * Component is currently orphaned (nothing imports it). Retained per
 * repo rule "never delete files without approval", but neutralized so
 * re-importing it without verified data is a no-op instead of shipping
 * fake press.
 */

export type MediaItem = {
  title: string
  source: string
  /** Required: every item must link to the actual coverage so claims
   *  are independently verifiable. No URL, no render. */
  url: string
  date?: string
  excerpt?: string
}

export function InTheMedia({ items = [] }: { items?: MediaItem[] }) {
  // Only render items that carry a real URL. Drops any caller-supplied
  // entry that lacks verifiable linkage.
  const verifiedItems = items.filter((i) => i.url && i.url.trim().length > 0)

  if (verifiedItems.length === 0) {
    return null
  }

  return (
    <div
      className="card-content py-5 bg-white"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2
              className="mb-3"
              style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}
            >
              In The Media
            </h2>
          </div>
        </div>
        <div className="row">
          {verifiedItems.map((item) => (
            <div
              key={`${item.source}-${item.title}`}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="small text-muted mb-2"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <strong>{item.source}</strong>
                    {item.date ? <span> &middot; {item.date}</span> : null}
                  </div>
                  <h3
                    className="h5 card-title mb-3"
                    style={{ fontSize: '1.25rem', fontWeight: 600, color: '#212529' }}
                  >
                    {item.title}
                  </h3>
                  {item.excerpt ? (
                    <p
                      className="card-text"
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: '#495057',
                      }}
                    >
                      {item.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={item.url}
                    className="btn btn-sm btn-outline-primary mt-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderRadius: '6px', fontWeight: 500 }}
                  >
                    Read the coverage
                    <span className="sr-only"> (opens in a new tab)</span>
                    {' '}&rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
