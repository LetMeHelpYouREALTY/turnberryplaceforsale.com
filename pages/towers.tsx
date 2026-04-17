import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { TowerCards } from "components/tower-cards"
import { TowerComparisonTable } from "components/tower-comparison-table"
import { ExpandableTowerSections } from "components/expandable-tower-sections"
import { TowerViewsSection } from "components/tower-views-section"
import { SharedAmenitiesSection } from "components/shared-amenities-section"
import { TowersCTASection } from "components/towers-cta-section"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { TowersSchema } from "components/towers-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import Link from "next/link"
import Image from "next/image"


interface TowersPageProps extends LayoutProps {}

export default function TowersPage({ menus }: TowersPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Turnberry Place Towers | Las Vegas Luxury High-Rise Condos"
        description="Explore four luxury towers at Turnberry Place Las Vegas. Compare Tower 1-4 features, views, and prices. Starting from $800K. Call (702) 500-1971."
        ogImage="https://www.turnberryplaceforsale.com/images/turnberry/turnberry-tower-south-view.jpeg"
        ogImageAlt="Turnberry Place towers and surrounding Las Vegas views"
        path="/towers"
      />
      <TowersSchema />
      <BreadcrumbSchema currentPageTitle="Turnberry Place Towers | Las Vegas Luxury High-Rise Condos" />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/turnberry/turnberry-tower-south-view.jpeg"
            alt="Turnberry Place four luxury towers near the Las Vegas Strip"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          {/* Overlay gradient - dark bottom to transparent top */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4" 
            style={{ 
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
              letterSpacing: '0.02em'
            }}
          >
            Four Towers. One Iconic Address.
          </h1>
          <p 
            className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            Discover your perfect residence at Turnberry Place
          </p>
          
          {/* Quick Stats Row */}
          <div 
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8"
            style={{
              color: 'rgba(255, 255, 255, 0.98)',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="flex items-center gap-2">
              <span 
                className="text-2xl md:text-3xl font-bold" 
                style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212, 175, 55, 0.3)' }}
              >
                4
              </span>
              <span className="text-lg md:text-xl">Towers</span>
            </div>
            <div className="hidden md:block" style={{ color: '#D4AF37' }}>|</div>
            <div className="flex items-center gap-2">
              <span 
                className="text-2xl md:text-3xl font-bold" 
                style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212, 175, 55, 0.3)' }}
              >
                38-45
              </span>
              <span className="text-lg md:text-xl">Stories</span>
            </div>
            <div className="hidden md:block" style={{ color: '#D4AF37' }}>|</div>
            <div className="flex items-center gap-2">
              <span 
                className="text-2xl md:text-3xl font-bold" 
                style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212, 175, 55, 0.3)' }}
              >
                1,200+
              </span>
              <span className="text-lg md:text-xl">Residences</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                document.getElementById('towers-content')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 rounded-md font-medium text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: '#D4AF37',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B8941F'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#D4AF37'
              }}
            >
              Compare Towers
            </button>
            <Link
              href="tel:+17025001971"
              className="px-8 py-4 rounded-md font-medium text-white border-2 border-white transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              Call (702) 500-1971
            </Link>
          </div>
        </div>
      </section>

      {/* Tower Cards Section */}
      <TowerCards
        towers={[
          {
            number: 1,
            completed: 2000,
            stories: 38,
            sizeRange: '1,200 - 4,000',
            priceStart: '$800K',
            highlight: 'Direct Stirling Club Access',
            bestFor: 'Entry to Turnberry lifestyle',
            tagline: 'The Original',
            image: '/images/turnberry/Turnberry_Place_For_Sale.jpg',
          },
          {
            number: 2,
            completed: 2001,
            stories: 45,
            sizeRange: '1,500 - 5,000',
            priceStart: '$1.2M',
            highlight: 'Largest Floor Plans',
            bestFor: 'Space & Strip views',
            tagline: 'The Spacious One',
            image: '/images/turnberry/turnberry-tower-nice-view.jpg',
          },
          {
            number: 3,
            completed: 2002,
            stories: 45,
            sizeRange: '1,500 - 5,000',
            priceStart: '$1.2M',
            highlight: 'Contemporary Design',
            bestFor: 'Modern aesthetic lovers',
            tagline: 'The Modern Classic',
            image: '/images/turnberry/turnberry-tower-south-view.jpeg',
          },
          {
            number: 4,
            completed: 2005,
            stories: 45,
            sizeRange: '2,000 - 8,000+',
            priceStart: '$3M',
            highlight: 'Ultimate Penthouses',
            bestFor: 'Pinnacle luxury seekers',
            tagline: 'The Crown Jewel',
            image: '/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg',
          },
        ]}
      />

      {/* Tower Comparison Table */}
      <TowerComparisonTable
        towers={[
          {
            number: 1,
            completed: 2000,
            stories: 38,
            minSize: '1,200 sf',
            maxSize: '4,000 sf',
            startingPrice: '$800K',
            ceilingHeight: 'Standard',
            stirlingAccess: 'Direct',
            concierge: 'Yes',
            bestViews: 'Sunrise',
          },
          {
            number: 2,
            completed: 2001,
            stories: 45,
            minSize: '1,500 sf',
            maxSize: '5,000 sf',
            startingPrice: '$1.2M',
            ceilingHeight: 'Standard',
            stirlingAccess: 'Yes',
            concierge: 'Enhanced',
            bestViews: 'Strip',
          },
          {
            number: 3,
            completed: 2002,
            stories: 45,
            minSize: '1,500 sf',
            maxSize: '5,000 sf',
            startingPrice: '$1.2M',
            ceilingHeight: 'Standard',
            stirlingAccess: 'Yes',
            concierge: 'Enhanced',
            bestViews: 'Desert',
          },
          {
            number: 4,
            completed: 2005,
            stories: 45,
            minSize: '2,000 sf',
            maxSize: '8,000+ sf',
            startingPrice: '$3M',
            ceilingHeight: 'Up to 12ft',
            stirlingAccess: 'Yes',
            concierge: 'Premium',
            bestViews: 'All',
          },
        ]}
      />

      {/* Expandable Tower Sections */}
      <ExpandableTowerSections
        towers={[
          {
            number: 1,
            name: 'The Original',
            tagline: 'Where Turnberry Place began',
            heroImage: '/images/turnberry/Turnberry_Place_For_Sale.jpg',
            stats: [
              { label: 'Completed', value: '2000' },
              { label: 'Stories', value: '38' },
              { label: 'Size Range', value: '1,200 - 4,000 sf' },
              { label: 'Starting Price', value: '$800K' },
            ],
            description:
              'Turnberry Place Tower 1 represents the inaugural vision of luxury high-rise living in Las Vegas. Completed in 2000, this 38-story tower was the first to welcome residents to the Turnberry Place lifestyle, establishing the development\'s reputation for excellence.',
            special: [
              'Direct Stirling Club connection',
              'Proven community',
              'Excellent value',
            ],
            bestFor: 'First-time Turnberry buyers',
          },
          {
            number: 2,
            name: 'The Spacious One',
            tagline: 'Room to breathe, views to inspire',
            heroImage: '/images/turnberry/turnberry-tower-nice-view.jpg',
            stats: [
              { label: 'Completed', value: '2001' },
              { label: 'Stories', value: '45' },
              { label: 'Size Range', value: '1,500 - 5,000 sf' },
              { label: 'Price Range', value: '$1.2M - $5M' },
            ],
            description:
              'Rising 45 stories, Tower 2 delivers breathtaking views and refined luxury living with larger floor plans and premium finishes. Residents enjoy private balconies, concierge services, and exclusive access to The Stirling Club\'s resort-style amenities.',
            special: [
              'Largest floor plans',
              'Enhanced concierge',
              'Spectacular Strip views',
            ],
            bestFor: 'Families and entertainers',
          },
          {
            number: 3,
            name: 'The Modern Classic',
            tagline: 'Contemporary design meets desert beauty',
            heroImage: '/images/turnberry/turnberry-tower-south-view.jpeg',
            stats: [
              { label: 'Completed', value: '2002' },
              { label: 'Stories', value: '45' },
              { label: 'Size Range', value: '1,500 - 5,000 sf' },
              { label: 'Price Range', value: '$1.2M - $5M' },
            ],
            description:
              'The third tower of Turnberry Place stands 45 stories tall, offering contemporary luxury residences with panoramic views. Completed in 2002, Tower 3 features modern designs and spacious terraces that represent the perfect blend of privacy and resort-style living.',
            special: [
              'Modern finishes',
              'Spacious terraces',
              'Desert-inspired aesthetic',
            ],
            bestFor: 'Design-forward buyers',
          },
          {
            number: 4,
            name: 'The Crown Jewel',
            tagline: 'The pinnacle of Las Vegas luxury',
            heroImage: '/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg',
            stats: [
              { label: 'Completed', value: '2005' },
              { label: 'Stories', value: '45' },
              { label: 'Size Range', value: '2,000 - 8,000+ sf' },
              { label: 'Price Range', value: '$3M - $10M+' },
            ],
            description:
              'As the crown jewel of Turnberry Place, Tower 4 represents the pinnacle of luxury high-rise living in Las Vegas. This 45-story masterpiece, completed in 2005, offers the most refined residences with unparalleled views and exceptional finishes that set new standards for luxury condominium living.',
            special: [
              'Highest ceilings (12ft)',
              'Largest penthouses',
              'Premium everything',
            ],
            bestFor: 'Ultimate luxury seekers',
          },
        ]}
      />

      {/* Tower Views Section */}
      <TowerViewsSection />

      {/* Shared Amenities Section */}
      <SharedAmenitiesSection />

      {/* Summary Section */}
      <section id="towers-content" className="card-content py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="text-center mb-5">
                <h2>Turnberry Place: Four Towers, One Vision</h2>
                <p className="lead text-muted">
                  Strategically positioned one block east of the Las Vegas Strip, Turnberry Place features four luxury towers (38-45 stories) completed between 2000-2005. Each tower offers unique value while sharing exclusive access to The Stirling Club's 80,000-square-foot private facility, 24-hour security, and concierge services.
                </p>
              </div>
              
              <div className="row g-4 mb-5">
                <div className="col-12 col-md-6">
                  <h3 className="h5 mb-3">Prime Location</h3>
                  <p className="text-muted">
                    Situated between the Wynn Encore and Sahara resorts, Turnberry Place provides immediate proximity to the Strip's most iconic attractions while maintaining privacy and security through a guard-gated entrance.
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <h3 className="h5 mb-3">Exclusive Access</h3>
                  <p className="text-muted">
                    All residents enjoy full access to The Stirling Club, featuring state-of-the-art fitness facilities, resort-style pools, tennis courts, spa services, and multiple fine dining venues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA Section */}
      <TowersCTASection />

      {/* Quick Search and Featured Listings - Available on homepage and /available-condos */}
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<TowersPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
