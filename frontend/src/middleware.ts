import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const municipio = pathname.split("/")[1];

  if (municipio !== "3513405") {
    // Mantém o restante do caminho após o município
    const restOfPath = pathname.split("/").slice(2).join("/");
    const newPath = `/3513405${restOfPath ? `/${restOfPath}` : ""}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (arquivos estáticos do Next.js)
     * - _next/image (otimização de imagens do Next.js)
     * - favicon.ico (ícone do site)
     * - api/ (rotas da API)
     * - public/ (arquivos públicos)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|public/).*)",
  ],
};
