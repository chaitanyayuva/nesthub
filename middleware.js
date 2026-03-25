import { NextResponse } from 'next/server';

export function middleware(request) {
  /*
  // --- PRIVATE ROUTING LOGIC (COMMENTED OUT FOR DEVELOPMENT) ---
  // In a real application, you would verify a JWT or session token here.
  // For now, we check if the 'nesthub_auth' cookie exists.
  const authCookie = request.cookies.get('nesthub_auth');
  const isAuth = !!authCookie;

  const { pathname } = request.nextUrl;

  // The paths that require authentication to access
  const protectedRoutes = ['/home', '/student', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If user is trying to access a protected route without being logged in, redirect to login
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is already logged in and tries to access login or root, send to home dashboard
  if (isAuth && (pathname === '/login' || pathname === '/')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  */

  // Allow all requests through while commented out
  return NextResponse.next();
}

export const config = {
  // Matcher for middleware (exclude static files, API routes, Next.js internals)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
