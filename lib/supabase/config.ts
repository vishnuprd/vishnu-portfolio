/**
 * Central place to read Supabase env vars and know whether Supabase is
 * configured at all. When it is NOT configured, the public site falls back
 * to the hardcoded defaults in lib/data.ts so nothing ever breaks.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once the public URL + anon key are present. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
