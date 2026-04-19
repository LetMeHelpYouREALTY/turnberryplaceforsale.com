'use client'

import { useState, useMemo } from 'react'
import { GetStaticPropsResult } from 'next'
import { Layout, LayoutProps } from 'components/layout'
import { getMenus } from 'lib/get-menus'
import { Meta } from 'components/meta'
import { JsonLdSchema } from 'components/json-ld-schema'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { floorPlans, FloorPlan } from 'lib/floorPlans'
import { GBP_PHONE_DISPLAY, GBP_PHONE_TEL } from 'lib/google-business-profile'
import FloorPlanCard from 'components/FloorPlanCard'
import FloorPlanFilters, { FilterState } from 'components/FloorPlanFilters'
import FloorPlanComparison from 'components/FloorPlanComparison'

interface FloorPlansPageProps extends LayoutProps {}

// Generate JSON-LD schema for SEO
function generateFloorPlanSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Turnberry Place Las Vegas Floor Plans',
    description: 'Luxury condominium floor plans available at Turnberry Place',
    numberOfItems: floorPlans.length,
    itemListElement: floorPlans.map((plan, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Accommodation',
        name: `Turnberry Place ${plan.name}`,
        description: `${plan.beds} bedroom, ${plan.baths} bathroom luxury condo, ${plan.sqft} sq ft`,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: plan.sqftMin,
          unitCode: 'SQF'
        },
        numberOfRooms: plan.beds,
        numberOfBathroomsTotal: plan.baths,
        amenityFeature: plan.features.map(f => ({ '@type': 'LocationFeatureSpecification', name: f })),
        image: `${baseUrl}${plan.image}`,
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: plan.priceMin,
            maxPrice: plan.priceMax,
            priceCurrency: 'USD'
          }
        }
      }
    }))
  }
}

export default function FloorPlansPage({ menus }: FloorPlansPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    minSqft: 0,
    maxSqft: 10000,
    minPrice: 0,
    maxPrice: 15000000,
    tower: null
  })

  const [comparingPlans, setComparingPlans] = useState<FloorPlan[]>([])

  // Filter floor plans based on current filters
  const filteredPlans = useMemo(() => {
    return floorPlans.filter(plan => {
      // Type filter
      if (filters.type !== 'all' && plan.type.toLowerCase() !== filters.type) {
        return false
      }

      // Square footage filter
      if (plan.sqftMax < filters.minSqft || plan.sqftMin > filters.maxSqft) {
        return false
      }

      // Price filter
      if (plan.priceMax < filters.minPrice || plan.priceMin > filters.maxPrice) {
        return false
      }

      // Tower filter
      if (filters.tower !== null && !plan.towers.includes(filters.tower)) {
        return false
      }

      return true
    })
  }, [filters])

  const handleCompare = (plan: FloorPlan) => {
    const isAlreadyComparing = comparingPlans.some(p => p.id === plan.id)
    
    if (isAlreadyComparing) {
      // Remove from comparison
      setComparingPlans(comparingPlans.filter(p => p.id !== plan.id))
    } else {
      // Add to comparison (max 3)
      if (comparingPlans.length < 3) {
        setComparingPlans([...comparingPlans, plan])
      }
    }
  }

  const handleRemoveFromComparison = (planId: string) => {
    setComparingPlans(comparingPlans.filter(p => p.id !== planId))
  }

  const handleClearComparison = () => {
    setComparingPlans([])
  }

  const schema = generateFloorPlanSchema()

  return (
    <Layout menus={menus}>
      <Meta
        title="Floor Plans | Turnberry Place Las Vegas Condos"
        description="Explore 9 luxury floor plans at Turnberry Place Las Vegas. From 1,556 to 9,000+ sq ft. 1-4 bedrooms, penthouses with Strip views. Prices from $450K to $10M+."
        keywords="Turnberry Place floor plans, Las Vegas luxury condo floor plans, high-rise condo layouts"
        ogImage="/images/turnberry/turnberry-place-floor-plan-h.png"
        ogImageAlt="Turnberry Place Las Vegas luxury floor plans"
        path="/floor-plans"
      />
      <JsonLdSchema type="property" />
      <BreadcrumbSchema currentPageTitle="Floor Plans | Turnberry Place Las Vegas" />
      
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Turnberry Place Floor Plans
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
            Explore 9 distinctive luxury floor plans ranging from elegant 1-bedroom residences to spectacular penthouses. Each layout is thoughtfully designed for modern luxury living near the Las Vegas Strip.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <FloorPlanFilters onFilterChange={setFilters} />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <strong>{filteredPlans.length}</strong> of {floorPlans.length} floor plans
            </p>
          </div>

          {/* Floor Plan Grid */}
          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map(plan => (
                <FloorPlanCard
                  key={plan.id}
                  plan={plan}
                  onCompare={handleCompare}
                  isComparing={comparingPlans.some(p => p.id === plan.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No floor plans match your filters.</p>
              <button
                onClick={() => setFilters({
                  type: 'all',
                  minSqft: 0,
                  maxSqft: 10000,
                  minPrice: 0,
                  maxPrice: 15000000,
                  tower: null
                })}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Bar */}
      <FloorPlanComparison
        plans={comparingPlans}
        onRemove={handleRemoveFromComparison}
        onClear={handleClearComparison}
      />

      {/* Content Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Understanding Turnberry Place Floor Plans</h2>
            <p className="text-gray-600 mb-6">
              Turnberry Place floor plans are designed to maximize space, functionality, and luxury living. Each floor plan has been thoughtfully crafted to provide residents with comfortable, elegant living spaces that accommodate various lifestyle needs.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Floor Plan Categories and Sizes</h3>
            <p className="text-gray-600 mb-6">
              Turnberry Place offers floor plans ranging from approximately 1,556 to over 9,000 square feet, accommodating one to four or more bedrooms. The floor plans are organized by size and configuration, with options for single-level residences, multi-level penthouses, and residences with private terraces.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Selecting the Right Floor Plan</h3>
            <p className="text-gray-600 mb-6">
              Selecting the right floor plan at Turnberry Place requires understanding your lifestyle needs, space requirements, and preferences for layout and functionality. Use the filters above to narrow down options by bedroom count, square footage, price range, and tower location.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Contact Dr. Jan Duffy for Floor Plan Information</h2>
            <p className="text-gray-600 mb-4">
              As a Las Vegas real estate expert with deep knowledge of Turnberry Place floor plans, I can provide comprehensive information about available floor plans, their characteristics, and how they accommodate various lifestyle needs.
            </p>
            <p className="text-gray-600">
              <strong>Ready to explore Turnberry Place floor plans?</strong> Contact the office at <a href={`tel:${GBP_PHONE_TEL}`} className="text-amber-600 hover:text-amber-700 underline">{GBP_PHONE_DISPLAY}</a> to discuss available floor plans, schedule a private showing, and learn how different floor plans can accommodate your lifestyle needs.
            </p>
          </div>
        </div>
      </section>

      {/* Add bottom padding when comparison bar is visible */}
      {comparingPlans.length > 0 && <div className="h-32" />}
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<FloorPlansPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
