import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { GBPMapCard } from "components/gbp-map-card"
// ClientTestimonials currently orphaned (neutralized 2026-04-18 to use only
// verified Google reviews). VIPNewsletterSignup imported separately where used.
import Image from "next/image"

interface StirlingClubPageProps extends LayoutProps {}

export default function StirlingClubPage({ menus }: StirlingClubPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="The Stirling Club - Turnberry Place Las Vegas"
        description="The Stirling Club: private amenities for Turnberry Place residents near the Las Vegas Strip. Las Vegas Strip High Rise Condos for Sale. Call (702) 500-1971."
        path="/stirling-club"
      />
      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Stirling Club', url: 'https://www.turnberryplaceforsale.com/stirling-club' }]} />
      <div className="card-content card-custom card-custom-03">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="page-header">
                <h1>The Stirling Club: Exclusive Luxury at Your Doorstep</h1>
                <p className="lead">
                  The Stirling Club stands as the crown jewel of Turnberry Place, an 80,000-square-foot private membership facility exclusively for residents. This recently renovated world-class facility represents one of the most comprehensive private club amenities available in any Las Vegas condominium development. As a Las Vegas real estate expert with over 30 years of experience, I can attest that The Stirling Club's amenities rival the best private clubs worldwide, creating exceptional value for Turnberry Place residents.
                </p>
              </div>

              <div className="content-section">
                <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                      <div className="left-image pb-4 pb-md-0">
                        <Image
                          src="/images/turnberry/stirling-club-hero.jpg"
                          width={600}
                          height={400}
                          alt="The Stirling Club at Turnberry Place Las Vegas"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="text-content pt-3 pt-md-0">
                        <h2>World-Class Private Club Amenities</h2>
                        <p>
                          The Stirling Club serves as the social and recreational hub of the Turnberry Place community, providing residents with a private oasis of luxury and convenience. Its extensive offerings contribute significantly to the upscale lifestyle that defines Turnberry Place, making it a central feature that distinguishes this development from other luxury condominiums in Las Vegas. The club's recent renovations have enhanced its facilities, ensuring that they remain state-of-the-art and competitive with the best private clubs globally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div className="content-section">
                <h2>Comprehensive Facility Overview</h2>
                <p>
                  The Stirling Club's 80,000 square feet include state-of-the-art fitness center with personal training and group classes, resort-style indoor and outdoor pools with cabanas, professionally maintained clay tennis and pickleball courts, full-service spa with treatment rooms, multiple dining venues and bars, business center with conference rooms, and social lounges with entertainment spaces.
                </p>
                <p>
                  The club serves as the social and recreational heart of Turnberry Place, offering fitness classes, tennis clinics, social events, and private event hosting. Facilities can be reserved for private gatherings, celebrations, and business functions.
                </p>
              </div>

              <div className="content-section">
                <h2>Recent Renovations and Modern Enhancements</h2>
                <p>
                  The Stirling Club's recent renovations have enhanced its facilities, ensuring that they remain state-of-the-art and competitive with the best private clubs in Las Vegas and beyond. These renovations reflect the commitment to maintaining excellence and providing residents with facilities that meet the highest standards of luxury and quality.
                </p>
                <h3>Updated Fitness Equipment and Facilities</h3>
                <p>
                  The fitness center's recent renovations include updated equipment from leading manufacturers, ensuring that residents have access to the latest fitness technology and equipment. The renovations also enhanced the facility's layout and design, creating a more efficient and enjoyable workout environment. These updates ensure that the fitness center remains competitive with the best private fitness facilities, providing residents with exceptional value and convenience.
                </p>
                <h3>Enhanced Pool Areas and Outdoor Spaces</h3>
                <p>
                  The pool areas' recent renovations enhanced the outdoor spaces with updated cabanas, improved lounge areas, and enhanced poolside service facilities. The renovations also improved the indoor pool area, creating a more sophisticated and comfortable environment for year-round swimming. These enhancements ensure that residents can enjoy resort-style pool experiences that rival the best hotel and resort facilities, all within the convenience of their residential community.
                </p>
                <h3>Modernized Dining and Social Spaces</h3>
                <p>
                  The dining venues and social spaces have been modernized with updated decor, improved layouts, and enhanced technology infrastructure. These renovations create more sophisticated and comfortable environments for dining, socializing, and entertaining. The modernized spaces reflect contemporary design trends while maintaining the elegance and luxury that define The Stirling Club, ensuring that residents enjoy facilities that are both timeless and current.
                </p>
              </div>

              <div className="content-section">
                <h2>Value Proposition of The Stirling Club</h2>
                <p>
                  The Stirling Club's comprehensive amenities create exceptional value for Turnberry Place residents. If residents were to purchase separate memberships for the amenities available through The Stirling Club, the annual costs would exceed tens of thousands of dollars. Understanding this value proposition helps buyers appreciate the development's pricing structure and investment potential.
                </p>
                <h3>Cost Comparison to Separate Memberships</h3>
                <p>
                  Private fitness club memberships in Las Vegas can cost $200 to $500 per month, while spa memberships and services can cost hundreds of dollars per visit. Tennis club memberships, dining club memberships, and business center access would create additional significant expenses. The Stirling Club's inclusion of these amenities in Turnberry Place's HOA fees represents exceptional value, as residents receive access to world-class facilities without separate membership costs. This value proposition is particularly compelling for residents who would otherwise invest in multiple memberships and services, as it consolidates these expenses into a single, predictable monthly fee.
                </p>
                <h3>Convenience and Time Savings</h3>
                <p>
                  The Stirling Club's on-site location creates significant convenience and time savings for residents. The ability to access fitness facilities, pools, spa services, dining venues, and business facilities without leaving the property eliminates travel time and creates efficiency in daily routines. This convenience is particularly valuable for busy professionals, executives, and anyone who values time efficiency. The time savings, combined with the quality of the amenities, creates value that extends beyond financial considerations, as residents can maximize their time while enjoying exceptional facilities.
                </p>
                <h3>Exclusivity and Prestige</h3>
                <p>
                  The Stirling Club's exclusive nature, available only to Turnberry Place residents, creates a sense of exclusivity and prestige that enhances the overall living experience. The club's private membership model ensures that facilities remain uncrowded and provide personalized service, creating a true luxury experience. This exclusivity is difficult to replicate elsewhere and represents a significant value proposition for buyers who appreciate private club amenities and the prestige that comes with exclusive access.
                </p>
              </div>

              <div className="content-section">
                <h2>Contact Dr. Jan Duffy for Stirling Club Information</h2>
                <p>
                  As a Las Vegas real estate expert with over 30 years of experience and deep knowledge of Turnberry Place and The Stirling Club, I can provide comprehensive information about the club's amenities, facilities, and value propositions. My expertise in luxury condominium developments, combined with my understanding of The Stirling Club's unique offerings, enables me to help buyers appreciate the exceptional value that this private club provides.
                </p>
                <p>
                  Whether you're interested in The Stirling Club's fitness facilities, recreational amenities, dining venues, business facilities, or social spaces, I can provide detailed information about how these amenities enhance daily living and create exceptional value. My goal is to help you understand the comprehensive nature of The Stirling Club and how it contributes to Turnberry Place's reputation as Las Vegas's premier high-rise condominium community.
                </p>
                <p>
                  <strong>Ready to experience The Stirling Club?</strong> Contact the office at <a href="tel:+17025001971" className="text-decoration-underline">(702) 500-1971</a> to schedule a private tour of The Stirling Club and discuss how this exclusive private club can enhance your luxury lifestyle. With my extensive knowledge of The Stirling Club and Turnberry Place, I can help you appreciate the exceptional value and lifestyle benefits that this world-class facility provides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonials and VIP Newsletter - Available on homepage and /agent page */}

      <GBPMapCard heading="Tour The Stirling Club With Dr. Jan Duffy" />
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<StirlingClubPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
