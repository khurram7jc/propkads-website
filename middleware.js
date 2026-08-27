import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('propkads_session')?.value;
  if (!token && req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
