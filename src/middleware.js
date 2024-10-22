import { NextResponse, NextRequest } from 'next/server' 

export async function middleware(request) {   
  if (request.nextUrl.pathname ==  '/login') {
    if (request.cookies.get('vrfUsreuthTkN')?.value ) { 
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (!request.cookies.get('vrfUsreuthTkN')?.value ) {
      if (!['forgot-password','reset-password','registration','email-varification'].includes(request.nextUrl.pathname.split('/').pop())) {
        return NextResponse.redirect(new URL( 'login', request.url))
      } 
    }
  }
} 
export const config = {
  matcher: [
    '/',
    '/login',
    '/email-verification',
    '/forgot-password',
    '/register',
    '/reset-password',
    '/dashboard',
    '/maintenance',
    '/wallet-connect',
    '/profile',
    '/choose-membership',
    '/payment',
    '/terms-and-condition',
    '/privacy-policy',
    '/contact-us',
    '/legal-notice',
    '/membership',
    "/transaction-history"
],
}