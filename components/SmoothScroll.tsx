"use client";

import { useEffect } from "react";

/**
 * Intercepts clicks on in-page anchor links (href="#id") and smooth-scrolls
 * to the target WITHOUT appending the hash to the URL.
 */
export function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;

      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // keep the address bar clean (no #hash)
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // On first load, strip any existing hash from the URL.
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return null;
}
