import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/weather'],
};