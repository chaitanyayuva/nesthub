import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('nesthub_token');
  const isAuth = !!authCookie?.value;

  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedRoutes = ['/home', '/student', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If trying to access a protected route without being logged in → /login
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
