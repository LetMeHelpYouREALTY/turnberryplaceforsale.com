import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronDown, Expand, Phone, Play, X } from "lucide-react"
import "photoswipe/style.css"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import vimeoVideos from "../data/media/vimeo-videos.json"
import { BUILD_DATE_DISPLAY, BUILD_DATE_ISO } from "lib/build-date"
import { TURNBERRY_GEO } from "lib/schema/geo"
import { tourUrl } from "lib/calendly"

type GalleryCategory = "Residences" | "Stirling Club" | "Views" | "Amenities"
type GalleryFilter = "All" | GalleryCategory

type ImageGalleryItem = {
  id: string
  kind: "image"
  src: string
  full: string
  category: GalleryCategory
  title: string
  description?: string
  alt: string
  height: string
  pswpWidth: number
  pswpHeight: number
}

type VideoGalleryItem = {
  id: string
  kind: "video"
  category: GalleryCategory
  title: string
  description?: string
  // Poster shown in masonry; also used for schema thumbnailUrl
  poster: string
  // Hosted sources (MP4 required, WebM optional)
  sources?: { mp4: string; webm?: string }
  // Optional provider embed (Vimeo)
  provider?: "vimeo"
  vimeoId?: string
  // For layout stability + lightbox aspect ratio (usually 16:9)
  height: string
  pswpWidth: number
  pswpHeight: number
}

type GalleryItem = ImageGalleryItem | VideoGalleryItem

// Generic blur placeholder for string `src` images (lightweight blur-up).
const BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  "PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIg" +
  "eG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9" +
  "IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTExIi8+Cjwvc3ZnPg=="

// Gallery items (23) with category, unique alt text, and lightbox captions.
const galleryItems: GalleryItem[] = [
  {
    id: "hero-exterior",
    kind: "image",
    src: "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    full: "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    category: "Views",
    title: "Turnberry Place Towers",
    description: "Signature luxury high-rise community near the Las Vegas Strip",
    alt: "Turnberry Place luxury high-rise towers near the Las Vegas Strip",
    height: "20rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "penthouse-strip-view",
    kind: "image",
    src: "/images/turnberry/turnberry-tower-nice-view.jpg",
    full: "/images/turnberry/turnberry-tower-nice-view.jpg",
    category: "Views",
    title: "Panoramic Strip View",
    description: "Nighttime city lights and skyline from above",
    alt: "Turnberry Place panoramic Strip view from a high-floor residence",
    height: "15rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "tower-south-view",
    kind: "image",
    src: "/images/turnberry/turnberry-tower-south-view.jpeg",
    full: "/images/turnberry/turnberry-tower-south-view.jpeg",
    category: "Views",
    title: "Tower & City Views",
    description: "Sunset tones across the Las Vegas skyline",
    alt: "Turnberry Place towers at sunset with Las Vegas skyline views",
    height: "18rem",
    pswpWidth: 1920,
    pswpHeight: 1080,
  },
  {
    id: "residence-interior",
    kind: "image",
    src: "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg",
    full: "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg",
    category: "Residences",
    title: "Luxury Residence Interior",
    description: "Premium finishes and open-concept living",
    alt: "Turnberry Place luxury condo interior with premium finishes and open living space",
    height: "22rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "stirling-pool",
    kind: "image",
    src: "/images/turnberry/sterlingclubpool-.jpeg",
    full: "/images/turnberry/sterlingclubpool-.jpeg",
    category: "Stirling Club",
    title: "Stirling Club Pool",
    description: "Resort-style pool experience for residents",
    alt: "Resort-style pool at The Stirling Club at Turnberry Place",
    height: "16rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "stirling-cigar-bar",
    kind: "image",
    src: "/images/turnberry/optimized/StirlingClub_CigarBar_View1.optimized.jpg",
    full: "/images/turnberry/optimized/StirlingClub_CigarBar_View1.optimized.jpg",
    category: "Stirling Club",
    title: "Stirling Club Cigar Room",
    description: "Private lounge atmosphere with classic club finishes",
    alt: "Stirling Club cigar room lounge interior at Turnberry Place",
    height: "20rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "stirling-dining",
    kind: "image",
    src: "/images/turnberry/SterlingClubDinning.avif",
    full: "/images/turnberry/SterlingClubDinning.avif",
    category: "Stirling Club",
    title: "Stirling Club Dining",
    description: "On-site dining and social venues",
    alt: "Dining venue at The Stirling Club at Turnberry Place",
    height: "17rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "stirling-spa-ambience",
    kind: "image",
    src: "/images/turnberry/SterlingClubWhiteRoses.jpg",
    full: "/images/turnberry/SterlingClubWhiteRoses.jpg",
    category: "Stirling Club",
    title: "Wellness & Spa Ambience",
    description: "Luxury details and calm, private atmosphere",
    alt: "Luxury wellness ambiance at The Stirling Club at Turnberry Place",
    height: "19rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "stirling-pool-with-people",
    kind: "image",
    src: "/images/turnberry/sterlingclubpoolwithpeople.jpeg",
    full: "/images/turnberry/sterlingclubpoolwithpeople.jpeg",
    category: "Stirling Club",
    title: "Resort-Style Pool Experience",
    description: "A private club lifestyle built into your residence",
    alt: "Resort-style pool at The Stirling Club with lounge seating and guests",
    height: "15rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "entry-drive",
    kind: "image",
    src: "/images/turnberry/photo-2.jpg",
    full: "/images/turnberry/photo-2.jpg",
    category: "Amenities",
    title: "Guard-Gated Entry",
    description: "Signature arrival and controlled access",
    alt: "Turnberry Place guard-gated entry and landscaped arrival drive",
    height: "16rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "exterior-approach",
    kind: "image",
    src: "/images/turnberry/photo-3.jpg",
    full: "/images/turnberry/photo-3.jpg",
    category: "Amenities",
    title: "Exterior Approach",
    description: "Iconic architecture near the Strip corridor",
    alt: "Turnberry Place exterior approach with towers and palm-lined landscaping",
    height: "20rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "arrival-courtyard",
    kind: "image",
    src: "/images/turnberry/photo-4.jpg",
    full: "/images/turnberry/photo-4.jpg",
    category: "Amenities",
    title: "Arrival Courtyard",
    description: "Landscaping and porte-cochère style arrival",
    alt: "Turnberry Place arrival courtyard with landscaping and tower backdrop",
    height: "14rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "clock-tower",
    kind: "image",
    src: "/images/turnberry/photo-5.jpg",
    full: "/images/turnberry/photo-5.jpg",
    category: "Amenities",
    title: "Signature Entry Architecture",
    description: "Distinctive design details at the entrance",
    alt: "Turnberry Place signature entry architecture with clock tower and palm trees",
    height: "18rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "entry-wide",
    kind: "image",
    src: "/images/turnberry/photo-6.jpg",
    full: "/images/turnberry/photo-6.jpg",
    category: "Amenities",
    title: "Entrance & Towers",
    description: "A luxury high-rise arrival experience",
    alt: "Turnberry Place entrance with towers visible above the gated community",
    height: "16rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "porte-cochere",
    kind: "image",
    src: "/images/turnberry/photo-7.jpg",
    full: "/images/turnberry/photo-7.jpg",
    category: "Amenities",
    title: "Porte-Cochère Arrival",
    description: "Covered arrival and concierge-style service",
    alt: "Turnberry Place porte-cochère arrival with landscaping and tower views",
    height: "20rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "entry-detail",
    kind: "image",
    src: "/images/turnberry/photo-8.jpg",
    full: "/images/turnberry/photo-8.jpg",
    category: "Amenities",
    title: "Entry Detail",
    description: "Architectural detail and landscaped perimeter",
    alt: "Turnberry Place entry detail with landscaping and high-rise towers",
    height: "14rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "grand-lobby-stairs",
    kind: "image",
    src: "/images/turnberry/photo-9.jpg",
    full: "/images/turnberry/photo-9.jpg",
    category: "Amenities",
    title: "Grand Lobby",
    description: "Elegant lobby staircase and chandelier",
    alt: "Turnberry Place grand lobby staircase with chandelier and decorative railings",
    height: "22rem",
    pswpWidth: 1280,
    pswpHeight: 720,
  },
  {
    id: "night-city",
    kind: "image",
    src: "/images/turnberry/photo-21.jpg",
    full: "/images/turnberry/photo-21.jpg",
    category: "Views",
    title: "Las Vegas at Night",
    description: "City lights and skyline atmosphere",
    alt: "Las Vegas skyline at night near Turnberry Place",
    height: "15rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "day-exterior",
    kind: "image",
    src: "/images/turnberry/photo-22.jpg",
    full: "/images/turnberry/photo-22.jpg",
    category: "Views",
    title: "Turnberry Place Exterior",
    description: "Daytime view of towers and community grounds",
    alt: "Turnberry Place exterior daytime view of luxury high-rise towers",
    height: "18rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "primary-exterior",
    kind: "image",
    src: "/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg",
    full: "/images/turnberry/turnberry-towers-las-vegas-nv-primary-photo.jpg",
    category: "Views",
    title: "Towers & Grounds",
    description: "Iconic towers with landscaped amenities",
    alt: "Turnberry Place towers with landscaped grounds near the Las Vegas Strip",
    height: "19rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
  {
    id: "historic-photo",
    kind: "image",
    src: "/images/turnberry/optimized/Turnberry-Place-May-21-2010.optimized.jpg",
    full: "/images/turnberry/optimized/Turnberry-Place-May-21-2010.optimized.jpg",
    category: "Views",
    title: "Turnberry Place (Exterior)",
    description: "Classic exterior photo of the community",
    alt: "Turnberry Place exterior photo showing the luxury high-rise towers",
    height: "14rem",
    pswpWidth: 1200,
    pswpHeight: 800,
  },
  {
    id: "monorail",
    kind: "image",
    src: "/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg",
    full: "/images/turnberry/Turnberry_Towers_Las_Vegas_Monorail.jpg",
    category: "Views",
    title: "Turnberry Towers Location",
    description: "Close proximity to the Las Vegas Strip corridor",
    alt: "Turnberry towers location near Las Vegas monorail and Strip area",
    height: "16rem",
    pswpWidth: 1600,
    pswpHeight: 1000,
  },
]

// Optional videos (only included when URLs are configured so we never ship broken media).
// NOTE: Keep the raw array separately from `.filter()` so TS preserves the `"video"` literal type.
const videoItemsRaw: VideoGalleryItem[] = [
  {
    id: "video-drone-exterior",
    kind: "video",
    category: "Views",
    title: "Drone Exterior Footage",
    description: "Aerial view of Turnberry Place towers and grounds",
    poster: "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    sources: {
      mp4: process.env.NEXT_PUBLIC_TURNBERRY_DRONE_MP4 || "",
      webm: process.env.NEXT_PUBLIC_TURNBERRY_DRONE_WEBM || "",
    },
    height: "18rem",
    pswpWidth: 1920,
    pswpHeight: 1080,
  },
  {
    id: "video-virtual-tour",
    kind: "video",
    category: "Residences",
    title: "Virtual Tour Walkthrough",
    description: "Walkthrough tour of a luxury Turnberry Place residence",
    poster:
  "/images/turnberry/Las-Vegas-High-Rise-Condo-Living-Downtown-Las-Vegas-Turnberry-Place-Interior.jpg",
    sources: {
      mp4: process.env.NEXT_PUBLIC_TURNBERRY_TOUR_MP4 || "",
      webm: process.env.NEXT_PUBLIC_TURNBERRY_TOUR_WEBM || "",
    },
    height: "22rem",
    pswpWidth: 1920,
    pswpHeight: 1080,
  },
  {
    id: "video-stirling-club",
    kind: "video",
    category: "Stirling Club",
    title: "Stirling Club Amenity Showcase",
    description: "Private club amenities and resort-style atmosphere",
    poster: "/images/turnberry/sterlingclubpool-.jpeg",
    sources: {
      mp4: process.env.NEXT_PUBLIC_STIRLING_CLUB_MP4 || "",
      webm: process.env.NEXT_PUBLIC_STIRLING_CLUB_WEBM || "",
    },
    height: "16rem",
    pswpWidth: 1920,
    pswpHeight: 1080,
  },
]

const videoItems = videoItemsRaw.filter((v) => Boolean(v.sources?.mp4))

const vimeoVideoItems: VideoGalleryItem[] = (vimeoVideos as any[])
  .filter((v) => v?.vimeoId)
  .map((v) => ({
    id: v.id || `vimeo-${v.vimeoId}`,
    kind: "video" as const,
    provider: "vimeo" as const,
    vimeoId: String(v.vimeoId),
    category: (v.category || "Views") as GalleryCategory,
    title: v.title || "Turnberry Place Video",
    description: v.description,
    poster: v.poster || "/images/turnberry/Turnberry_Place_For_Sale.jpg",
    height: "18rem",
    pswpWidth: 1920,
    pswpHeight: 1080,
  }))

function MasonryTileMedia({
  item,
  eager,
  sizes,
}: {
  item: GalleryItem
  eager: boolean
  sizes: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (eager) {
      setShouldLoad(true)
      return
    }
    if (shouldLoad) return
    if (typeof window === "undefined") return

    // If IntersectionObserver isn't supported, fall back to mounting immediately.
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true)
      return
    }

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        // Start loading a bit before the tile scrolls into view.
        rootMargin: "600px 0px",
        threshold: 0.01,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [eager, shouldLoad])

  return (
    <div ref={containerRef} className="photos-masonry-media">
      {!shouldLoad ? (
        <div className="photos-skeleton" aria-hidden="true" />
      ) : (
        <>
          {!isLoaded ? <div className="photos-skeleton" aria-hidden="true" /> : null}
          {item.kind === "image" ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              quality={85}
              priority={eager}
              className={isLoaded ? "photos-masonry-img is-loaded" : "photos-masonry-img"}
              onLoadingComplete={() => setIsLoaded(true)}
            />
          ) : (
            <Image
              src={item.poster}
              alt={`${item.title} video poster`}
              fill
              sizes={sizes}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              quality={85}
              priority={eager}
              className={isLoaded ? "photos-masonry-img is-loaded" : "photos-masonry-img"}
              onLoadingComplete={() => setIsLoaded(true)}
            />
          )}
        </>
      )}
    </div>
  )
}

interface PhotosPageProps extends LayoutProps {}

export default function PhotosPage({ menus }: PhotosPageProps) {
  const router = useRouter()
  const heroImage = "/images/turnberry/Turnberry_Place_For_Sale.jpg"
  const allItems = useMemo(
    () => [...vimeoVideoItems, ...videoItems, ...galleryItems],
    []
  )
  const photoCount = allItems.length

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.turnberryplaceforsale.com"

  // Hero background slideshow (crossfade)
  const heroSlides = useMemo(() => {
    const curatedIds = [
      "hero-exterior",
      "penthouse-strip-view",
      "stirling-pool",
      "residence-interior",
    ]
    const curated = curatedIds
      .map((id) => galleryItems.find((g) => g.id === id))
      .filter((g): g is ImageGalleryItem => Boolean(g) && g.kind === "image")
    const fallback = galleryItems.filter(
      (g): g is ImageGalleryItem => g.kind === "image"
    )
    return curated.length ? curated : fallback.slice(0, 4)
  }, [])

  const heroIndexRef = useRef(0)
  const [heroActive, setHeroActive] = useState(0)
  const [heroFadeIn, setHeroFadeIn] = useState<number | null>(null)

  useEffect(() => {
    if (heroSlides.length <= 1) return

    const fadeMs = 900
    const intervalMs = 6500

    const interval = window.setInterval(() => {
      const current = heroIndexRef.current
      const next = (current + 1) % heroSlides.length
      setHeroFadeIn(next)
      window.setTimeout(() => {
        heroIndexRef.current = next
        setHeroActive(next)
        setHeroFadeIn(null)
      }, fadeMs)
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [heroSlides.length])

  const photosMetaDescription = `Explore ${photoCount} professional photos and videos of Turnberry Place luxury condos, the 80,000 sq ft Stirling Club, and panoramic Las Vegas Strip views. Schedule a private tour with Dr. Jan Duffy, on-site Turnberry Place specialist.`

  const phoneHref = "tel:+17025001971"
  const phoneDisplay = "(702) 500-1971"
  const calendlyUrl = tourUrl({ utmMedium: 'cta', utmCampaign: 'photos' })

  const photosOgImages = allItems
    .filter((i): i is ImageGalleryItem => i.kind === "image")
    .slice(0, 5)
    .map((img) => ({
      url: `${baseUrl}${img.full}`,
      alt: img.alt,
    }))

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Photos",
        item: `${baseUrl}/photos`,
      },
    ],
  }

  // ImageGallery JSON-LD enriched per Google's 2026 image / structured-data
  // guidance:
  //   - @id           : stable identifier for this entity (anchored to canonical URL)
  //   - inLanguage    : explicit locale signal
  //   - numberOfItems : explicit count signal (matches visible "{photoCount} Images" copy)
  //   - datePublished / dateModified : freshness signals (BUILD_DATE_ISO is
  //     baked at build time so SSR/CSR match -- avoids React #423/#425)
  //   - mainEntityOfPage : binds the gallery to the canonical web page
  //   - contentLocation : geo coordinates of the building (Turnberry Place
  //     campus entrance, shared with the rest of the site's schema)
  //   - isPartOf       : links this child page back to the parent
  //     ApartmentComplex entity defined on the home page so Google
  //     consolidates the entity graph rather than splitting it per route
  //   - representativeOfPage on the first ImageObject : marks the hero image
  //     as the page's primary visual (helps image-pack ranking)
  const imageObjects = allItems
    .filter((i): i is ImageGalleryItem => i.kind === "image")
    .map((img, idx) => ({
      "@type": "ImageObject" as const,
      contentUrl: `${baseUrl}${img.full}`,
      url: `${baseUrl}${img.full}`,
      name: img.title,
      caption: img.description || img.alt,
      description: img.description || img.alt,
      width: img.pswpWidth,
      height: img.pswpHeight,
      ...(idx === 0 ? { representativeOfPage: true } : {}),
      author: {
        "@type": "Person",
        name: "Dr. Jan Duffy",
      },
    }))

  const videoObjects = allItems
    .filter((i): i is VideoGalleryItem => i.kind === "video")
    .map((v) => ({
      "@type": "VideoObject" as const,
      name: v.title,
      description: v.description || v.title,
      contentUrl: v.sources?.mp4,
      embedUrl:
        v.provider === "vimeo" && v.vimeoId
          ? `https://player.vimeo.com/video/${v.vimeoId}`
          : undefined,
      thumbnailUrl: `${baseUrl}${v.poster}`,
      uploadDate: BUILD_DATE_ISO,
      author: {
        "@type": "Person",
        name: "Dr. Jan Duffy",
      },
    }))

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${baseUrl}/photos#gallery`,
    name: "Turnberry Place Las Vegas Photo Gallery",
    description: photosMetaDescription,
    url: `${baseUrl}/photos`,
    inLanguage: "en-US",
    numberOfItems: allItems.length,
    datePublished: BUILD_DATE_ISO,
    dateModified: BUILD_DATE_ISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/photos`,
    },
    isPartOf: {
      "@type": "ApartmentComplex",
      "@id": `${baseUrl}/#apartmentcomplex`,
    },
    contentLocation: {
      "@type": "Place",
      name: "Turnberry Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2827 Paradise Rd",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      geo: TURNBERRY_GEO,
    },
    image: imageObjects,
    hasPart: videoObjects,
  }

  // FAQPage schema paired with the visible FAQ section below. Questions are
  // first-person and grounded in facts already cited elsewhere on this site
  // (Wikipedia, lib/schema/apartmentComplex.ts, CLAUDE.md). No fabricated
  // counts, ratings, or rankings.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/photos#faq`,
    inLanguage: "en-US",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many photos and videos are in the Turnberry Place gallery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The gallery currently contains ${photoCount} curated items showcasing Turnberry Place residences, the Stirling Club, panoramic Strip views, and community amenities. I refresh it whenever new professional photography is delivered.`,
        },
      },
      {
        "@type": "Question",
        name: "Can I tour Turnberry Place in person after viewing the photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. As an on-site Turnberry Place specialist, I host private tours seven days a week by appointment. Call (702) 500-1971 or book a 30-minute slot through Calendly to walk specific units, the Stirling Club, and any tower you're considering.",
        },
      },
      {
        "@type": "Question",
        name: "What does The Stirling Club include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Stirling Club is the 80,000 sq ft private residents' club at Turnberry Place. It includes a state-of-the-art fitness center, resort-style pools, tennis courts, spa services, on-site dining venues, and event spaces. Membership is reserved for owners and qualified residents.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of views do Turnberry Place condos have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because the four towers sit one block east of the Strip between Wynn/Encore and Sahara, view corridors include direct Las Vegas Strip skyline, the Spring Mountains and Red Rock to the west, and downtown to the north. Higher floors and corner units typically have multiple view exposures.",
        },
      },
      {
        "@type": "Question",
        name: "When was Turnberry Place built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The four Turnberry Place towers were built in phases between 2000 and 2005, ranging from 38 to 45 stories. The Stirling Club was renovated in recent years and is now operating as a fully revived private club.",
        },
      },
    ],
  }

  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("All")
  const [isFading, setIsFading] = useState(false)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [pullProgress, setPullProgress] = useState(0)
  const [canReleaseRefresh, setCanReleaseRefresh] = useState(false)
  const canReleaseRefreshRef = useRef(false)
  const [showViewAll, setShowViewAll] = useState(false)
  const viewAllSentinelRef = useRef<HTMLDivElement | null>(null)

  const galleryRef = useRef<HTMLDivElement | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const viewedUniqueIdsRef = useRef<Set<string>>(new Set())
  const [srAnnouncement, setSrAnnouncement] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [mobileFooterVisible, setMobileFooterVisible] = useState(true)

  // Exit-intent (desktop only) lead capture
  const [exitIntentOpen, setExitIntentOpen] = useState(false)
  const [exitEmail, setExitEmail] = useState("")
  const [exitSubmitting, setExitSubmitting] = useState(false)
  const [exitSubmitted, setExitSubmitted] = useState<"idle" | "success" | "error">("idle")

  // Detect mobile viewport (Bootstrap xs breakpoint). Used ONLY for behavior, not rendering.
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 575.98px)")
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener?.("change", apply)
    return () => mq.removeEventListener?.("change", apply)
  }, [])

  // Mobile-only: enable page-level scroll snapping without affecting other routes.
  useEffect(() => {
    if (!isMobile) return
    document.body.classList.add("photos-mobile-native")
    // Hide the global navbar on /photos mobile to keep the UI app-like.
    // We do this both visually and from the accessibility tree (inert/aria-hidden).
    document.documentElement.style.setProperty("--navbar-height", "0px")
    const nav = document.querySelector(".card-top-nav") as HTMLElement | null
    const prevDisplay = nav?.style.display
    if (nav) {
      nav.style.display = "none"
      nav.setAttribute("aria-hidden", "true")
      ;(nav as any).inert = true
    }
    return () => {
      document.body.classList.remove("photos-mobile-native")
      document.documentElement.style.removeProperty("--navbar-height")
      if (nav) {
        nav.style.display = prevDisplay || ""
        nav.removeAttribute("aria-hidden")
        ;(nav as any).inert = false
      }
    }
  }, [isMobile])

  // Mobile-only: smart sticky footer (hide on scroll down, show on scroll up).
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isMobile) return
    if (isLightboxOpen) return

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setMobileFooterVisible(true)
      return
    }

    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (Math.abs(delta) > 10) {
          if (delta > 0 && y > 80) setMobileFooterVisible(false)
          if (delta < 0) setMobileFooterVisible(true)
          lastY = y
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isMobile, isLightboxOpen])

  // Desktop-only: exit intent modal (once per session).
  useEffect(() => {
    if (typeof window === "undefined") return
    if (isMobile) return
    if (exitIntentOpen) return

    const already = window.sessionStorage.getItem("tp_photos_exit_intent_shown")
    if (already) return

    const onMouseOut = (e: MouseEvent) => {
      // Leaving toward top edge
      if (e.clientY > 0) return
      const target = e.relatedTarget as Node | null
      if (target) return
      window.sessionStorage.setItem("tp_photos_exit_intent_shown", "1")
      setExitIntentOpen(true)
      setExitSubmitted("idle")
    }

    window.addEventListener("mouseout", onMouseOut)
    return () => window.removeEventListener("mouseout", onMouseOut)
  }, [isMobile, exitIntentOpen])

  const submitExitIntent = async () => {
    if (!exitEmail) return
    setExitSubmitting(true)
    setExitSubmitted("idle")
    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Gallery Visitor",
          email: exitEmail,
          message: "Exclusive listings request from /photos (exit intent)",
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setExitSubmitted("success")
    } catch {
      setExitSubmitted("error")
    } finally {
      setExitSubmitting(false)
    }
  }

  // Mobile: pull-to-refresh (lightweight). Pull down at top, release to refresh.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isMobile) return

    let startY = 0
    let pulling = false

    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 0) return
      startY = e.touches?.[0]?.clientY || 0
      pulling = true
      setPullProgress(0)
      setCanReleaseRefresh(false)
      canReleaseRefreshRef.current = false
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling) return
      if (window.scrollY > 0) return
      const y = e.touches?.[0]?.clientY || 0
      const dy = Math.max(0, y - startY)
      const progress = Math.min(1, dy / 110)
      setPullProgress(progress)
      const can = dy >= 110
      setCanReleaseRefresh(can)
      canReleaseRefreshRef.current = can
    }

    const onTouchEnd = () => {
      if (!pulling) return
      const shouldRefresh = canReleaseRefreshRef.current
      pulling = false
      setPullProgress(0)
      setCanReleaseRefresh(false)
      canReleaseRefreshRef.current = false
      if (shouldRefresh) window.location.reload()
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)
    window.addEventListener("touchcancel", onTouchEnd)
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [isMobile])

  const counts = useMemo(() => {
    const byCategory: Record<GalleryCategory, number> = {
      Residences: 0,
      "Stirling Club": 0,
      Views: 0,
      Amenities: 0,
    }
    allItems.forEach((i) => {
      byCategory[i.category] += 1
    })
    return byCategory
  }, [])

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return allItems
    return allItems.filter((i) => i.category === activeFilter)
  }, [activeFilter])

  useEffect(() => {
    setIsFading(true)
    const t = window.setTimeout(() => setIsFading(false), 160)
    return () => window.clearTimeout(t)
  }, [activeFilter])

  // Mobile: track which tile is "active" while scrolling to update the sticky header counter.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isMobile) return
    if (!("IntersectionObserver" in window)) return

    const items = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#photos-masonry a[data-gallery-index]")
    )
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0]
        if (!visible?.target) return
        const idxStr = (visible.target as HTMLElement).getAttribute("data-gallery-index")
        const idx = idxStr ? Number(idxStr) : 0
        if (!Number.isNaN(idx)) {
          setMobileActiveIndex(idx)
          const item = filteredItems[idx]
          if (item) {
            setSrAnnouncement(`Image ${idx + 1} of ${filteredItems.length}: ${item.title}`)
          }
        }
      },
      {
        root: null,
        threshold: [0.55],
      }
    )

    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeFilter, filteredItems.length])

  // Desktop+mobile: scroll reveal with IntersectionObserver (staggered by 100ms).
  useEffect(() => {
    if (typeof window === "undefined") return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("#photos-masonry a[data-gallery-index]")
    )
    if (!els.length) return

    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach((el) => el.classList.add("is-inview"))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          const idx = Number(el.getAttribute("data-gallery-index") || "0")
          el.style.setProperty("--reveal-delay", `${idx * 100}ms`)
          el.classList.add("is-inview")
          obs.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [activeFilter, filteredItems.length])

  // Floating "View All" button appears after scrolling past the hero.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("IntersectionObserver" in window)) return
    const sentinel = viewAllSentinelRef.current
    if (!sentinel) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setShowViewAll(!entry.isIntersecting)
      },
      { threshold: 0.01 }
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  // Filter with FLIP animation (subtle) + staggered fade-in for new layout.
  const setFilterWithFlip = (next: GalleryFilter) => {
    if (next === activeFilter) return
    if (typeof window === "undefined") {
      setActiveFilter(next)
      return
    }

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setActiveFilter(next)
      return
    }

    const before = new Map<string, DOMRect>()
    document
      .querySelectorAll<HTMLElement>("#photos-masonry a[data-item-id]")
      .forEach((el) => {
        const id = el.getAttribute("data-item-id") || ""
        if (!id) return
        before.set(id, el.getBoundingClientRect())
      })

    setActiveFilter(next)

    window.requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>("#photos-masonry a[data-item-id]")
        .forEach((el) => {
          const id = el.getAttribute("data-item-id") || ""
          if (!id) return
          const first = before.get(id)
          const last = el.getBoundingClientRect()
          if (!first) return

          const dx = first.left - last.left
          const dy = first.top - last.top
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return

          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "translate(0px, 0px)" },
            ],
            { duration: 260, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
          )
        })
    })
  }

  // Initialize PhotoSwipe for the currently displayed items (re-inits on filter change for thumb strip).
  useEffect(() => {
    let lightbox: any = null
    let cancelled = false

    function raf(): Promise<void> {
      return new Promise((resolve) => {
        window.requestAnimationFrame(() => resolve())
      })
    }

    async function init() {
      // Wait a tick (or two) for the masonry DOM to exist before initializing PhotoSwipe.
      // If the gallery element isn't present, PhotoSwipe will throw "Element not found".
      for (let i = 0; i < 20; i++) {
        if (
          document.querySelector("#photos-masonry") &&
          document.querySelector("#photos-masonry a[data-pswp-item]")
        ) {
          break
        }
        // eslint-disable-next-line no-await-in-loop
        await raf()
      }

      const gallerySelector = "#photos-masonry"
      const galleryEl = document.querySelector(gallerySelector)
      if (!galleryEl || cancelled) return

      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default
      if (cancelled) return

      const lightboxOptions: any = {
        gallery: gallerySelector,
        children: "a[data-pswp-item]",
        pswpModule: () => import("photoswipe"),
        showHideAnimationType: "zoom",
        bgOpacity: 0.92,
        preload: [1, 2],
        wheelToZoom: true,
        // Accessibility / keyboard behavior
        trapFocus: true,
        returnFocus: true,
        escKey: true,
        arrowKeys: true,
      }

      lightbox = new PhotoSwipeLightbox(lightboxOptions)

      lightbox.on("uiRegister", () => {
        const pswp = lightbox.pswp
        if (!pswp?.ui) return

        // Fullscreen toggle
        pswp.ui.registerElement({
          name: "luxFs",
          order: 4,
          isButton: true,
          appendTo: "bar",
          html: "Fullscreen",
          onClick: () => {
            const root = document.documentElement
            if (!document.fullscreenElement) {
              root.requestFullscreen?.()
            } else {
              document.exitFullscreen?.()
            }
          },
        })

        // Caption (title + optional description)
        pswp.ui.registerElement({
          name: "luxCaption",
          order: 9,
          isButton: false,
          appendTo: "root",
          onInit: (el: HTMLElement, pswp: any) => {
            el.className = "pswp__lux-caption"
            el.setAttribute("role", "note")
            el.setAttribute("aria-label", "Photo caption")

            const render = () => {
              const idx = pswp.currIndex ?? 0
              const item = filteredItems[idx]
              if (!item) return
              const title = item.title
              const desc = item.description ? `<div class="pswp__lux-desc">${item.description}</div>` : ""
              el.innerHTML = `<div class="pswp__lux-title">${title}</div>${desc}`
            }
            pswp.on("change", render)
            render()
          },
        })

        // Counter: "3 of 23"
        pswp.ui.registerElement({
          name: "luxCounter",
          order: 7,
          isButton: false,
          appendTo: "bar",
          onInit: (el: HTMLElement, pswp: any) => {
            el.className = "pswp__lux-counter"
            el.setAttribute("role", "status")
            el.setAttribute("aria-live", "polite")
            const render = () => {
              const idx = (pswp.currIndex ?? 0) + 1
              el.textContent = `${idx} of ${filteredItems.length}`
            }
            pswp.on("change", render)
            render()
          },
        })

        // Share (copy link)
        pswp.ui.registerElement({
          name: "luxShare",
          order: 5,
          isButton: true,
          appendTo: "bar",
          html: "Share",
          onClick: async (event: any, el: HTMLElement, pswp: any) => {
            const idx = pswp.currIndex ?? 0
            const item = filteredItems[idx]
            if (!item) return
            const url = new URL(window.location.href)
            url.searchParams.set("photo", item.id)
            url.searchParams.set("filter", activeFilter)
            try {
              await navigator.clipboard.writeText(url.toString())
              el.classList.add("is-copied")
              window.setTimeout(() => el.classList.remove("is-copied"), 900)
            } catch {
              // Fallback: prompt
              // eslint-disable-next-line no-alert
              window.prompt("Copy link:", url.toString())
            }
          },
        })

        // Download button
        pswp.ui.registerElement({
          name: "luxDownload",
          order: 6,
          isButton: true,
          appendTo: "bar",
          html: "Download",
          onClick: (event: any, el: HTMLElement, pswp: any) => {
            const src = pswp.currSlide?.data?.src
            if (!src) return
            const a = document.createElement("a")
            a.href = src
            a.download = ""
            document.body.appendChild(a)
            a.click()
            a.remove()
          },
        })

        // Thumbnails strip (simple)
        pswp.ui.registerElement({
          name: "luxThumbs",
          order: 10,
          isButton: false,
          appendTo: "root",
          onInit: (el: HTMLElement, pswp: any) => {
            el.className = "pswp__lux-thumbs"

            const thumbUrlFor = (src: string) =>
              `/_next/image?url=${encodeURIComponent(src)}&w=96&q=70`

            const render = () => {
              const current = pswp.currIndex ?? 0
              el.innerHTML = filteredItems
                .map((item, i) => {
                  const active = i === current ? "is-active" : ""
                  const thumbSrc = item.kind === "image" ? item.src : item.poster
                  const thumbUrl = thumbUrlFor(thumbSrc)
                  return `<button type="button" class="pswp__lux-thumb ${active}" data-idx="${i}" aria-label="${item.title}">
                    <img src="${thumbUrl}" alt="" loading="lazy" />
                  </button>`
                })
                .join("")
            }

            el.addEventListener("click", (e) => {
              const target = e.target as HTMLElement
              const btn = target.closest("button[data-idx]") as HTMLButtonElement | null
              if (!btn) return
              const idx = Number(btn.getAttribute("data-idx"))
              if (!Number.isNaN(idx)) pswp.goTo(idx)
            })

            pswp.on("change", render)
            render()
          },
        })

        // Lightbox footer CTA (non-intrusive)
        pswp.ui.registerElement({
          name: "luxCta",
          order: 11,
          isButton: false,
          appendTo: "root",
          onInit: (el: HTMLElement) => {
            el.className = "pswp__lux-cta"
            el.setAttribute("role", "note")
            el.setAttribute("aria-label", "Call to action")
            el.innerHTML =
              `Want to see this in person? ` +
              `<a href="${phoneHref}" class="pswp__lux-cta-link">${phoneDisplay}</a>`
          },
        })
      })

      // Sync mobile counter with lightbox navigation (and hide our header/FABs while open).
      lightbox.on("open", () => {
        setIsLightboxOpen(true)
        const pswp = lightbox.pswp
        if (pswp) {
          setMobileActiveIndex(pswp.currIndex ?? 0)
          pswp.on("change", () => setMobileActiveIndex(pswp.currIndex ?? 0))
          const idx = pswp.currIndex ?? 0
          const item = filteredItems[idx]
          if (item) setSrAnnouncement(`Image ${idx + 1} of ${filteredItems.length}: ${item.title}`)
          pswp.on("change", () => {
            const idx2 = pswp.currIndex ?? 0
            const item2 = filteredItems[idx2]
            if (item2) setSrAnnouncement(`Image ${idx2 + 1} of ${filteredItems.length}: ${item2.title}`)
          })

          // Lazy-load and optionally autoplay videos on open/change
          const isMobileViewport =
            window.matchMedia && window.matchMedia("(max-width: 575.98px)").matches

          const initVideoForCurrent = () => {
            const container = pswp.currSlide?.container
            if (!container) return
            const iframe = container.querySelector("iframe[data-src]") as HTMLIFrameElement | null
            if (iframe) {
              // Lazy-load Vimeo (or other embed) iframe src only when opened.
              const isMobileViewport =
                window.matchMedia && window.matchMedia("(max-width: 575.98px)").matches
              const ds = iframe.getAttribute("data-src")
              if (ds && !iframe.src) {
                // Mobile: don't autoplay to reduce data usage
                iframe.src = isMobileViewport ? ds.replace("autoplay=1", "autoplay=0") : ds
              }
              return
            }

            const video = container.querySelector("video") as HTMLVideoElement | null
            if (!video) return

            // Load sources lazily from data-src
            const sources = Array.from(video.querySelectorAll("source")) as HTMLSourceElement[]
            sources.forEach((s) => {
              const ds = s.getAttribute("data-src")
              if (ds && !s.src) s.src = ds
            })
            if (video.readyState === 0) {
              try {
                video.load()
              } catch {
                // ignore
              }
            }

            // Desktop: autoplay muted, Mobile: tap to play (data-friendly)
            if (!isMobileViewport) {
              video.muted = true
              video.playsInline = true
              // Attempt autoplay (allowed because muted)
              video.play().catch(() => {})
            }

            const actionHandler = (e: Event) => {
              const target = e.target as HTMLElement | null
              const btn = target?.closest?.("[data-video-action]") as HTMLElement | null
              if (!btn) return
              const action = btn.getAttribute("data-video-action")
              if (!action) return
              if (action === "unmute") {
                video.muted = false
                video.volume = 1
                video.play().catch(() => {})
              }
              if (action === "pip") {
                const anyVid = video as any
                if (document.pictureInPictureElement) {
                  ;(document as any).exitPictureInPicture?.().catch?.(() => {})
                } else {
                  anyVid.requestPictureInPicture?.().catch?.(() => {})
                }
              }
              if (action === "fs") {
                ;(video as any).requestFullscreen?.()
              }
            }

            // Attach once per slide container
            if (!(container as any).__tpVideoBound) {
              container.addEventListener("click", actionHandler)
              ;(container as any).__tpVideoBound = true
            }
          }

          const stopAllVideos = () => {
            const root = pswp.element || document
            root.querySelectorAll("video").forEach((v) => {
              try {
                ;(v as HTMLVideoElement).pause()
              } catch {}
            })
          }

          stopAllVideos()
          initVideoForCurrent()
          pswp.on("change", () => {
            stopAllVideos()
            initVideoForCurrent()
          })
        }

        // CTA toast after 5+ image views (once per session)
        try {
          const already = window.sessionStorage.getItem("tp_photos_tour_toast_shown")
          if (!already) {
            const idx = pswp?.currIndex ?? 0
            const item = filteredItems[idx]
            if (item?.id) viewedUniqueIdsRef.current.add(item.id)
          }
          pswp?.on("change", () => {
            try {
              const already2 = window.sessionStorage.getItem("tp_photos_tour_toast_shown")
              if (already2) return
              const idx2 = pswp?.currIndex ?? 0
              const item2 = filteredItems[idx2]
              if (item2?.id) viewedUniqueIdsRef.current.add(item2.id)
              if (viewedUniqueIdsRef.current.size >= 5) {
                window.sessionStorage.setItem("tp_photos_tour_toast_shown", "1")
                setToastVisible(true)
              }
            } catch {
              // ignore
            }
          })
        } catch {
          // ignore
        }
      })
      lightbox.on("close", () => {
        setIsLightboxOpen(false)
      })

      lightbox.init()
    }

    init()

    return () => {
      cancelled = true
      if (lightbox) lightbox.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, filteredItems.length])

  return (
    <Layout menus={menus}>
      <Head>
        <script
          key="photos_breadcrumb_schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          key="photos_image_gallery_schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(imageGallerySchema),
          }}
        />
        <script
          key="photos_faq_schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </Head>
      <Meta
        title="Photo Gallery - Turnberry Place Las Vegas"
        description={photosMetaDescription}
        ogImages={photosOgImages}
        path="/photos"
      />
      <JsonLdSchema type="property" />
      <BreadcrumbSchema items={[{ name: 'Photos', url: 'https://www.turnberryplaceforsale.com/photos' }]} />
      <div className="card-content card-photos photos-page">
        <a className="skip-link" href="#after-gallery">
          Skip gallery
        </a>

        <div className="sr-only" role="status" aria-live="polite">
          Image gallery, {filteredItems.length} images.
            </div>
        <div className="sr-only" role="status" aria-live="polite">
          {srAnnouncement}
          </div>
        {/* Mobile-only sticky header */}
        {!isLightboxOpen ? (
          <div
            className="photos-mobile-header photos-mobile-only"
            role="banner"
            aria-label="Gallery navigation"
          >
            <div
              className="photos-mobile-pullbar"
                        aria-hidden="true"
              style={{ transform: `scaleX(${pullProgress})` }}
            />
            <button
              type="button"
              className="photos-mobile-back"
              onClick={() => {
                if (window.history.length > 1) router.back()
                else router.push("/")
              }}
              aria-label="Go back"
            >
              <ArrowLeft className="photos-mobile-icon" aria-hidden="true" />
            </button>
            <div className="photos-mobile-title">
              {canReleaseRefresh ? "Release to refresh" : "Gallery"}
            </div>
            <div className="photos-mobile-counter" aria-label="Image position">
              {mobileActiveIndex + 1}/{filteredItems.length}
            </div>
          </div>
        ) : null}

        {/* Category quick-jump dots (desktop) */}
        <nav className="photos-jumpdots d-none d-md-flex" aria-label="Jump to category">
          {(["All", "Residences", "Stirling Club", "Views", "Amenities"] as const).map((label) => {
            const isActive = activeFilter === label
            return (
              <button
                key={label}
                type="button"
                className={isActive ? "photos-jumpdot is-active" : "photos-jumpdot"}
                onClick={() => {
                  setFilterWithFlip(label as GalleryFilter)
                  galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                aria-label={`Show ${label} photos`}
              />
            )
          })}
        </nav>

        {/* Floating View All button */}
        {showViewAll && activeFilter !== "All" ? (
          <button
            type="button"
            className="photos-viewall"
            onClick={() => {
              setFilterWithFlip("All")
              galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            aria-label="View all photos"
          >
            View All
          </button>
        ) : null}

        {/* Mobile floating action buttons */}
        {!isLightboxOpen ? (
          <div
            className={
              mobileFooterVisible
                ? "photos-mobile-footer photos-mobile-only is-visible"
                : "photos-mobile-footer photos-mobile-only"
            }
            role="contentinfo"
            aria-label="Quick actions"
          >
            <a
              className="photos-mobile-footer-call"
              href={phoneHref}
              aria-label={`Call ${phoneDisplay}`}
            >
              <Phone className="photos-mobile-footer-icon" aria-hidden="true" />
              <span>Call</span>
            </a>
            <a
              className="photos-mobile-footer-tour"
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="photos-mobile-footer-icon" aria-hidden="true" />
              <span>Schedule Tour</span>
              <span className="sr-only"> (opens Calendly in a new tab)</span>
            </a>
          </div>
        ) : null}

        {/* Subtle toast CTA (once per session) */}
        {toastVisible ? (
          <div className="photos-toast" role="status" aria-live="polite">
            <div className="photos-toast-inner">
              <div className="photos-toast-text">
                Like what you see? <strong>Schedule a private tour.</strong>
                </div>
              <a
                className="photos-toast-cta"
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule
              </a>
              <button
                type="button"
                className="photos-toast-close"
                onClick={() => setToastVisible(false)}
                aria-label="Dismiss"
              >
                <X className="photos-toast-close-icon" aria-hidden="true" />
              </button>
              </div>
          </div>
        ) : null}

        {/* HERO */}
        <section className="photos-hero" aria-label="Turnberry Place photo gallery hero">
          <div className="photos-hero-media" aria-hidden="true">
            {/* Active slide (LCP-focused). `priority` preloads the image,
                `fetchPriority="high"` is the modern Resource Hints signal that
                Lighthouse looks for explicitly when scoring LCP in 2026. */}
            <div className="photos-hero-slide is-active">
                        <Image
                src={heroSlides[heroActive]?.src || heroImage}
                alt={
                  heroSlides[heroActive]?.alt ||
                  "Turnberry Place Las Vegas luxury high-rise condos"
                }
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={85}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="photos-hero-img"
              />
                    </div>

            {/* Fade-in slide (preloads next background) */}
            {heroFadeIn !== null ? (
              <div className="photos-hero-slide is-fade-in">
                <Image
                  src={heroSlides[heroFadeIn]?.src || heroImage}
                  alt={
                    heroSlides[heroFadeIn]?.alt ||
                    "Turnberry Place Las Vegas luxury high-rise condos"
                  }
                  fill
                  sizes="100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="photos-hero-img"
                />
                  </div>
            ) : null}
              </div>
          <div className="photos-hero-overlay" aria-hidden="true" />
          <div className="container photos-hero-inner">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 text-center">
                <h1 className="photos-hero-title">Experience Turnberry Place</h1>
                <p className="photos-hero-subtitle">
                  {photoCount} Images of Las Vegas Luxury Living
                </p>
                <div className="photos-hero-ctas" aria-label="Primary actions">
                  <a
                    href={calendlyUrl}
                    className="photos-btn photos-btn-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="photos-hero-schedule"
                  >
                    Schedule Private Tour
                    <span className="sr-only"> (opens Calendly in a new tab)</span>
                  </a>
                  <a
                    href={phoneHref}
                    className="photos-btn photos-btn-outline"
                    data-cta="photos-hero-call"
                  >
                    Call Now: {phoneDisplay}
                  </a>
                </div>
            </div>
            </div>
          </div>
          <div className="photos-hero-scroll" aria-hidden="true">
            <ChevronDown className="photos-hero-chevron" />
          </div>
        </section>

        {/* View-all sentinel (used for floating button visibility). Placed after hero. */}
        <div ref={viewAllSentinelRef} aria-hidden="true" style={{ height: 1 }} />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Filter tabs + actions */}
              <div className="photos-toolbar">
                <div className="photos-tabs" role="tablist" aria-label="Photo categories">
                  {(["All", "Residences", "Stirling Club", "Views", "Amenities"] as const).map(
                    (label) => {
                      const count =
                        label === "All"
                          ? allItems.length
                          : counts[label as GalleryCategory]
                      const isActive = activeFilter === label
                      return (
                        <button
                          key={label}
                          type="button"
                          className={isActive ? "photos-tab is-active" : "photos-tab"}
                          onClick={() => setFilterWithFlip(label as GalleryFilter)}
                          role="tab"
                          aria-selected={isActive}
                        >
                          <span className="photos-tab-label">{label}</span>
                          <span className="photos-tab-count" aria-hidden="true">
                            {count}
                  </span>
                        </button>
                      )
                    }
                  )}
            </div>
                <div className="photos-toolbar-actions">
                  <Link
                    href="/tour"
                    className="photos-slideshow-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Launch Slideshow
                  </Link>
                </div>
                </div>
                      </div>
                  </div>
              <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div ref={galleryRef} aria-hidden="true" />
              <div
                id="photos-masonry"
                className={isFading ? "photos-masonry is-fading" : "photos-masonry"}
                aria-live="polite"
              >
                {filteredItems.map((item, index) => {
                  const eager = index < 4
                  const sizes =
                    "(max-width: 575px) 100vw, (max-width: 991px) 50vw, 25vw"

                  const insertMidCta = activeFilter === "All" && index === 7

                  const vimeoEmbedUrl =
                    item.kind === "video" && item.provider === "vimeo" && item.vimeoId
                      ? `https://player.vimeo.com/video/${item.vimeoId}`
                      : null

                  return (
                  <Fragment key={item.id}>
                  <a
                    href={
                      item.kind === "image"
                        ? item.full
                        : vimeoEmbedUrl || item.sources?.mp4 || item.poster
                    }
                    data-pswp-item
                    data-gallery-index={index}
                    data-item-id={item.id}
                    data-pswp-width={item.pswpWidth}
                    data-pswp-height={item.pswpHeight}
                    data-pswp-type={item.kind === "video" ? "html" : undefined}
                    data-pswp-html={
                      item.kind === "video"
                        ? item.provider === "vimeo" && item.vimeoId
                          ? `<div class="pswp-video" role="group" aria-label="${item.title}">
                               <div class="pswp-video-embed" data-provider="vimeo">
                                 <iframe
                                   class="pswp-video-iframe"
                                   title="${item.title}"
                                   data-src="https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&muted=1&autopause=1&dnt=1&transparent=0"
                                   frameborder="0"
                                   allow="autoplay; fullscreen; picture-in-picture"
                                   allowfullscreen
                                   loading="lazy"
                                 ></iframe>
                               </div>
                               <div class="pswp-video-actions" aria-label="Video actions">
                                 <a class="pswp-video-btn" href="https://vimeo.com/${item.vimeoId}" target="_blank" rel="noopener noreferrer" aria-label="Open on Vimeo">
                                   Open on Vimeo
                                 </a>
                               </div>
                             </div>`
                          : `<div class="pswp-video" role="group" aria-label="${item.title}">
                               <video class="pswp-video-el" controls playsinline muted preload="none" poster="${item.poster}">
                                 <source data-src="${item.sources?.webm || ""}" type="video/webm" />
                                 <source data-src="${item.sources?.mp4 || ""}" type="video/mp4" />
                               </video>
                               <div class="pswp-video-actions" aria-label="Video controls">
                                 <button type="button" class="pswp-video-btn" data-video-action="unmute" aria-label="Unmute video">Unmute</button>
                                 <button type="button" class="pswp-video-btn" data-video-action="fs" aria-label="Fullscreen video">Fullscreen</button>
                                 <button type="button" class="pswp-video-btn" data-video-action="pip" aria-label="Picture in picture">PiP</button>
                               </div>
                             </div>`
                        : undefined
                    }
                    data-pswp-caption={`<strong>${item.title}</strong>${
                      item.description ? `<br/>${item.description}` : ""
                    }`}
                    className="photos-masonry-item"
                    aria-label={
                      item.kind === "video"
                        ? `Open video in fullscreen viewer: ${item.title}`
                        : `Open image in fullscreen viewer: ${item.title}`
                    }
                  >
                    <div
                      className="photos-masonry-card"
                      style={{
                        height: item.height,
                        // Provides extra layout stability across browsers and prevents CLS.
                        aspectRatio: `${item.pswpWidth}/${item.pswpHeight}`,
                      }}
                    >
                      <MasonryTileMedia item={item} eager={eager} sizes={sizes} />
                      {item.kind === "video" ? (
                        <div className="photos-video-play" aria-hidden="true">
                          <Play className="photos-video-play-icon" />
              </div>
                      ) : null}
                      <div className="photos-mobile-expand" aria-hidden="true">
                        <Expand className="photos-mobile-expand-icon" />
                      </div>
                      <div className="photos-masonry-overlay" aria-hidden="true">
                        <div className="photos-masonry-caption">
                          <div className="photos-masonry-title">{item.title}</div>
                          {item.description ? (
                            <div className="photos-masonry-desc">{item.description}</div>
                          ) : null}
                </div>
                      </div>
                    </div>
                  </a>
                  {insertMidCta ? (
                    <div className="photos-inline-cta" role="region" aria-label="Interested in Turnberry Place">
                      <div className="photos-inline-cta-inner">
                        <div className="photos-inline-cta-title">Interested in Turnberry Place?</div>
                        <div className="photos-inline-cta-sub">
                          Get current listings or schedule a private tour with Dr. Jan Duffy.
                        </div>
                        <div className="photos-inline-cta-actions">
                          <Link
                            href="/available-condos"
                            className="photos-btn photos-btn-outline"
                            aria-label="View available condos"
                            data-cta="photos-mid-view-available"
                          >
                            View Available Condos
                          </Link>
                          <a
                            href={calendlyUrl}
                            className="photos-btn photos-btn-gold"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="photos-mid-schedule"
                          >
                            Schedule Tour
                            <span className="sr-only"> (opens Calendly in a new tab)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  </Fragment>
                  )
                })}
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12 col-lg-10 mx-auto">
              <section className="photos-post-cta" aria-label="Experience Turnberry Place">
                <div className="photos-post-cta-inner">
                  <div className="photos-post-cta-title">Experience Turnberry Place</div>
                  <div className="photos-post-cta-sub">
                    Schedule your private showing today.
                  </div>
                  <div className="photos-post-cta-actions">
                    <a
                      href={phoneHref}
                      className="photos-btn photos-btn-outline"
                      data-cta="photos-post-call"
                    >
                      Call: {phoneDisplay}
                    </a>
                    <a
                      href={calendlyUrl}
                      className="photos-btn photos-btn-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="photos-post-book"
                    >
                      Book Online
                      <span className="sr-only"> (opens Calendly in a new tab)</span>
                    </a>
                  </div>
                </div>
              </section>
              <h2>About This Turnberry Place Photo Gallery</h2>
              <p>
                I'm Dr. Jan Duffy, the on-site Turnberry Place specialist with Berkshire Hathaway HomeServices Nevada Properties. I curated this gallery from {photoCount} professional photographs and videos so you can preview the residences, the Stirling Club, the views, and the arrival experience before you visit. Every photo is from inside or around the four-tower campus at 2827 Paradise Rd &mdash; nothing borrowed from stock libraries.
              </p>

              <h2 className="mt-5">Luxury Residences</h2>
              <p>
                Turnberry Place is comprised of four high-rise towers built between 2000 and 2005, ranging from 38 to 45 stories and reaching 477 ft at the top. Floor plans run from approximately 1,179 sq ft one-bedroom layouts to 8,000+ sq ft penthouses with up to three view exposures. Premium finishes include Italian marble baths, European cabinetry, granite countertops, and Sub-Zero / Gaggenau appliances in higher-tier units. The interior photos here show typical finish levels you can expect when I tour you through specific available units.
              </p>

              <h2 className="mt-4">The Stirling Club</h2>
              <p>
                The Stirling Club is the 80,000 sq ft private residents&rsquo; club at the heart of Turnberry Place, recently restored and now fully operational. It includes a state-of-the-art fitness center, resort-style pools, four clay tennis courts, spa services, multiple dining venues, and event spaces. Membership is reserved for Turnberry Place owners and qualified residents, which is why these interior photos are difficult to find anywhere else online.
              </p>

              <h2 className="mt-4">Panoramic Views</h2>
              <p>
                Because Turnberry Place sits one block east of the Las Vegas Strip, between Wynn/Encore and Sahara, view corridors include direct Strip skyline, Spring Mountains and Red Rock to the west, and downtown to the north. Higher floors and corner units typically offer multiple exposures. When you book a private showing, I'll match the units I show you to the view orientation you care about most.
              </p>

              <h2 className="mt-4">Community Amenities</h2>
              <p>
                Turnberry Place is guard-gated with 24-hour controlled access, valet parking, concierge, and 24-hour front-lobby service. Residents enjoy the Stirling Club, landscaped grounds, and immediate access to over twenty Zagat-rated dining venues within a one-mile radius, plus McCarran International Airport approximately ten minutes south.
              </p>

              <h2 className="mt-5">Frequently Asked Questions</h2>
              <p className="text-muted">
                Common questions I answer when prospective buyers reach out after browsing this gallery.
              </p>

              <details className="photos-faq-item mt-3">
                <summary><strong>How many photos and videos are in the Turnberry Place gallery?</strong></summary>
                <p className="mt-2">
                  The gallery currently contains {photoCount} curated items showcasing Turnberry Place residences, the Stirling Club, panoramic Strip views, and community amenities. I refresh it whenever new professional photography is delivered.
                </p>
              </details>

              <details className="photos-faq-item mt-2">
                <summary><strong>Can I tour Turnberry Place in person after viewing the photos?</strong></summary>
                <p className="mt-2">
                  Yes. As an on-site Turnberry Place specialist, I host private tours seven days a week by appointment. Call <a href="tel:+17025001971" className="text-decoration-underline">(702) 500-1971</a> or book a 30-minute slot through Calendly to walk specific units, the Stirling Club, and any tower you're considering.
                </p>
              </details>

              <details className="photos-faq-item mt-2">
                <summary><strong>What does The Stirling Club include?</strong></summary>
                <p className="mt-2">
                  The Stirling Club is the 80,000 sq ft private residents&rsquo; club at Turnberry Place. It includes a state-of-the-art fitness center, resort-style pools, four clay tennis courts, spa services, on-site dining venues, and event spaces. Membership is reserved for owners and qualified residents.
                </p>
              </details>

              <details className="photos-faq-item mt-2">
                <summary><strong>What kinds of views do Turnberry Place condos have?</strong></summary>
                <p className="mt-2">
                  Because the four towers sit one block east of the Strip between Wynn/Encore and Sahara, view corridors include direct Las Vegas Strip skyline, the Spring Mountains and Red Rock to the west, and downtown to the north. Higher floors and corner units typically have multiple view exposures.
                </p>
              </details>

              <details className="photos-faq-item mt-2">
                <summary><strong>When was Turnberry Place built?</strong></summary>
                <p className="mt-2">
                  The four Turnberry Place towers were built in phases between 2000 and 2005, ranging from 38 to 45 stories. The Stirling Club was renovated in recent years and is now operating as a fully revived private club.
                </p>
              </details>

              <p className="mt-4">
                <strong>Ready to see Turnberry Place in person?</strong> Contact the office at <a href="tel:+17025001971" className="text-decoration-underline">(702) 500-1971</a> to schedule a private showing.
              </p>

              <p className="mt-4 text-muted small">
                Last updated: {BUILD_DATE_DISPLAY}
              </p>
            </div>
          </div>
          <div id="after-gallery" />
        </div>
      </div>

      {/* Desktop exit-intent modal */}
      {exitIntentOpen ? (
        <div className="photos-exit" role="dialog" aria-modal="true" aria-label="Exclusive listings signup">
          <div className="photos-exit-overlay" onClick={() => setExitIntentOpen(false)} aria-hidden="true" />
          <div className="photos-exit-card">
            <button
              type="button"
              className="photos-exit-close"
              onClick={() => setExitIntentOpen(false)}
              aria-label="Close"
            >
              <X aria-hidden="true" />
            </button>
            <div className="photos-exit-title">Before you go…</div>
            <div className="photos-exit-sub">
              Get exclusive Turnberry Place listings.
            </div>
            <div className="photos-exit-form">
              <label className="sr-only" htmlFor="photos-exit-email">
                Email
              </label>
              <input
                id="photos-exit-email"
                className="photos-exit-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email address"
                value={exitEmail}
                onChange={(e) => setExitEmail(e.target.value)}
              />
              <button
                type="button"
                className="photos-btn photos-btn-gold"
                onClick={submitExitIntent}
                disabled={exitSubmitting || !exitEmail}
                aria-label="Get updates"
              >
                {exitSubmitting ? "Sending…" : "Get Updates"}
              </button>
            </div>
            {exitSubmitted === "success" ? (
              <div className="photos-exit-msg is-success" role="status" aria-live="polite">
                Thanks — we’ll send you new listings.
              </div>
            ) : null}
            {exitSubmitted === "error" ? (
              <div className="photos-exit-msg is-error" role="status" aria-live="polite">
                Something went wrong. Please try again or call <a href={phoneHref}>{phoneDisplay}</a>.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<PhotosPageProps>> {
  // Handle Drupal connection errors gracefully
  try {
    return {
      props: {
        menus: await getMenus({} as any),
      },
    }
  } catch (error) {
    // If Drupal is not available, return empty menus
    // This allows the build to continue without Drupal
    return {
      props: {
        menus: {
          main: [],
          footer: [],
        },
      },
    }
  }
}
