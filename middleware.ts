import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname, protocol } = request.nextUrl
  const url = request.nextUrl.clone()

  // Redirect HTTP to HTTPS (force secure connection).
  // Skip for local loopback hosts — there's no TLS cert on `next start`/`next dev`,
  // and the redirect would send Chrome (incl. Lighthouse) to an `chrome-error://` interstitial.
  const isLocalLoopback =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  if (protocol === 'http:' && !isLocalLoopback) {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // Vercel preview hosts must not redirect to production (blocks PR review).
  const isVercelPreviewHost = hostname.endsWith('.vercel.app')

  // Redirect non-www to www (ensure primary domain is www)
  // This handles: turnberryplaceforsale.com and other non-preview variants
  if (
    !isVercelPreviewHost &&
    hostname !== 'www.turnberryplaceforsale.com' &&
    hostname.includes('turnberryplaceforsale')
  ) {
    url.hostname = 'www.turnberryplaceforsale.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // Remove trailing slash (except for root and file extensions)
  if (pathname !== '/' && pathname.endsWith('/') && !pathname.match(/\.[a-z]+$/i)) {
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|sitemap.xml|robots.txt).*)',
  ],
}
