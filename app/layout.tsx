import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { profile, about } = await getSiteContent();
  const title = `${profile.name} — ${profile.role}`;
  const description = about.summary;

  return {
    metadataBase: new URL("https://vishnuprd.dev"),
    title,
    description,
    keywords: [
      "Full Stack Developer",
      "Software Engineer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      profile.name,
    ],
    authors: [{ name: profile.name }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#04050a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nonce minted per-request by middleware; needed so this inline script is
  // allowed under the nonce-based CSP (no more script-src 'unsafe-inline').
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const { profile } = await getSiteContent();
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://vishnuprd.dev",
    image: "https://vishnuprd.dev/opengraph-image",
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "System Design",
      "Cloud Architecture",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="aurora"
      className={`${inter.variable} ${mono.variable}`}
    >
      <head>
        <script
          nonce={nonce}
          // Browsers strip the nonce attribute from the DOM after using it, so
          // the hydrating client sees an empty nonce and would warn. The script
          // has already run (it's blocking, pre-hydration) — suppress the noise.
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {/* reducedMotion="user" disables transform/layout animations for users
            who ask for it, while keeping opacity — a tasteful fallback, not a
            hard off switch. Covers every Framer Motion component globally. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
