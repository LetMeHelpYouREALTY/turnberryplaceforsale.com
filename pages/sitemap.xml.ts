import { GetServerSideProps } from 'next'

// Ensure www is always used as primary domain
const baseUrl = (() => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  // Force www if not present
  if (envUrl.includes('turnberryplaceforsale.com') && !envUrl.includes('www.')) {
    return envUrl.replace('turnberryplaceforsale.com', 'www.turnberryplaceforsale.com')
  }
  return envUrl.replace(/\/$/, '') // Remove trailing slash
})()

// All static pages - ensure no trailing slashes
const staticPages = [
  '',
  '/price-features',
  '/towers',
  '/amenities',
  '/photos',
  '/map',
  '/open-house',
  '/request-details',
  '/agent',
  '/available-condos',
  '/floor-plans',
  '/share',
  '/stirling-club',
  '/neighborhood',
  '/accessibility',
  '/mls',
]

/** Query variants for listings filters; `&` escaped for XML. */
const availableCondosTowerPaths = [1, 2, 3, 4].map((n) => `/available-condos?tower=${n}`)

function generateSiteMap() {
  const today = new Date().toISOString().split('T')[0]

  const staticUrls = staticPages.map((path) => {
    const cleanPath = path === '' ? '' : path.replace(/\/$/, '')
    const url = `${baseUrl}${cleanPath}`
    const priority = path === '' ? '1.0' : '0.8'
    const changefreq = path === '' ? 'daily' : 'weekly'
    return `
       <url>
           <loc>${url}</loc>
           <lastmod>${today}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `
  })

  const towerFilterUrls = availableCondosTowerPaths.map((pathWithQuery) => {
    const url = `${baseUrl}${pathWithQuery}`
    return `
       <url>
           <loc>${url}</loc>
           <lastmod>${today}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.75</priority>
       </url>
     `
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${staticUrls.join('')}
     ${towerFilterUrls.join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  // Write the XML to the response
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
