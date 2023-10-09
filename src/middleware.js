import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (!request.cookies.get('accessToken')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  if (request.cookies.get('userData')) {
      const userData = JSON.parse(request.cookies.get('userData').value);
      if (userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/landing', request.url));
      }
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/manajemen-user',
    '/admin/manajemen-produk'
    ],
}