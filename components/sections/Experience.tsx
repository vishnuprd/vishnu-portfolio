"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import type { Experience as ExperienceType } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({
  experience,
}: {
  experience: ExperienceType[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 80%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section id="experience" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Experience"
        title="A track record of shipping real products"
        subtitle="PropTech SaaS, manufacturing platforms and AI-powered travel tools — delivered end-to-end."
      />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* timeline rail */}
        <div className="absolute left-4 top-2 h-full w-px bg-white/10 md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 top-2 h-full w-px origin-top bg-gradient-to-b from-sky-400 via-violet-400 to-fuchsia-400 md:left-1/2"
        />

        <div className="space-y-10">
          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={job.company + job.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-[9px] top-2 grid h-4 w-4 place-items-center rounded-full bg-ink-950 ring-2 ring-sky-400 md:left-auto ${
                    left ? "md:-right-2" : "md:-left-2"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 text-left transition-all duration-300 hover:border-white/20 hover:shadow-card"
                >
                  <div
                    className={`flex flex-wrap items-center gap-2 ${
                      left ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-300">
                      {job.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 flex items-center gap-2 text-lg font-bold text-white">
                    <Briefcase className="h-4 w-4 text-violet-400" />
                    {job.role}
                  </h3>
                  <p className="text-sm font-medium text-white/70">
                    {job.company}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-white/60">
                    {job.achievements.map((a, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-200/90">
                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{job.impact}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
