import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Refreshes the Supabase auth session on every request and guards /admin.
 * - Unauthenticated users hitting /admin/* are redirected to /admin/login.
 * - Authenticated users hitting /admin/login are sent to the dashboard.
 */
export async function updateSession(
  request: NextRequest,
  requestHeaders: Headers,
) {
  // Forward the (nonce-carrying) headers set by the root middleware so the
  // admin pages get the same CSP nonce as the public site.
  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin");

  // If Supabase isn't configured yet, don't lock anyone out of a broken
  // login page — just show it. Other admin pages will explain the setup.
  if (!isSupabaseConfigured) {
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request: { headers: requestHeaders } });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminArea && !isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
