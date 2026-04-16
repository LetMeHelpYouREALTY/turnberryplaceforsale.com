import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'

// Ensure www is always used as primary domain
const baseUrl = (() => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.turnberryplaceforsale.com'
  // Force www if not present
  if (envUrl.includes('turnberryplaceforsale.com') && !envUrl.includes('www.')) {
    return envUrl.replace('turnberryplaceforsale.com', 'www.turnberryplaceforsale.com')
  }
  return envUrl.replace(/\/$/, '') // Remove trailing slash
})()

// Enhanced sitemap with priorities and change frequencies
interface SitemapPage {
  path: string
  priority: string
  changefreq: string
  lastmod?: string
}

const staticPages: SitemapPage[] = [
  {
    path: '',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/available-condos',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    path: '/towers',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/stirling-club',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/price-features',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/floor-plans',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/amenities',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/neighborhood',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/agent',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/open-house',
    priority: '0.7',
    changefreq: 'weekly',
  },
  {
    path: '/photos',
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    path: '/map',
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    path: '/mls',
    priority: '0.6',
    changefreq: 'daily',
  },
  {
    path: '/accessibility',
    priority: '0.3',
    changefreq: 'yearly',
  },
]

function generateSiteMap() {
  const today = new Date().toISOString().split('T')[0]
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${staticPages
       .map((page) => {
         // Ensure no trailing slashes in sitemap URLs
         const cleanPath = page.path === '' ? '' : page.path.replace(/\/$/, '')
         const url = `${baseUrl}${cleanPath}`
         const lastmod = page.lastmod || today
         
         return `
       <url>
           <loc>${url}</loc>
           <lastmod>${lastmod}</lastmod>
           <changefreq>${page.changefreq}</changefreq>
           <priority>${page.priority}</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap with the page data
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
