import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const session = request.cookies.get('session_id')
  console.log(`[Proxy] Request: ${request.nextUrl.pathname}, Session: ${!!session}`);

  // Paths that are accessible without login
  const isPublicPath = request.nextUrl.pathname === '/login'

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
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
     * - uploads (uploaded files)
     * - pembangkit-bg.png (background image)
     */
    '/((?!_next/static|_next/image|favicon.ico|uploads|.*\\.png$).*)',
  ],
}
