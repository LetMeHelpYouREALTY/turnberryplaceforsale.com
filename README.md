# Turnberry Place For Sale

A luxury real estate marketing site built with Next.js, Drupal, and modern web technologies.

**AI assistants:** Project instructions live in [`CLAUDE.md`](./CLAUDE.md) (Claude Code loads it automatically). Cursor-oriented pointer: [`AGENTS.md`](./AGENTS.md). Apply official best practices as of **April 2026** and verify material changes against current docs.

## Built With

- **Next.js** - React framework for production
- **Drupal** - Headless CMS backend
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

## Development & Deployment

- **Cursor AI** - Gifted AI-powered development assistance
- **Vercel** - Hosting and deployment platform
- **GitHub** - Version control and collaboration

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Drupal backend with JSON:API enabled
- (Optional) Drupal OAuth2 client for preview mode

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DrJanDuffy/turnberryplaceforsale.com.git
cd turnberryplaceforsale.com
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Drupal Configuration (REQUIRED)
# This is required for the build to succeed. Set this in Vercel project settings for deployment.
NEXT_PUBLIC_DRUPAL_BASE_URL=https://your-drupal-site.com

# Drupal OAuth2 Client Credentials (optional, for preview mode)
DRUPAL_CLIENT_ID=your_client_id
DRUPAL_CLIENT_SECRET=your_client_secret

# Drupal Site ID (optional, for multi-site installations)
DRUPAL_SITE_ID=1

# Image Domain Configuration (optional)
# If not set, will auto-extract from NEXT_PUBLIC_DRUPAL_BASE_URL
NEXT_IMAGE_DOMAIN=your-drupal-site.com

# Base URL for the Next.js site (use www in production — matches middleware & sitemap)
NEXT_PUBLIC_BASE_URL=https://www.turnberryplaceforsale.com
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

Build for production:
```bash
npm run build
# or
yarn build
```

### Deployment

The site is configured for deployment on Vercel. **IMPORTANT:** You must set the following environment variables in your Vercel project settings before deploying:

**Required:**
- `NEXT_PUBLIC_DRUPAL_BASE_URL` - Your Drupal backend URL (required for build)

**Optional:**
- `DRUPAL_CLIENT_ID` - For preview mode
- `DRUPAL_CLIENT_SECRET` - For preview mode
- `DRUPAL_SITE_ID` - For multi-site installations
- `NEXT_IMAGE_DOMAIN` - Image domain (auto-extracted from Drupal URL if not set)
- `NEXT_PUBLIC_BASE_URL` - Your Next.js site URL

Without `NEXT_PUBLIC_DRUPAL_BASE_URL`, the build will fail during the "Collecting page data" phase.

## Project Structure

Pages are built from the Landing page node type and paragraphs sourced from `/drupal`. The site uses:

- **Dynamic routing** via `pages/[[...slug]].tsx` for Drupal content
- **Static generation** for optimal performance
- **Multi-language support** (English/Spanish)
- **Property listings** with grid and list views
- **Blog functionality** with pagination

## License

Licensed under the [MIT license](https://github.com/chapter-three/next-drupal/blob/master/LICENSE).
