import { ImageResponse } from "next/og";
import { profile, about } from "@/lib/data";

// Static social-share card served at /opengraph-image (also used for Twitter).
// Rendered once at build/first-request and cached, so we read the static
// profile/about defaults directly — zero runtime deps, zero failure surface.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#04050a",
          backgroundImage:
            "radial-gradient(1200px 600px at 80% -10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(900px 500px at 0% 110%, rgba(34,211,238,0.22), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: wordmark + availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
                fontSize: 34,
                fontWeight: 800,
                color: "#04050a",
              }}
            >
              {">_"}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {profile.firstName}
              <span style={{ color: "#8b5cf6" }}>.dev</span>
            </div>
          </div>

          {profile.available && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                fontSize: 22,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#34d399",
                }}
              />
              Available for senior roles
            </div>
          )}
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              background: "linear-gradient(90deg, #22d3ee, #8b5cf6, #d946ef)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.66)",
              maxWidth: 940,
            }}
          >
            {about.summary.split(". ")[0] + "."}
          </div>
        </div>

        {/* tech chips */}
        <div style={{ display: "flex", gap: 14 }}>
          {stack.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                fontSize: 24,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
