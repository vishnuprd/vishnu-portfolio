import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import { getBlogPost, getSiteContent } from "@/lib/content";
import { BlogArticle } from "./BlogArticle";
import "./article.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

type Params = { params: Promise<{ slug: string }> };

/** Must match slugify() in BlogArticle.tsx so TOC links hit the headings. */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Pull `## H2` headings out of the markdown to build the table of contents. */
function buildToc(markdown: string): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  // Ignore headings inside fenced code blocks.
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*#*$/.exec(line);
    if (m) {
      const label = m[1].replace(/[*_`]/g, "").trim();
      out.push({ id: slugify(label), label });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Vishnu Prasad`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post || !post.content) notFound();

  const { profile } = await getSiteContent();
  const toc = buildToc(post.content);
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`article-shell ${space.variable}`}>
      <div id="reading-progress" className="progress" />

      <header className="topbar">
        <Link className="brand" href="/">
          <span className="mark">⌘</span> {profile.name} · Engineering
        </Link>
        <div className="top-actions">
          {profile.linkedin && (
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">● {post.tag} · Deep Dive</span>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="sub">{post.excerpt}</p>}
          <div className="meta">
            {post.read && (
              <span className="chip">
                ⏱ <b>{post.read}</b> read
              </span>
            )}
            {post.tag && (
              <span className="chip">
                🏷 <b>{post.tag}</b>
              </span>
            )}
            {post.date && (
              <span className="chip">
                📅 <b>{post.date}</b>
              </span>
            )}
          </div>
          <Link className="btn" href="/#blog">
            ← Back to all writing
          </Link>
        </div>
      </section>

      <div className="wrap">
        <div className="layout">
          {toc.length > 0 && (
            <nav className="toc" aria-label="Table of contents">
              <h4>On this page</h4>
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.label}
                </a>
              ))}
            </nav>
          )}

          <article>
            <BlogArticle content={post.content} />

            {/* Author */}
            <div className="author">
              <div className="avatar">{initials}</div>
              <div>
                <p className="n">{profile.name}</p>
                <p className="r">{profile.role}</p>
              </div>
            </div>

            {/* CTA */}
            <section className="cta">
              <h2>Found this useful?</h2>
              <p>
                I write about engineering and building products that scale. Let&apos;s
                connect — I&apos;m open to freelance projects and full-time roles.
              </p>
              <div className="cta-row">
                {profile.linkedin && (
                  <a
                    className="btn btn-accent"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a
                    className="btn"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View GitHub
                  </a>
                )}
              </div>
            </section>
          </article>
        </div>
      </div>

      <footer>
        © {post.date || ""} {profile.name} · Written for engineers building things that last.
      </footer>
    </div>
  );
}
