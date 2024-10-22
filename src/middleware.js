import { NextResponse, NextRequest } from 'next/server' 

export async function middleware(request) {   
  if (request.nextUrl.pathname == '/' + process.env.ADMFLDR + '/login') {
    if (request.cookies.get('vrfUsreuthTkN')?.value ) { 
      return NextResponse.redirect(new URL('/' + process.env.ADMFLDR + '/', request.url))
    }
  } else {
    if (!request.cookies.get('vrfUsreuthTkN')?.value ) {
      if (!['forgot-password','reset-password','registration','email-varification'].includes(request.nextUrl.pathname.split('/').pop())) {
        return NextResponse.redirect(new URL('/' + process.env.ADMFLDR + '/login', request.url))
      } 
    }
  }
} 
export const config = {
  matcher: '/rdadmpnl/:path*',
}