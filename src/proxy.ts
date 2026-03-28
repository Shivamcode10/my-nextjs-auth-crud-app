import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await verifyToken(request);

  // 🔐 PROTECT ALL DASHBOARD ROUTES
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      console.log('[MIDDLEWARE] No token → redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 👑 ADMIN ROUTE PROTECTION
    if (pathname.startsWith('/dashboard/admin')) {
      if (user.role !== 'admin') {
        console.log('[MIDDLEWARE] Not admin → redirecting to /dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  // 🔁 REDIRECT LOGGED-IN USERS FROM AUTH PAGES
  if ((pathname === '/login' || pathname === '/register') && user) {
    console.log('[MIDDLEWARE] Already logged in → redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};