import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Cookieless, read-only client for PUBLIC content. Because it doesn't touch
 * cookies, the public pages can be statically cached (and revalidated on
 * demand when the admin saves), instead of being forced dynamic. Only reads
 * public data allowed by the RLS `select` policy.
 */
export function createPublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
