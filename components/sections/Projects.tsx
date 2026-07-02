"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  X,
  Layers,
  Lightbulb,
  Gauge,
} from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

type Project = (typeof projects)[number];

function ProjectVisual({ p }: { p: Project }) {
  return (
    <div
      className={`relative flex h-40 items-end overflow-hidden rounded-2xl bg-gradient-to-br ${p.accent} p-4`}
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-40" />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      {/* faux browser */}
      <div className="relative w-full rounded-xl border border-white/20 bg-black/25 p-2 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/25" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-6 w-1/3 rounded bg-white/20" />
            <div className="h-6 w-1/3 rounded bg-white/15" />
            <div className="h-6 w-1/3 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Products built like a startup would ship them"
        subtitle="Real platforms across PropTech, operations and travel — each engineered for scale, security and speed."
      />

      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            variants={staggerItem}
            whileHover={{ y: -8 }}
            onClick={() => setActive(p)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl glass p-3 transition-all duration-300 hover:border-white/20 hover:shadow-card"
            data-cursor="hover"
          >
            <ProjectVisual p={p} />

            <div className="flex flex-1 flex-col p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-sky-300/80">
                {p.category}
              </span>
              <h3 className="mt-2 flex items-center gap-1.5 text-lg font-bold text-white">
                {p.title}
                <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
              </h3>
              <p className="mt-1 text-xs text-white/40">{p.client}</p>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
                {p.tech.length > 4 && (
                  <span className="chip">+{p.tech.length - 4}</span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>

      {/* modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-card sm:p-8"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <ProjectVisual p={active} />

              <span className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-sky-300/80">
                {active.category} · {active.client}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {active.description}
              </p>

              {/* metrics */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {active.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                  >
                    <div className="text-lg font-bold text-gradient">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-white/45">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* features */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white">
                  Key Features
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {active.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm text-white/60"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* architecture + challenge */}
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Layers className="h-4 w-4 text-violet-400" /> Architecture
                  </h4>
                  <p className="mt-2 text-sm text-white/55">
                    {active.architecture}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Lightbulb className="h-4 w-4 text-amber-400" /> Challenge
                    Solved
                  </h4>
                  <p className="mt-2 text-sm text-white/55">
                    {active.challenge}
                  </p>
                </div>
              </div>

              {/* tech + links */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {active.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {active.live && (
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
                  >
                    <Gauge className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {active.github && (
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
                {!active.live && !active.github && (
                  <p className="text-xs text-white/40">
                    Private / client project — details available on request.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
