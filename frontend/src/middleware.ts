import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "./constants/auth";

const publicRoutes = [
  { path: "", whenAuthenticated: "next" },
  { path: "/autenticacao", whenAuthenticated: "redirect" },
  { path: "/autenticacao/login", whenAuthenticated: "redirect" },
  { path: "/autenticacao/cadastrar", whenAuthenticated: "redirect" },
  { path: "/autenticacao/cadastrar/email", whenAuthenticated: "redirect" },
  { path: "/usuario", whenAuthenticated: "redirect" },
  { path: "/usuario/publico", whenAuthenticated: "redirect" },
  { path: "/usuario/publico/esqueci-minha-senha", whenAuthenticated: "redirect" },
  { path: "/recuperar-senha", whenAuthenticated: "redirect" },
  { path: "/recuperar-senha/redefinir", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/autenticacao/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const municipio = path.split("/")[1];
  const publicRoute = publicRoutes.find(route => `/${municipio}${route.path}` === path);
  const authToken = request.cookies.get(ACCESS_TOKEN);

  if (municipio !== "3513405") {
    // Mantém o restante do caminho após o município
    const restOfPath = path.split("/").slice(2).join("/");
    const newPath = `/3513405${restOfPath ? `/${restOfPath}` : ""}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = `/${municipio}/${REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE}`;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = `/${municipio}`;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // TODO: checar se o JWT esta EXPIRADO
    // se sim remover cookie e redirecionar usuario para login

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
