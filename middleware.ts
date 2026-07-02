import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only run on /admin routes — the public site never needs auth handling.
  matcher: ["/admin/:path*"],
};
