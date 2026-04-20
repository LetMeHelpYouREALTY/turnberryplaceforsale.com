import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { NeighborhoodSection } from "components/neighborhood-section"
import { GBP_PHONE_DISPLAY } from "lib/google-business-profile"
// QuickSearchWidget, FeaturedListingCard, VIPNewsletterSignup available on homepage
import Image from "next/image"
import Link from "next/link"
import { neighborhoodGalleryAlt } from "lib/image-alt"

interface NeighborhoodPageProps extends LayoutProps {}

// Self-hosted hero imagery (migrated off assets.cribflyer-proxy.com on
// 2026-04-18). Served from /public so Next/Image can optimize to WebP/AVIF
// with the rest of the site, removes a third-party CDN dependency, and
// keeps image delivery on the same origin as the HTML (better for caching
// and LCP).
const neighborhoodImages = [
  "/images/turnberry/neighborhood-1.jpg",
  "/images/turnberry/neighborhood-2.jpg",
  "/images/turnberry/neighborhood-3.jpg",
  "/images/turnberry/neighborhood-4.jpg",
  "/images/turnberry/neighborhood-5.jpg",
  "/images/turnberry/neighborhood-6.jpg",
]

export default function NeighborhoodPage({ menus }: NeighborhoodPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Neighborhood - Turnberry Place Las Vegas"
        description={`Turnberry Place neighborhood guide near the Las Vegas Strip (by Wynn/Encore). Las Vegas Strip High Rise Condos for Sale. Call ${GBP_PHONE_DISPLAY}.`}
        path="/neighborhood"
      />
      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Neighborhood', url: 'https://www.turnberryplaceforsale.com/neighborhood' }]} />
      <div className="card-content card-areas">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="page-header">
                <h1>Turnberry Place Neighborhood and Area Profile</h1>
                <p className="lead">
                  Turnberry Place stands as a pinnacle of luxury living in Las Vegas, offering an unparalleled blend of privacy, convenience, and access to world-class amenities. Situated just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts, this guard-gated, four-tower condominium complex redefines upscale urban living with its strategic location and meticulously curated environment.
                </p>
              </div>

              {/* Neighborhood Section with Map and Highlights */}
              <div className="content-section mb-5">
                <NeighborhoodSection
                  description="Turnberry Place stands as a pinnacle of luxury living in Las Vegas, offering an unparalleled blend of privacy, convenience, and access to world-class amenities. Situated just one block east of the Las Vegas Strip between the Wynn Encore and Sahara resorts, this guard-gated, four-tower condominium complex redefines upscale urban living with its strategic location and meticulously curated environment."
                  mapPlaceholder={true}
                  showNearbyHighlights={true}
                />
              </div>

              <div className="content-section">
                <div className="mb-4 d-flex flex-wrap area-photos align-items-center justify-content-center">
                  {neighborhoodImages.map((img, index) => (
                    <div key={index} className="p-1 thumb-border mx-1">
                      <a
                        href={img}
                        title="Turnberry Place Neighborhood and Area Profile"
                      >
                        <Image
                          src={img}
                          width={500}
                          height={500}
                          alt={neighborhoodGalleryAlt(index)}
                          className="img-area-thumb img-fluid"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h2>Prime Location and Accessibility</h2>
                    <p>
                      Turnberry Place's location at 2827 Paradise Rd positions it at the heart of Las Vegas' most dynamic corridor. The property lies within a one-mile radius of over twenty Zagat-rated restaurants, including establishments at the Wynn, Encore, and Resorts World. The Strip's iconic attractions—such as the T-Mobile Arena (home of the Vegas Golden Knights) and Allegiant Stadium (home of the Las Vegas Raiders)—are mere minutes away, alongside the Las Vegas Convention Center, Fashion Show Mall, and the Las Vegas Monorail corridor. McCarran International Airport is a short drive. Despite its central location, the community maintains a tranquil ambiance, shielded from the Strip's bustle by its elevated design and guarded entrance.
                    </p>
                    <h3>Transportation and Accessibility</h3>
                    <p>
                      The area scores moderately on walkability (46–52) and transit (48–49), reflecting its car-dependent nature, though valet parking and limousine services are included for residents. Major highways, including Interstate 15 and the Las Vegas Beltway, provide swift access to the broader metropolitan area, while the nearby Las Vegas Golf Course adds a touch of greenery to the urban landscape.
                    </p>
                    <h3>Proximity to Major Attractions</h3>
                    <p>
                      Turnberry Place's strategic location provides residents with immediate access to Las Vegas's most iconic attractions. The T-Mobile Arena, home of the Vegas Golden Knights NHL team, is just minutes away, offering residents convenient access to professional sports and major entertainment events. Allegiant Stadium, home of the Las Vegas Raiders NFL team, is similarly accessible, providing residents with opportunities to enjoy professional football and major concerts. The Las Vegas Convention Center, one of the largest convention facilities in the world, is nearby, making Turnberry Place ideal for business professionals who attend or participate in conventions and trade shows.
                    </p>
              </div>

              <div className="content-section">
                <h2>Exclusive Community Features</h2>
                    <h3>The Stirling Club</h3>
                    <p>
                      At the heart of Turnberry Place lies the Stirling Club, an 80,000-square-foot private membership facility exclusively for residents. This luxury hub features a state-of-the-art fitness center, resort-style indoor and outdoor pools, clay tennis and pickleball courts, a full-service spa, and multiple dining venues. The club's social spaces—including a business center with conference rooms, a media lounge, and a martini bar—foster a vibrant community atmosphere, allowing residents to host events or unwind without leaving the premises.
                    </p>
              </div>

              <div className="content-section">
                <h2>Architectural Distinction</h2>
                    <p>
                      Designed with Art Deco influences and Miami-inspired flair, the four 38- to 45-story towers feature curved facades and symmetrical layouts that create a striking silhouette against the Las Vegas skyline. Units prioritize outdoor living, with many offering wrap-around terraces showcasing panoramic views of the Strip, Red Rock Canyon, and the Spring Mountain Range. Penthouses above the 30th floor feature elevated ceilings (up to 12 feet) and expansive floor plans exceeding 8,000 square feet.
                    </p>
                    <h3>Design Philosophy and Aesthetic</h3>
                    <p>
                      Turnberry Place's architectural design reflects a sophisticated blend of Art Deco elegance and contemporary luxury, creating a distinctive aesthetic that stands out in the Las Vegas skyline. The towers' curved facades and symmetrical layouts create visual interest from every angle, while the development's strategic positioning maximizes views and natural light. The design philosophy emphasizes both exterior beauty and interior functionality, ensuring that residences are both visually striking and highly livable.
                    </p>
                    <h3>Outdoor Living Spaces</h3>
                    <p>
                      Turnberry Place's emphasis on outdoor living reflects Las Vegas's year-round pleasant weather and the desire for residents to enjoy the city's dramatic views and natural beauty. Many residences feature wrap-around terraces that provide private outdoor retreats with panoramic views of the Strip, Red Rock Canyon, and the Spring Mountain Range. These outdoor spaces are designed for both relaxation and entertaining, with many units featuring outdoor kitchens, fire features, and comfortable seating areas that extend the living space outdoors.
                    </p>
              </div>

              <div className="content-section">
                <h2>Nearby Attractions and Lifestyle Amenities</h2>
                    <h3>Dining and Entertainment</h3>
                    <p>Within a 10-minute drive, residents can access:</p>
                    <ul>
                      <li>
                        <p><strong>Fine Dining:</strong> Joël Robuchon at MGM Grand, é by José Andrés, and Twist by Pierre Gagnaire</p>
                      </li>
                      <li>
                        <p><strong>Nightlife:</strong> XS Nightclub at Encore, Omnia at Caesars Palace</p>
                      </li>
                      <li>
                        <p><strong>Cultural Venues:</strong> The Bellagio Gallery of Fine Art, The Smith Center for the Performing Arts</p>
                      </li>
                      <li>
                        <p><strong>Retail Therapy:</strong> Fashion Show Mall, Crystals at CityCenter</p>
                      </li>
                    </ul>
                    <h3>Cultural and Entertainment Venues</h3>
                    <p>
                      Beyond dining and nightlife, Turnberry Place residents enjoy access to world-class cultural and entertainment venues. The Bellagio Gallery of Fine Art showcases rotating exhibitions of renowned artists, while The Smith Center for the Performing Arts hosts Broadway shows, concerts, and cultural performances. These venues provide residents with opportunities to enjoy high culture and entertainment without traveling far from home, enhancing the sophisticated lifestyle that Turnberry Place residents value.
                    </p>
                    <h3>Outdoor and Family Activities</h3>
                    <p>The neighborhood caters to diverse interests:</p>
                    <ul>
                      <li>
                        <p><strong>Golf:</strong> Las Vegas Golf Course (adjacent) and Bali Hai Golf Club (5 minutes south)</p>
                      </li>
                      <li>
                        <p><strong>Nature Exploration:</strong> Springs Preserve (15 minutes northwest) and Red Rock Canyon (25 minutes west)</p>
                      </li>
                      <li>
                        <p><strong>Family Fun:</strong> Discovery Children's Museum and High Roller Observation Wheel</p>
                      </li>
                    </ul>
              </div>

              <div className="content-section">
                <h2>Security and Privacy</h2>
                <p>
                      Turnberry Place's guard-gated entrance, 24/7 security personnel, and video surveillance systems ensure a secure environment. The property's raised elevation and strategic positioning minimize street noise, while keycard access and private elevators to residences enhance privacy. A dedicated concierge team handles package delivery, housekeeping coordination, and transportation arrangements, allowing residents to enjoy a seamless lifestyle.
                    </p>
                    <h3>Comprehensive Security Systems</h3>
                    <p>
                      Turnberry Place's security systems are comprehensive and continuously updated to ensure the highest levels of protection. The guard-gated entrance provides controlled access, while 24-hour security personnel patrol the property and monitor security systems. Video surveillance covers common areas, entrances, and parking facilities, providing additional security coverage. These systems work together to create a safe environment that allows residents to enjoy their homes with confidence.
                    </p>
                    <h3>Privacy Features and Seclusion</h3>
                    <p>
                      The development's privacy features, including keycard access, private elevator access to many residences, and raised elevation, create a sense of seclusion despite the proximity to the Strip. The strategic positioning and soundproofing minimize external noise, creating a tranquil environment within the residences. These privacy features are essential for high-profile residents, executives, and anyone who values peace and quiet in their home environment.
                    </p>
              </div>

              <div className="content-section">
                <h2>Views and Natural Surroundings</h2>
                    <p>Every residence capitalizes on Las Vegas' dramatic vistas:</p>
                    <ul>
                      <li>
                        <p><strong>West-Facing Units:</strong> Sunset views over Red Rock Canyon and the Spring Mountains</p>
                      </li>
                      <li>
                        <p><strong>East-Facing Units:</strong> Panoramic cityscapes stretching to downtown Las Vegas</p>
                      </li>
                      <li>
                        <p><strong>South-Facing Units:</strong> Direct sightlines to the Strip's glowing skyline</p>
                      </li>
                      <li>
                        <p><strong>North-Facing Units:</strong> Expansive views of the Las Vegas Valley and Sheep Mountain Range</p>
                      </li>
                    </ul>
                    <p>
                      The development's landscaping incorporates drought-tolerant flora and shaded courtyards, creating microclimates that contrast with the surrounding desert. Rooftop terraces on upper floors provide unparalleled vantage points for fireworks displays during major Strip events.
                    </p>
                    <p>
                      This neighborhood profile underscores Turnberry Place's unique position as a sanctuary of luxury within arm's reach of Las Vegas' most iconic experiences. Its fusion of privacy, convenience, and bespoke amenities creates an unrivaled living environment for discerning residents.
                    </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="card-content py-5 border-top"
        aria-label="Related Turnberry Place pages"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 text-center">
              <h2 className="h5 mb-3">Next steps</h2>
              <p className="text-muted mb-3">
                See what&apos;s for sale and how the community sits on the map.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link
                  href="/map"
                  className="btn btn-outline-primary"
                  title="Interactive map — Turnberry Place and nearby venues"
                >
                  Open the Turnberry Place area map
                </Link>
                <Link
                  href="/available-condos"
                  className="btn btn-primary"
                  title="Luxury high-rise condos for sale at Turnberry Place"
                >
                  View Turnberry Place condos for sale
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings and VIP Newsletter - Available on homepage */}
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<NeighborhoodPageProps>> {
  return {
    props: {
      menus: await getMenus(),
    },
  }
}
