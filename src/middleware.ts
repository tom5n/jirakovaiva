import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Zkontrolovat admin_session v cookies
  const adminSession = req.cookies.get('admin_session')
  
  if (req.nextUrl.pathname.startsWith('/admin') && !adminSession) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
} 