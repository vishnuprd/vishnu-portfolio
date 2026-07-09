/**
 * Content-Security-Policy builder — shared by the middleware (which mints a
 * fresh nonce per request). Moving CSP here (from next.config's static
 * headers) is what lets us drop `script-src 'unsafe-inline'`: every inline
 * script now carries a per-request nonce instead.
 *
 * `style-src` KEEPS 'unsafe-inline' on purpose — Framer Motion and Tailwind
 * inject inline styles that Next doesn't nonce, and there's no injection sink
 * for CSS here. Scripts are the meaningful XSS vector, and those are locked.
 */
export function buildCsp(nonce: string, isDev: boolean): string {
  // Derive the Supabase origin from env so connect-src stays tight.
  let supabaseOrigin = "https://*.supabase.co";
  let supabaseWss = "wss://*.supabase.co";
  try {
    const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (raw) {
      const u = new URL(raw);
      supabaseOrigin = u.origin;
      supabaseWss = `wss://${u.host}`;
    }
  } catch {
    // keep the wildcard fallback
  }

  return [
    `default-src 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    // Nonce covers Next's hydration scripts + our inline theme script. The
    // cdnjs host stays allow-listed for highlight.js/mermaid (loaded via
    // <Script>). Dev also needs 'unsafe-eval' for React Fast Refresh.
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""} https://cdnjs.cloudflare.com`,
    `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self' ${supabaseOrigin} ${supabaseWss} https://cdnjs.cloudflare.com${isDev ? " ws: wss:" : ""}`,
    `worker-src 'self' blob:`,
    `frame-src 'self' https://calendly.com`,
    `manifest-src 'self'`,
    ...(isDev ? [] : [`upgrade-insecure-requests`]),
  ]
    .join("; ")
    .replace(/\s+/g, " ")
    .trim();
}
