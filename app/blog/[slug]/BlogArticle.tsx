"use client";

import { useEffect, useState, type ReactNode } from "react";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/** Flatten React children down to their plain text (for heading ids + code). */
function toText(node: ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  // React element with children
  const el = node as { props?: { children?: ReactNode } };
  if (el.props?.children != null) return toText(el.props.children);
  return "";
}

/** Slug used for heading ids — must match the server-side TOC slugifier. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* ignore */
    }
  }
  return (
    <figure className="code">
      <div className="code-bar">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-lang">{lang || "code"}</span>
        <button className={`copy${done ? " done" : ""}`} onClick={copy} type="button">
          {done ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre>
        <code className={lang ? `language-${lang}` : undefined}>{code}</code>
      </pre>
    </figure>
  );
}

export function BlogArticle({ content }: { content: string }) {
  const [libsReady, setLibsReady] = useState(0);

  // Run highlight.js + mermaid once the CDN libs have loaded (and re-run
  // whenever the content changes).
  useEffect(() => {
    const w = window as unknown as {
      hljs?: { highlightElement: (el: Element) => void };
      mermaid?: { initialize: (o: unknown) => void; run: (o?: unknown) => void };
    };
    if (w.hljs) {
      document
        .querySelectorAll(".article-shell pre code[class*='language-']")
        .forEach((el) => {
          if (!el.hasAttribute("data-highlighted")) {
            try {
              w.hljs!.highlightElement(el);
              el.setAttribute("data-highlighted", "yes");
            } catch {
              /* ignore */
            }
          }
        });
    }
    if (w.mermaid) {
      try {
        w.mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#eeecff",
            primaryBorderColor: "#4f46e5",
            primaryTextColor: "#14151b",
            lineColor: "#94a3b8",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "14px",
          },
        });
        w.mermaid.run({ querySelector: ".article-shell .mermaid" });
      } catch {
        /* ignore */
      }
    }
  }, [content, libsReady]);

  // Reading-progress bar + TOC scroll-spy.
  useEffect(() => {
    const bar = document.getElementById("reading-progress");
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (bar) bar.style.width = `${p}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".toc a"),
    );
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            const a = links.find(
              (l) => l.getAttribute("href") === `#${e.target.id}`,
            );
            a?.classList.add("active");
          }
        });
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    links.forEach((l) => {
      const id = l.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) spy.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      spy.disconnect();
    };
  }, [content]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        strategy="afterInteractive"
        onLoad={() => setLibsReady((n) => n + 1)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.0/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => setLibsReady((n) => n + 1)}
      />

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2({ children }) {
            return <h2 id={slugify(toText(children))}>{children}</h2>;
          },
          h3({ children }) {
            return <h3 id={slugify(toText(children))}>{children}</h3>;
          },
          pre({ children }) {
            // children is the <code> element produced by react-markdown.
            const codeEl = children as {
              props?: { className?: string; children?: ReactNode };
            };
            const cls = codeEl?.props?.className ?? "";
            const lang = /language-(\w+)/.exec(cls)?.[1] ?? "";
            const raw = toText(codeEl?.props?.children).replace(/\n$/, "");
            if (lang === "mermaid") {
              return <pre className="mermaid">{raw}</pre>;
            }
            return <CodeBlock lang={lang} code={raw} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
}
