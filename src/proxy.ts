import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔥 IMPORTANT: function name must be "proxy"
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await verifyToken(request);

  // 🔐 PROTECT ALL DASHBOARD ROUTES
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      console.log('[PROXY] No token → redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 👑 ADMIN ROUTE PROTECTION
    if (pathname.startsWith('/dashboard/admin')) {
      if (user.role !== 'admin') {
        console.log('[PROXY] Not admin → redirecting to /dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  // 🔁 REDIRECT LOGGED-IN USERS FROM AUTH PAGES
  if ((pathname === '/login' || pathname === '/register') && user) {
    console.log('[PROXY] Already logged in → redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// ✅ Route matcher
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};