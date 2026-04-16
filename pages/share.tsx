import { GetStaticPropsResult } from "next"
import Head from "next/head"
import { useState } from "react"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { SEOHead } from "../components/seo/SEOHead"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import DigitalCard from "components/digital-card"
import CalendlyEmbed from "components/calendly-embed"
import CalendlyButton from "components/calendly-button"

interface SharePageProps extends LayoutProps {}

export default function SharePage({ menus }: SharePageProps) {
  const [formData, setFormData] = useState({
    friendname: "",
    friendemail: "",
    yourname: "",
    youremail: "",
    sharemessage: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!formData.friendname.trim()) newErrors.push("Friend's name is required")
    if (!formData.friendemail.trim()) newErrors.push("Friend's email is required")
    if (!formData.yourname.trim()) newErrors.push("Your name is required")
    if (!formData.youremail.trim()) newErrors.push("Your email is required")
    if (formData.friendemail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.friendemail)) {
      newErrors.push("Friend's email is invalid")
    }
    if (formData.youremail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.youremail)) {
      newErrors.push("Your email is invalid")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    setSubmitted(true)
    // In production, this would send to an API endpoint
  }

  const resetForm = () => {
    setFormData({
      friendname: "",
      friendemail: "",
      yourname: "",
      youremail: "",
      sharemessage: "",
    })
    setSubmitted(false)
    setErrors([])
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://www.turnberryplaceforsale.com"
  const shareTitle = "Turnberry Place Las Vegas | Luxury High-Rise Condos For Sale"
  const shareDescription = "Discover luxury high-rise condos for sale at Turnberry Place Las Vegas. Featuring 1-4 bedroom residences with Strip views, & exclusive Stirling Club"
  const shareImage = "/images/turnberry/Turnberry_Place_For_Sale.jpg"

  return (
    <Layout menus={menus}>
      {/* SEO Meta Tags */}
      <SEOHead path="/share" />
      
      {/* Keep Meta component for backward compatibility */}
      <Meta
        title="Share Turnberry Place | Digital Business Card & Schedule Tour"
        description="Share Turnberry Place Las Vegas with friends and family. Save Dr. Jan Duffy's contact info, schedule a tour, or send via text, email, or social media."
        ogImage="/images/turnberry/Turnberry_Place_For_Sale.jpg"
        ogImageAlt="Turnberry Place Las Vegas luxury high-rise condominium community"
        path="/share"
      />
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <JsonLdSchema type="property" />
      <BreadcrumbSchema currentPageTitle="Share Turnberry Place | Digital Business Card" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Share Turnberry Place Las Vegas
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Share this exceptional luxury community with friends, family, or colleagues. 
            Save contact info, schedule a tour, or send directly via text or email.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Digital Business Card */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                Digital Business Card
              </h2>
              <DigitalCard cardId="2271764" />
              
              {/* Quick Actions Below Card */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm mb-4">
                  Quick actions: Save to contacts, scan QR code, or share via text
                </p>
                <CalendlyButton 
                  text="Schedule a Private Tour" 
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Calendly Embed */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                Book Your Private Tour
              </h2>
              <CalendlyEmbed />
            </div>
            
          </div>
        </div>
      </section>

      {/* Social Share Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Share on Social Media
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareDescription)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </a>
            
            <a
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E60023] hover:bg-[#AD081B] text-white py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
              </svg>
              Pinterest
            </a>
          </div>
        </div>
      </section>

      {/* Send to Friend Form */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center mb-4 text-2xl font-bold">Send to a Friend</h2>
                  <p className="text-center mb-4">
                    Share Turnberry Place with someone specific using our send-to-friend form. Add a personal message to let them know why you think they'd be interested in this exceptional luxury community.
                  </p>
                  
                  {submitted ? (
                    <div className="text-center py-4">
                      <h4 className="text-success mb-3">
                        <i className="fa fa-check text-success"></i> Message Sent
                      </h4>
                      <button
                        onClick={resetForm}
                        className="btn btn-primary"
                      >
                        Send Again
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="share-form">
                      {errors.length > 0 && (
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="friendname" className="form-label">
                            Friend's name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="friendname"
                            value={formData.friendname}
                            onChange={(e) =>
                              setFormData({ ...formData, friendname: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="friendemail" className="form-label">
                            Friend's email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="friendemail"
                            value={formData.friendemail}
                            onChange={(e) =>
                              setFormData({ ...formData, friendemail: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="yourname" className="form-label">
                            Your name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="yourname"
                            value={formData.yourname}
                            onChange={(e) =>
                              setFormData({ ...formData, yourname: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="youremail" className="form-label">
                            Your email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="youremail"
                            value={formData.youremail}
                            onChange={(e) =>
                              setFormData({ ...formData, youremail: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="sharemessage" className="form-label">
                          Optional message
                        </label>
                        <textarea
                          className="form-control"
                          id="sharemessage"
                          rows={4}
                          value={formData.sharemessage}
                          onChange={(e) =>
                            setFormData({ ...formData, sharemessage: e.target.value })
                          }
                        />
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Send to Friend
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="row mt-5">
            <div className="col-12 col-lg-10 mx-auto">
              <h2>Why Share Turnberry Place</h2>
              <p>
                Turnberry Place represents one of Las Vegas's most exceptional luxury high-rise communities, offering an unparalleled combination of location, amenities, security, and lifestyle benefits. Sharing Turnberry Place with friends, family, or colleagues helps them discover this exceptional community and provides them with the opportunity to explore luxury living in Las Vegas's most desirable location.
              </p>
              <h3>Exceptional Location and Convenience</h3>
              <p>
                Turnberry Place's location just one block from the Las Vegas Strip provides residents with immediate access to world-class restaurants, entertainment venues, shopping, and business centers. Sharing this location advantage helps others understand the convenience and accessibility that Turnberry Place offers, as well as the lifestyle benefits that come with this prime positioning. The development's proximity to the Strip, combined with its privacy and security, creates a unique value proposition that's worth sharing.
              </p>
              <h3>World-Class Amenities and Lifestyle</h3>
              <p>
                Turnberry Place's exclusive access to The Stirling Club, an 80,000-square-foot private membership facility, provides residents with amenities that rival the best private clubs worldwide. Sharing information about these amenities helps others understand the comprehensive lifestyle benefits that Turnberry Place provides, including fitness facilities, pools, tennis courts, spa services, dining venues, and social spaces. These amenities create a true luxury lifestyle experience that's worth sharing with those who appreciate quality and convenience.
              </p>
              <h3>Investment Potential and Value</h3>
              <p>
                Turnberry Place's established reputation, prime location, and comprehensive amenities create strong investment potential that makes it worth sharing with those interested in luxury real estate investments. The development's limited inventory, combined with strong demand from both domestic and international buyers, creates favorable conditions for price appreciation. Sharing this investment potential helps others understand the value proposition and long-term benefits of Turnberry Place ownership.
              </p>

              <h2>How to Share Turnberry Place</h2>
              <p>
                Sharing Turnberry Place is easy and convenient, whether you prefer social media sharing or sending a personalized message directly to someone you know. Both methods help others discover this exceptional community and provide them with the information they need to explore Turnberry Place further.
              </p>
              <h3>Social Media Sharing</h3>
              <p>
                Social media sharing provides a quick and convenient way to share Turnberry Place with your network. The social share buttons above allow you to share Turnberry Place on Facebook, Twitter, Pinterest, and LinkedIn with just one click. These shares include the Turnberry Place website URL, description, and images, providing your network with comprehensive information about the community. Social media sharing is particularly effective for reaching a broad audience and generating interest among those who might not be actively searching for luxury properties.
              </p>
              <h3>Send-to-Friend Form</h3>
              <p>
                The send-to-friend form provides a more personalized way to share Turnberry Place with specific individuals. This form allows you to add a personal message explaining why you think the recipient would be interested in Turnberry Place, making the share more meaningful and relevant. The send-to-friend option is particularly effective for sharing with friends, family members, or colleagues who you know are interested in luxury living or real estate investments.
              </p>
              <h3>Direct Recommendations</h3>
              <p>
                In addition to online sharing tools, you can also recommend Turnberry Place directly to friends, family, or colleagues who might be interested. Personal recommendations carry significant weight and can be particularly effective when you can speak from experience or knowledge about the community. Whether you're a current resident, have visited Turnberry Place, or have researched the community extensively, your personal recommendation can help others discover this exceptional luxury community.
              </p>

              <h2>What to Share About Turnberry Place</h2>
              <p>
                When sharing Turnberry Place, consider highlighting the aspects that make it exceptional and relevant to your audience. Different people may be interested in different aspects of Turnberry Place, so tailoring your share to your audience's interests can make your recommendation more effective and relevant.
              </p>
              <h3>Location and Convenience</h3>
              <p>
                Highlight Turnberry Place's prime location just one block from the Las Vegas Strip, emphasizing the convenience and accessibility this provides. Mention the proximity to world-class restaurants, entertainment venues, shopping, and business centers, as well as the privacy and security that the development maintains despite this central location. This location advantage appeals to those who value convenience and want to be at the center of Las Vegas's vibrant energy.
              </p>
              <h3>Amenities and Lifestyle</h3>
              <p>
                Emphasize The Stirling Club's comprehensive amenities, including fitness facilities, pools, tennis courts, spa services, dining venues, and social spaces. Highlight how these amenities create a true luxury lifestyle experience and eliminate the need for separate club memberships. This amenity focus appeals to those who value convenience, quality, and comprehensive lifestyle benefits.
              </p>
              <h3>Investment and Value</h3>
              <p>
                For those interested in real estate investments, emphasize Turnberry Place's established reputation, strong demand, and appreciation potential. Highlight the development's limited inventory, prime location, and comprehensive amenities that support long-term value. This investment focus appeals to those who are considering luxury real estate as an investment opportunity.
              </p>

              <h2>Benefits of Sharing Turnberry Place</h2>
              <p>
                Sharing Turnberry Place provides benefits for both you and those you share with. For recipients, sharing provides access to information about an exceptional luxury community they might not have discovered otherwise. For you, sharing can help friends, family, or colleagues discover a community that might meet their needs while potentially creating opportunities for referrals or community connections.
              </p>
              <h3>Helping Others Discover Quality</h3>
              <p>
                Sharing Turnberry Place helps others discover a luxury community that represents exceptional quality, value, and lifestyle benefits. Your share provides them with information they might not have found independently, potentially helping them discover a community that meets their needs and preferences. This sharing creates value for recipients while demonstrating your knowledge and interest in quality real estate.
              </p>
              <h3>Building Community Connections</h3>
              <p>
                Sharing Turnberry Place with others can help build community connections, whether you're a current resident, prospective buyer, or simply someone who appreciates quality real estate. If others you share with become interested in Turnberry Place, you may have the opportunity to connect with them as neighbors or community members. These connections can enhance your own Turnberry Place experience while helping others discover the community.
              </p>
              <h3>Supporting Real Estate Professionals</h3>
              <p>
                Sharing Turnberry Place also supports real estate professionals like Dr. Jan Duffy who work to help buyers and sellers achieve their goals. When you share Turnberry Place and others become interested, you're helping connect them with expert guidance and support that can help them make informed decisions. This support benefits both recipients and the real estate professionals who serve them.
              </p>

              <h2>Contact Dr. Jan Duffy for More Information</h2>
              <p>
                If you or someone you've shared Turnberry Place with has questions or wants to learn more, I'm here to provide comprehensive information and expert guidance. As a Las Vegas real estate expert with over 30 years of experience and deep knowledge of Turnberry Place, I can answer questions, provide detailed information, and help interested parties explore this exceptional community further.
              </p>
              <p>
                Whether you're sharing Turnberry Place with others or have received a share and want to learn more, I'm available to provide the information and support you need. My goal is to help everyone discover the exceptional quality and lifestyle that Turnberry Place offers and find the perfect luxury residence that meets their needs.
              </p>
              <p className="mt-4">
                <strong>Have questions about Turnberry Place?</strong> Contact the office at <a href="tel:+17025001971" className="text-decoration-underline">(702) 500-1971</a>. I'm here to provide comprehensive information about Turnberry Place and help you or those you've shared with explore this exceptional luxury community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<SharePageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
