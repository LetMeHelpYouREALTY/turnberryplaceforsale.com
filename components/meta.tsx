import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { DrupalMetatag } from "types/drupal"

interface MetaProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogImageAlt?: string
  ogImages?: { url: string; alt?: string }[]
  appendPrimaryKeyword2ToTitle?: boolean
  path?: string
  tags?: DrupalMetatag[]
}

const PRIMARY_KEYWORD_1 = "Turnberry Towers Las Vegas High Rise Condos"
const PRIMARY_KEYWORD_2 = "Las Vegas Strip High Rise Condos for Sale"

function withSuffix(base: string, suffix: string) {
  if (!base) return suffix
  const normalizedBase = base.toLowerCase()
  const normalizedSuffix = suffix.toLowerCase()
  if (normalizedBase.includes(normalizedSuffix)) return base
  return `${base} | ${suffix}`
}

export function Meta({
  title,
  description,
  keywords,
  ogImage,
  ogImageAlt,
  ogImages,
  appendPrimaryKeyword2ToTitle = false,
  path,
  tags,
}: MetaProps) {
  const router = useRouter()

  // Ensure www is always used as primary domain for canonical URLs
  const getBaseUrl = (): string => {
    let envUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.turnberryplaceforsale.com"
    // Force www if not present
    if (envUrl.includes('turnberryplaceforsale.com') && !envUrl.includes('www.')) {
      envUrl = envUrl.replace('turnberryplaceforsale.com', 'www.turnberryplaceforsale.com')
    }
    // Ensure www prefix and remove trailing slash
    envUrl = envUrl.replace(/^https?:\/\/(?!www\.)/, 'https://www.').replace(/\/$/, '')
    return envUrl
  }
  
  const baseUrl = getBaseUrl()
  
  // Normalize canonical URL: remove trailing slashes (except root), remove query strings, ensure consistent format
  const normalizePath = (path: string): string => {
    if (!path || path === '/') return ''
    // Remove query strings and hash fragments for canonical
    const cleanPath = path.split('?')[0].split('#')[0]
    // Remove trailing slash (except for root)
    return cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath
  }
  
  const normalizedPath = normalizePath(path || router.asPath)
  const canonicalUrl = `${baseUrl}${normalizedPath}`

  // Brand-forward defaults, but reinforce the two primary keyword themes sitewide.
  const defaultTitle = withSuffix(
    "Turnberry Place Las Vegas High Rise Condos",
    PRIMARY_KEYWORD_2
  )
  // Avoid bloating every page title. By default:
  // - If a page provides a custom title, use it as-is (unless explicitly asked to append).
  // - If no title is provided, fall back to a keyword-reinforced default.
  const effectiveTitle =
    title && appendPrimaryKeyword2ToTitle ? withSuffix(title, PRIMARY_KEYWORD_2) : title || defaultTitle

  // Keep this succinct and natural; avoid stuffing while still including the exact phrases.
  const defaultDescription =
    "Turnberry Place luxury high-rise condos near the Las Vegas Strip. " +
    `${PRIMARY_KEYWORD_1} & ${PRIMARY_KEYWORD_2}. ` +
    "Call (702) 500-1971."
  const effectiveDescription = description || defaultDescription

  // Note: meta keywords are not used by Google, but we keep them for completeness and other crawlers/tools.
  const defaultKeywords = [
    PRIMARY_KEYWORD_1,
    PRIMARY_KEYWORD_2,
    "Turnberry Place for sale",
    "Turnberry Place condos",
    "Las Vegas high-rise condos",
    "luxury condos Las Vegas",
    "Las Vegas Strip condos",
    "Stirling Club",
    "Dr. Jan Duffy REALTOR",
  ].join(", ")
  const effectiveKeywords = keywords || defaultKeywords

  const defaultOgImage =
    "https://www.turnberryplaceforsale.com/images/turnberry/Turnberry_Place_For_Sale.jpg"
  const effectiveOgImage = ogImage || defaultOgImage
  const effectiveOgImageAlt =
    ogImageAlt ||
    "Turnberry Place Las Vegas - Luxury High-Rise Condominiums with Panoramic Strip Views"

  const effectiveOgImages =
    ogImages?.length
      ? ogImages
      : [{ url: effectiveOgImage, alt: effectiveOgImageAlt }]

  return (
    <Head>
      <link
        key="canonical_link"
        rel="canonical"
        href={canonicalUrl}
      />
      {tags?.length ? (
        tags.map((tag, index) => {
          if (tag.attributes.rel === "canonical") {
            return null
          }

          if (tag.attributes.name === "title") {
            return (
              <title key={tag.attributes.name}>{tag.attributes.content}</title>
            )
          }
          const Tag = tag.tag as keyof React.JSX.IntrinsicElements
          return <Tag key={index} {...tag.attributes}></Tag>
        })
      ) : (
        <>
          {/* Primary SEO Title - Optimized for Luxury Real Estate */}
          <title>{effectiveTitle}</title>
          
          {/* Enhanced Meta Description with Luxury Keywords */}
          <meta
            key="description"
            name="description"
            content={effectiveDescription}
          />
          
          {/* Keywords for Luxury Real Estate */}
          <meta
            key="keywords"
            name="keywords"
            content={effectiveKeywords}
          />
          
          {/* Open Graph Tags - Optimized for Social Sharing */}
          <meta
            key="og_title"
            property="og:title"
            content={effectiveTitle}
          />
          <meta
            key="og_description"
            property="og:description"
            content={effectiveDescription}
          />
          <meta
            key="og_url"
            property="og:url"
            content={canonicalUrl}
          />
          <meta
            key="og_type"
            property="og:type"
            content="website"
          />
          <meta
            key="og_site_name"
            property="og:site_name"
            content="Turnberry Place High Rise Condos | Homes by Dr. Jan Duffy"
          />
          {/* Open Graph image(s) */}
          {effectiveOgImages.map((img, idx) => (
            <React.Fragment key={`og_img_${idx}`}>
              <meta property="og:image" content={img.url} />
              {img.alt ? <meta property="og:image:alt" content={img.alt} /> : null}
            </React.Fragment>
          ))}
          <meta key="og_image_width" property="og:image:width" content="1200" />
          <meta
            key="og_image_height"
            property="og:image:height"
            content="630"
          />
          <meta
            key="og_image_type"
            property="og:image:type"
            content="image/jpeg"
          />
          <meta
            key="og_locale"
            property="og:locale"
            content="en_US"
          />
          
          {/* Twitter Card Tags - Optimized */}
          <meta
            key="twitter_card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            key="twitter_title"
            name="twitter:title"
            content={effectiveTitle}
          />
          <meta
            key="twitter_description"
            name="twitter:description"
            content={effectiveDescription}
          />
          <meta
            key="twitter_image"
            name="twitter:image"
            content={effectiveOgImages[0]?.url || effectiveOgImage}
          />
          <meta
            key="twitter_image_alt"
            name="twitter:image:alt"
            content={
              effectiveOgImages[0]?.alt || effectiveOgImageAlt
            }
          />
          <meta
            key="twitter_site"
            name="twitter:site"
            content="@TurnberryPlaceLV"
          />
          
          {/* Hreflang alternates.
              - en: the canonical English page.
              - es: a Google Translate wrapper (the site has no native ES
                localization today; this tells Google an ES equivalent
                exists without claiming it's a first-party localization).
              - x-default: required by Google for international targeting
                (https://developers.google.com/search/docs/specialty/international/localized-versions).
                Points at the canonical EN URL so users without a matching
                locale land on the primary experience. */}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={canonicalUrl}
          />
          <link
            rel="alternate"
            hrefLang="en"
            href={canonicalUrl}
          />
          <link
            rel="alternate"
            hrefLang="es"
            href={`https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=${encodeURIComponent(canonicalUrl)}`}
          />
        </>
      )}
    </Head>
  )
}
