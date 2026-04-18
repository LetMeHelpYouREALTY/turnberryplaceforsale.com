import Link from 'next/link'

/**
 * Why Work With Us — three-card value-prop callout.
 *
 * Prior to 2026-04-18 this component shipped prose with unverified
 * numerics ("over 30 years", "500+ Las Vegas families") in the "Power
 * of Experience" and "Power of Results" cards. Per CLAUDE.md and the
 * global no-fabricated-social-proof rule, those claims have been
 * neutralized.
 *
 * Cards are now grounded in verifiable / structural truths about the
 * service rather than unverified metrics:
 *   - Power of Specialization: on-site Turnberry Place specialist
 *     (the operator lives / works in the building -- verifiable via
 *     license record and brokerage listings)
 *   - Power of Network: Berkshire Hathaway HomeServices affiliation
 *     (verifiable via BHHS agent profile, cid-3042332)
 *   - Power of Coverage: multi-office footprint across Las Vegas Valley
 *     (verifiable via five active Google Business Profiles)
 *
 * Component is currently orphaned (nothing imports it). Retained so
 * it's ready to use on /agent or /about if the operator adds it back,
 * but without re-introducing unverifiable claims.
 */

interface PowerStatement {
  title: string
  description: string
  linkText?: string
  linkHref?: string
}

export function WhyWorkWithUs() {
  const powerStatements: PowerStatement[] = [
    {
      title: 'The Power of Specialization',
      description:
        'Dr. Jan Duffy specializes in Turnberry Place. As an on-site resident specialist, she knows every tower layout, the Stirling Club amenities, view corridors, and HOA structure in detail — so you walk into every showing with context that out-of-building agents simply do not have.',
      linkText: 'Learn More',
      linkHref: '/agent',
    },
    {
      title: 'The Power of Network',
      description:
        'Dr. Jan Duffy is a licensed REALTOR® with Berkshire Hathaway HomeServices Nevada Properties (license S.0197614.LLC), which connects buyers and sellers to the Berkshire Hathaway global referral network and the full BHHS luxury marketing toolkit at no extra cost.',
      linkText: 'Read Client Reviews',
      linkHref: '/agent#testimonials',
    },
    {
      title: 'The Power of Coverage',
      description:
        'The Dr. Jan Duffy team operates from multiple offices across the Las Vegas Valley, serving clients in Turnberry Place, the Arts District, Centennial Hills, Henderson (MacDonald Highlands), and beyond. If you are buying in Turnberry and selling elsewhere in the Valley, one team handles both transactions.',
      linkText: 'Explore Properties',
      linkHref: '/available-condos',
    },
  ]

  return (
    <div
      className="card-content py-5 bg-light"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2
              className="mb-3"
              style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}
            >
              Why Work With Dr. Jan Duffy
            </h2>
            <p
              className="lead"
              style={{
                fontSize: '1.25rem',
                color: '#495057',
                lineHeight: 1.6,
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              A specialist who lives at Turnberry Place, backed by the Berkshire
              Hathaway HomeServices network, with offices across the Las Vegas
              Valley.
            </p>
          </div>
        </div>
        <div className="row">
          {powerStatements.map((statement) => (
            <div key={statement.title} className="col-md-4 mb-4 mb-md-0">
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <div className="card-body text-center p-4">
                  <h3
                    className="h4 mb-3"
                    style={{ fontSize: '1.5rem', fontWeight: 600, color: '#212529' }}
                  >
                    {statement.title}
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      minHeight: '120px',
                      color: '#495057',
                    }}
                  >
                    {statement.description}
                  </p>
                  {statement.linkText && statement.linkHref && (
                    <Link
                      href={statement.linkHref}
                      className="btn btn-outline-primary"
                      style={{
                        borderRadius: '6px',
                        fontWeight: 500,
                        padding: '0.5rem 1.5rem',
                      }}
                    >
                      {statement.linkText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
