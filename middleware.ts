import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()
  const hostHeader = request.headers.get('host') || request.nextUrl.hostname
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const protocol = forwardedProto
    ? `${forwardedProto}:`
    : request.nextUrl.protocol

  // Normalize to canonical host + HTTPS in one permanent hop.
  const needsHttps = protocol === 'http:'
  const needsCanonicalHost = hostHeader === 'turnberryplaceforsale.com'

  if (needsHttps || needsCanonicalHost) {
    url.protocol = 'https:'
    url.hostname = 'www.turnberryplaceforsale.com'
    return NextResponse.redirect(url, 308)
  }

  // Remove trailing slash (except for root and file extensions)
  if (pathname !== '/' && pathname.endsWith('/') && !pathname.match(/\.[a-z]+$/i)) {
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 308)
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
