/**
 * Power of Numbers — stats callout.
 *
 * Prior to 2026-04-18 this component shipped four hardcoded stats:
 *   - "500+" families helped
 *   - "30+" years of experience
 *   - "4.9/5" average rating
 *   - "$500M+" in sales volume
 *
 * None were verifiable against the operator's other active sites (which
 * variously claim $127M+, $180M+, or $500M+ — inconsistent figures).
 * Per CLAUDE.md and the global no-fabricated-social-proof rule, those
 * figures were removed.
 *
 * Component is currently orphaned (nothing imports it). Rather than
 * delete the file (per repo rule "never delete files without approval"),
 * it has been converted to a prop-driven component that renders nothing
 * unless the operator supplies verified stats via the `stats` prop. That
 * way if someone accidentally re-imports this component in the future,
 * no fabricated numbers ship.
 *
 * Example (only when verified figures are available and signed off):
 *
 *   <PowerOfNumbers stats={[
 *     { number: "30+", label: "Years of Experience",
 *       description: "Las Vegas real estate since 1995",
 *       sourceNote: "Verified via Nevada RED license history" },
 *   ]} />
 */

export type PowerStat = {
  number: string
  label: string
  description: string
  /** Internal-only source attribution; not rendered. Required before this
   *  component ships, per the no-fabricated-social-proof rule. */
  sourceNote: string
}

export function PowerOfNumbers({ stats = [] }: { stats?: PowerStat[] }) {
  if (stats.length === 0) {
    // Empty-state guard: without verified figures, render nothing. Prevents
    // accidental shipment of placeholder / fabricated numbers.
    return null
  }

  return (
    <div
      className="card-content py-5 bg-primary text-white"
      style={{ paddingTop: '4rem', paddingBottom: '4rem', backgroundColor: '#007bff' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2
              className="mb-3 text-white"
              style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}
            >
              By the Numbers
            </h2>
          </div>
        </div>
        <div className="row">
          {stats.map((stat) => (
            <div
              key={`${stat.label}-${stat.number}`}
              className="col-6 col-md-3 mb-4 mb-md-0"
            >
              <div
                className="text-center p-3"
                style={{ transition: 'all 0.3s ease', borderRadius: '8px' }}
              >
                <div
                  className="display-4 font-weight-bold mb-2"
                  style={{ fontSize: '3rem', fontWeight: 700 }}
                >
                  {stat.number}
                </div>
                <div
                  className="h5 mb-2"
                  style={{ fontSize: '1.25rem', fontWeight: 600 }}
                >
                  {stat.label}
                </div>
                <div
                  className="small"
                  style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}
                >
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
