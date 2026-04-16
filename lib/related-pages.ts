/**
 * Related Pages Configuration
 * Defines related page relationships for internal linking and SEO
 */

export interface RelatedPage {
  href: string
  title: string
  description: string
  image?: string
}

export const relatedPages: Record<string, RelatedPage[]> = {
  '/': [
    {
      href: '/available-condos',
      title: 'Available Condos',
      description: 'Browse current MLS listings at Turnberry Place',
    },
    {
      href: '/towers',
      title: 'Explore the Towers',
      description: 'Learn about each of the four luxury towers',
    },
    {
      href: '/stirling-club',
      title: 'The Stirling Club',
      description: 'Discover exclusive 80,000 sq ft private amenities',
    },
    {
      href: '/floor-plans',
      title: 'Floor Plans',
      description: 'View all available layout options',
    },
  ],
  '/towers': [
    {
      href: '/floor-plans',
      title: 'Floor Plans',
      description: 'View all layout options for each tower',
    },
    {
      href: '/available-condos',
      title: 'Available Units',
      description: 'See current listings across all towers',
    },
    {
      href: '/photos',
      title: 'Photo Gallery',
      description: 'Browse property images and virtual tours',
    },
    {
      href: '/stirling-club',
      title: 'The Stirling Club',
      description: 'Exclusive amenities available to all residents',
    },
  ],
  '/stirling-club': [
    {
      href: '/amenities',
      title: 'All Amenities',
      description: 'Complete list of community amenities',
    },
    {
      href: '/neighborhood',
      title: 'Neighborhood',
      description: 'Explore the surrounding area',
    },
    {
      href: '/towers',
      title: 'The Towers',
      description: 'View residential tower details',
    },
    {
      href: '/available-condos',
      title: 'Find Your Home',
      description: 'Browse available condominiums',
    },
  ],
  '/available-condos': [
    {
      href: '/floor-plans',
      title: 'Floor Plans',
      description: 'Compare layouts and sizes',
    },
    {
      href: '/price-features',
      title: 'Pricing Guide',
      description: 'Understand costs and HOA fees',
    },
    {
      href: '/agent',
      title: 'Contact Dr. Jan Duffy',
      description: 'Book a private tour with a local expert',
    },
    {
      href: '/towers',
      title: 'Tower Information',
      description: 'Learn about each tower',
    },
  ],
  '/floor-plans': [
    {
      href: '/available-condos',
      title: 'Current Listings',
      description: 'Units for sale matching these plans',
    },
    {
      href: '/towers',
      title: 'Tower Details',
      description: 'Which tower fits your lifestyle',
    },
    {
      href: '/photos',
      title: 'Interior Photos',
      description: 'See finished units and layouts',
    },
    {
      href: '/price-features',
      title: 'Pricing Information',
      description: 'Costs by floor plan',
    },
  ],
  '/amenities': [
    {
      href: '/stirling-club',
      title: 'Stirling Club',
      description: 'Premier 80,000 sq ft amenity club',
    },
    {
      href: '/neighborhood',
      title: 'Location & Area',
      description: 'What\'s nearby and accessible',
    },
    {
      href: '/available-condos',
      title: 'Find Your Home',
      description: 'Browse available listings',
    },
    {
      href: '/towers',
      title: 'The Towers',
      description: 'Residential tower information',
    },
  ],
  '/neighborhood': [
    {
      href: '/map',
      title: 'Interactive Map',
      description: 'Explore the area interactively',
    },
    {
      href: '/amenities',
      title: 'Community Amenities',
      description: 'On-site features and services',
    },
    {
      href: '/available-condos',
      title: 'Available Homes',
      description: 'Current inventory',
    },
    {
      href: '/stirling-club',
      title: 'The Stirling Club',
      description: 'Exclusive private club access',
    },
  ],
  '/agent': [
    {
      href: '/open-house',
      title: 'Private Showings',
      description: 'Schedule a private showing',
    },
    {
      href: '/available-condos',
      title: 'My Listings',
      description: 'Browse available properties',
    },
    {
      href: '/',
      title: 'About Turnberry Place',
      description: 'Community overview and features',
    },
    {
      href: '/towers',
      title: 'The Towers',
      description: 'Learn about each tower',
    },
  ],
  '/request-details': [
    {
      href: '/available-condos',
      title: 'Available Condos',
      description: 'Browse current listings',
    },
    {
      href: '/agent',
      title: 'About Dr. Jan Duffy',
      description: 'Meet your Turnberry Place expert',
    },
    {
      href: '/towers',
      title: 'Explore Towers',
      description: 'Learn about each tower',
    },
    {
      href: '/open-house',
      title: 'Open House Events',
      description: 'Upcoming showings and events',
    },
  ],
  '/open-house': [
    {
      href: '/agent',
      title: 'Contact Dr. Jan Duffy',
      description: 'Book your personal showing',
    },
    {
      href: '/available-condos',
      title: 'Available Units',
      description: 'See what\'s currently for sale',
    },
    {
      href: '/agent',
      title: 'Contact Agent',
      description: 'Get in touch with Dr. Jan Duffy',
    },
  ],
  '/photos': [
    {
      href: '/available-condos',
      title: 'Available Condos',
      description: 'See these units for sale',
    },
    {
      href: '/floor-plans',
      title: 'Floor Plans',
      description: 'View layout options',
    },
    {
      href: '/towers',
      title: 'Tower Information',
      description: 'Learn about each tower',
    },
  ],
  '/map': [
    {
      href: '/neighborhood',
      title: 'Neighborhood Guide',
      description: 'Area information and highlights',
    },
    {
      href: '/amenities',
      title: 'Community Amenities',
      description: 'On-site features',
    },
    {
      href: '/available-condos',
      title: 'Available Homes',
      description: 'Current listings',
    },
  ],
  '/price-features': [
    {
      href: '/available-condos',
      title: 'Current Listings',
      description: 'See actual pricing',
    },
    {
      href: '/floor-plans',
      title: 'Floor Plans',
      description: 'Layouts and sizes',
    },
    {
      href: '/agent',
      title: 'Talk With an Expert',
      description: 'Get detailed pricing guidance',
    },
  ],
  '/share': [
    {
      href: '/',
      title: 'Homepage',
      description: 'Return to homepage',
    },
    {
      href: '/available-condos',
      title: 'Available Condos',
      description: 'Browse listings',
    },
    {
      href: '/agent',
      title: 'Contact Agent',
      description: 'Get in touch',
    },
  ],
  '/mls': [
    {
      href: '/available-condos',
      title: 'Available Condos',
      description: 'Browse current listings',
    },
    {
      href: '/towers',
      title: 'Tower Information',
      description: 'Learn about each tower',
    },
    {
      href: '/agent',
      title: 'Schedule Showing',
      description: 'Book a tour with Dr. Jan Duffy',
    },
  ],
}

/**
 * Get related pages for a specific path
 */
export function getRelatedPages(path: string): RelatedPage[] {
  // Normalize path
  const normalizedPath = path === '' || path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}`
  return relatedPages[normalizedPath] || relatedPages['/'] || []
}
