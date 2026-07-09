/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// NOTE: Content-Security-Policy is intentionally NOT here. It's set per-request
// in middleware.ts (see lib/csp.ts) so it can carry a fresh nonce and drop
// `script-src 'unsafe-inline'`. Everything below is static and safe as headers.

// Applied to every route.
const securityHeaders = [
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
