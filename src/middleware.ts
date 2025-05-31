import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Pokud jde o admin stránku a nemá admin_session cookie, přesměruj na login
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = req.cookies.get('admin_session')
    if (!adminSession) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
} 