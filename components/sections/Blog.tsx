"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

export function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <section id="blog" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Writing"
        title="Engineering notes & deep dives"
        subtitle="Lessons from building and scaling production applications."
      />

      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          const linked = Boolean(post.slug);
          const card = (
            <motion.article
              variants={staggerItem}
              whileHover={linked ? { y: -6 } : undefined}
              className={`group flex h-full flex-col rounded-3xl glass p-6 transition-all duration-300 ${
                linked
                  ? "cursor-pointer hover:border-white/20 hover:shadow-card"
                  : ""
              }`}
              data-cursor={linked ? "hover" : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="chip border-sky-400/20 bg-sky-400/10 text-sky-300">
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Clock className="h-3 w-3" /> {post.read}
                </span>
              </div>

              <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-sky-200">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {post.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-sm">
                <span className="text-white/40">{post.date}</span>
                {linked && (
                  <span className="inline-flex items-center gap-1 font-medium text-sky-300">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </div>
            </motion.article>
          );

          return linked ? (
            <Link key={post.title} href={`/blog/${post.slug}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={post.title}>{card}</div>
          );
        })}
      </Stagger>
    </section>
  );
}
