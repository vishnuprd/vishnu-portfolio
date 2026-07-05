/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// Derive the Supabase origin from env so the CSP/connect-src stays tight
// without hardcoding the project ref. Falls back to the supabase.co wildcard.
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

// Content-Security-Policy — the core defense against injected scripts.
// 'unsafe-inline' is required because Next.js emits inline hydration scripts
// and framer-motion/Tailwind inject inline styles; the blog also loads
// highlight.js + mermaid from cdnjs. Stored-XSS in blog HTML is closed off
// separately by rehype-sanitize, so this stays defense-in-depth. In dev we
// additionally allow 'unsafe-eval' + ws: for React Fast Refresh / HMR.
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'none'`,
  `form-action 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://cdnjs.cloudflare.com`,
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

// Applied to every route.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // HSTS only in production — never send it over plain-http localhost.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // hide the "X-Powered-By: Next.js" fingerprint
  images: {
    // Only the Supabase storage host is trusted for the image optimizer,
    // closing the open-proxy / remotePatterns DoS surface. The app doesn't
    // load images from arbitrary third-party hosts.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Admin must never be indexed or cached by shared caches/CDNs.
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
