import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/service/authService';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAuthenticated()) {
    const municipio = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${municipio}/autenticacao/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:municipio/dashboard/:path*',
    '/:municipio/imoveis/:path*',
    '/:municipio/configuracoes/:path*'
  ],
}
