"use client";

/**
 * Last-resort boundary for errors thrown in the ROOT layout itself. It
 * replaces the whole document, so it must render its own <html>/<body> and
 * can't rely on globals.css — styles are inlined.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#04050a",
          color: "#e6e8f0",
          fontFamily: "system-ui, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            The application hit an unexpected error. Please try reloading.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(to bottom right, #22d3ee, #8b5cf6)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
