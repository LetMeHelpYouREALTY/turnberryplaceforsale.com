import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { GBPMapCard } from "components/gbp-map-card"
import Link from "next/link"

interface OpenHousePageProps extends LayoutProps {}

export default function OpenHousePage({ menus }: OpenHousePageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Open House - Turnberry Place Las Vegas"
        description="Open house and private showing info for Turnberry Place luxury high-rise condos near the Las Vegas Strip. Las Vegas Strip High Rise Condos for Sale. Call (702) 500-1971."
        path="/open-house"
      />
      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Open House', url: 'https://www.turnberryplaceforsale.com/open-house' }]} />
      <div
        className="card-content card-open-house"
        style={{
          backgroundImage: "url(/images/turnberry/turnberry-tower-nice-view.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 text-center py-5 px-0">
              <div className="open-house-box p-2 p-md-4 shadow">
                <h1 className="mt-2 mb-2 text-heading text-uppercase">
                  Turnberry Place Las Vegas Open House Information
                </h1>
                <div className="d-flex mb-3 mb-lg-4 align-items-center justify-content-center">
                  <div className="d-none d-md-block w-10 horiz-line"></div>
                  <h2 className="my-0 mx-2 text-uppercase">Open House</h2>
                  <div className="d-none d-md-block w-10 horiz-line"></div>
                </div>
                <div className="text-center pb-4">
                  <p className="none-scheduled">No open houses currently scheduled</p>
                  <p className="mb-3">Schedule a private showing today to experience Turnberry Place luxury living!</p>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <Link href="/request-details" className="btn btn-custom btn-lg" title="Request Showing">
                      Request Showing
                    </Link>
                    <a href="tel:+17025001971" className="btn btn-custom btn-lg" title="Call (702) 500-1971">
                      Call (702) 500-1971
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-content py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <h2>Private Showings at Turnberry Place</h2>
              <p>
                While we don't currently have scheduled open houses, private showings are available by appointment to provide you with a personalized, comprehensive tour of Turnberry Place luxury residences. Private showings offer several advantages over traditional open houses, including personalized attention, flexible scheduling, and the opportunity to explore properties at your own pace. As a Las Vegas real estate expert with over 30 years of experience, I can provide detailed information about Turnberry Place residences, amenities, and lifestyle during your private showing.
              </p>
              <h3>Benefits of Private Showings</h3>
              <p>
                Private showings provide a more personalized and focused experience compared to traditional open houses. During a private showing, you'll receive undivided attention, allowing you to ask questions, explore properties thoroughly, and discuss your specific needs and preferences. This personalized approach enables me to provide detailed information about Turnberry Place's features, amenities, and lifestyle benefits that are relevant to your interests. Private showings also offer flexibility in scheduling, allowing you to view properties at times that are convenient for you.
              </p>
              <h3>Scheduling Your Private Showing</h3>
              <p>
                Scheduling a private showing is simple and convenient. You can request a showing through our online form or contact the office at (702) 500-1971. I'll work with you to find a time that fits your schedule and coordinate access to the properties you're interested in viewing. Whether you're visiting from out of town or are a local resident, I can accommodate your scheduling needs to ensure you have the opportunity to experience Turnberry Place's luxury living firsthand.
              </p>
              <h3>What to Expect During Your Showing</h3>
              <p>
                During your private showing, you'll have the opportunity to explore Turnberry Place residences in detail, including interior spaces, views, finishes, and features. I'll provide information about the development's amenities, The Stirling Club, security features, and lifestyle benefits. You'll also have the opportunity to ask questions about pricing, availability, financing options, and any other aspects of Turnberry Place that interest you. This comprehensive experience helps you make informed decisions about whether Turnberry Place is the right choice for your luxury living needs.
              </p>

              <h2>Turnberry Place Residences Available for Viewing</h2>
              <p>
                Turnberry Place offers a variety of luxury residences available for private viewing, ranging from one to four bedrooms and from approximately 1,200 to over 8,000 square feet. These residences span all four towers and include various floor levels, views, and finishes. During your private showing, we can explore residences that match your preferences for size, layout, view, and price range.
              </p>
              <h3>Residence Types and Sizes</h3>
              <p>
                Turnberry Place residences range from efficient one-bedroom units perfect for professionals or second-home owners to expansive penthouses designed for luxury living and entertaining. Two-bedroom residences provide additional space for home offices or guest accommodations, while three and four-bedroom residences offer maximum space and flexibility. During your private showing, we can explore residences that match your space requirements and lifestyle needs, helping you identify the perfect Turnberry Place residence for your situation.
              </p>
              <h3>View Options and Orientations</h3>
              <p>
                Turnberry Place residences offer various view options, including Strip views, mountain views, city views, and combinations of these vistas. During your private showing, we can explore residences with different orientations and floor levels to help you identify the views you value most. Understanding view options helps you make informed decisions about which residences best meet your preferences and provide the lifestyle experience you're seeking.
              </p>
              <h3>Pricing and Availability</h3>
              <p>
                Turnberry Place residences are available at various price points, ranging from approximately $800,000 to over $10 million. During your private showing, I can provide detailed information about current pricing, availability, and market conditions that affect property values. This information helps you understand the investment potential and value propositions of different residences, enabling you to make informed decisions about which properties align with your budget and goals.
              </p>

              <h2>The Turnberry Place Experience</h2>
              <p>
                A private showing at Turnberry Place provides the opportunity to experience the development's luxury lifestyle firsthand. During your visit, you'll see not only individual residences but also the development's amenities, common areas, and lifestyle features that make Turnberry Place one of Las Vegas's most desirable luxury condominium communities.
              </p>
              <h3>Exploring The Stirling Club</h3>
              <p>
                During your private showing, we can arrange a tour of The Stirling Club, Turnberry Place's exclusive 80,000-square-foot private membership facility. This tour provides insight into the world-class amenities available exclusively to residents, including the fitness center, pools, tennis courts, spa facilities, dining venues, and social spaces. Experiencing The Stirling Club firsthand helps you understand the comprehensive lifestyle benefits that Turnberry Place provides and how these amenities enhance daily living.
              </p>
              <h3>Security and Privacy Features</h3>
              <p>
                During your private showing, you'll experience Turnberry Place's security and privacy features, including the guard-gated entrance, 24-hour security, and secure building access. These features create the sense of safety and seclusion that luxury living requires, and experiencing them firsthand helps you understand how they enhance the overall living experience. The development's raised elevation and strategic positioning also minimize street noise, creating a tranquil environment despite the proximity to the Strip.
              </p>
              <h3>Location and Convenience</h3>
              <p>
                Your private showing provides the opportunity to experience Turnberry Place's prime location just one block from the Las Vegas Strip. This location offers immediate access to world-class restaurants, entertainment venues, shopping, and business centers, while maintaining the privacy and security that luxury living requires. Experiencing this location firsthand helps you understand the convenience and accessibility that Turnberry Place provides, as well as the lifestyle benefits that come with this prime positioning.
              </p>

              <h2>Preparing for Your Private Showing</h2>
              <p>
                Preparing for your private showing helps ensure that you make the most of your visit to Turnberry Place. Understanding what to bring, what questions to ask, and what to look for during your showing helps you gather the information you need to make informed decisions about Turnberry Place residences.
              </p>
              <h3>What to Bring</h3>
              <p>
                When preparing for your private showing, consider bringing a notebook or device to take notes, a list of questions you'd like answered, and any specific requirements or preferences you have for your ideal residence. If you're working with a lender, you may also want to bring pre-approval documentation, though this isn't required for a showing. Being prepared helps ensure that you gather all the information you need during your visit.
              </p>
              <h3>Questions to Ask</h3>
              <p>
                During your private showing, don't hesitate to ask questions about residences, amenities, pricing, availability, financing options, HOA fees, and any other aspects of Turnberry Place that interest you. I'm here to provide comprehensive information and answer any questions you have, helping you understand all aspects of Turnberry Place living. Your questions help me understand your needs and preferences, enabling me to provide more targeted guidance and recommendations.
              </p>
              <h3>What to Look For</h3>
              <p>
                During your private showing, pay attention to residence layouts, finishes, views, natural light, storage space, and how residences function for daily living and entertaining. Consider how different residences accommodate your lifestyle needs, preferences, and daily routines. Taking note of these characteristics helps you identify residences that best meet your requirements and provides a basis for comparing different options.
              </p>

              <h2>After Your Private Showing</h2>
              <p>
                After your private showing, I'll be available to answer follow-up questions, provide additional information, and help you move forward with your Turnberry Place purchase if you're ready. Whether you need time to consider your options, want to view additional residences, or are ready to make an offer, I'm here to support you through every step of the process.
              </p>
              <h3>Follow-Up and Additional Information</h3>
              <p>
                After your private showing, I can provide additional information about residences you viewed, comparable properties, market conditions, and any other aspects of Turnberry Place that interest you. I'm also available to answer follow-up questions that may arise as you consider your options. This ongoing support ensures that you have all the information you need to make informed decisions about Turnberry Place residences.
              </p>
              <h3>Next Steps</h3>
              <p>
                After your private showing, the next steps depend on your situation and timeline. If you're ready to move forward, we can discuss making an offer, financing options, and the purchase process. If you need more time to consider your options, I can provide additional information, schedule additional showings, or help you explore other Turnberry Place residences that might meet your needs. Whatever your situation, I'm here to help you move forward at a pace that's comfortable for you.
              </p>

              <h2>Contact Dr. Jan Duffy to Schedule Your Private Showing</h2>
              <p>
                Ready to experience Turnberry Place luxury living firsthand? Contact me today to schedule your private showing. As a Las Vegas real estate expert with over 30 years of experience and deep knowledge of Turnberry Place, I can provide you with a comprehensive, personalized tour that helps you understand the exceptional quality and lifestyle that Turnberry Place offers.
              </p>
              <p>
                Whether you're interested in a specific residence, want to explore multiple options, or are just beginning your search for luxury living in Las Vegas, I'm here to help. My goal is to provide you with the information, guidance, and support you need to make informed decisions about Turnberry Place and find the perfect residence that meets your needs and exceeds your expectations.
              </p>
              <p className="mt-4">
                <strong>Schedule your private showing today!</strong> Contact the office at <a href="tel:+17025001971" className="text-decoration-underline">(702) 500-1971</a> or <Link href="/request-details" className="text-decoration-underline">request a showing online</Link>. With my extensive knowledge of Turnberry Place and the Las Vegas luxury market, I can provide you with an exceptional showing experience that helps you discover the perfect luxury residence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GBPMapCard heading="Find Us for Your Private Showing" />
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<OpenHousePageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
