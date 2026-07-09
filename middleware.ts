import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { buildCsp } from "@/lib/csp";

const isDev = process.env.NODE_ENV !== "production";

export async function middleware(request: NextRequest) {
  // One fresh nonce per request drives the nonce-based CSP.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce, isDev);

  // Next reads the nonce from the request-side CSP header during SSR and
  // stamps it onto its own scripts; `x-nonce` is what our root layout reads
  // to nonce the inline theme script.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = request.nextUrl.pathname.startsWith("/admin")
    ? await updateSession(request, requestHeaders)
    : NextResponse.next({ request: { headers: requestHeaders } });

  // Browser-enforced copy on the response.
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Run on every route EXCEPT static assets & prefetched files (they're not
  // HTML and don't need a nonce). This is broader than before (was /admin
  // only) because the CSP now lives here instead of next.config.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|pdf)$).*)",
  ],
};
