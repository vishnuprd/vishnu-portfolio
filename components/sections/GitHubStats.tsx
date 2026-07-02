"use client";

import { motion } from "framer-motion";
import { Github, GitCommit, GitPullRequest, Star, Flame } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/* Deterministic contribution grid (no Math.random — stable SSR) */
const WEEKS = 52;
const DAYS = 7;
function level(w: number, d: number) {
  const v = (w * 7 + d * 13 + ((w * d) % 5) * 17) % 11;
  if (v > 8) return 4;
  if (v > 6) return 3;
  if (v > 4) return 2;
  if (v > 2) return 1;
  return 0;
}
const cellColor = [
  "bg-white/[0.05]",
  "bg-sky-500/30",
  "bg-sky-500/55",
  "bg-violet-500/70",
  "bg-fuchsia-400",
];

const languages = [
  { name: "TypeScript", pct: 46, color: "from-sky-400 to-blue-500" },
  { name: "JavaScript", pct: 24, color: "from-amber-300 to-yellow-500" },
  { name: "CSS / Tailwind", pct: 14, color: "from-cyan-400 to-teal-500" },
  { name: "Python", pct: 9, color: "from-violet-400 to-purple-500" },
  { name: "Other", pct: 7, color: "from-fuchsia-400 to-pink-500" },
];

const kpis = [
  { icon: GitPullRequest, label: "Pull Requests", value: "470+" },
  { icon: GitCommit, label: "Commits / yr", value: "1.2k+" },
  { icon: Star, label: "Repositories", value: "40+" },
  { icon: Flame, label: "Longest Streak", value: "38 days" },
];

export function GitHubStats() {
  return (
    <section id="github" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="GitHub Activity"
        title="Consistent, production-focused contributions"
        subtitle="A snapshot of coding activity, languages and shipping cadence."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* contribution graph */}
        <Reveal direction="left" className="rounded-3xl glass p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Github className="h-4 w-4" /> @{profile.githubUser}
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-300 hover:underline"
            >
              View profile →
            </a>
          </div>

          <div className="mask-fade-x overflow-x-auto pb-2">
            <div className="flex gap-[3px]">
              {Array.from({ length: WEEKS }).map((_, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {Array.from({ length: DAYS }).map((_, d) => {
                    const lvl = level(w, d);
                    return (
                      <motion.span
                        key={d}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (w * 7 + d) * 0.0012 }}
                        className={`h-2.5 w-2.5 rounded-[3px] ${cellColor[lvl]}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-white/40">
            Less
            {cellColor.map((c, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${c}`} />
            ))}
            More
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((k) => {
              const Icon = k.icon;
              return (
                <div
                  key={k.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <Icon className="h-4 w-4 text-sky-300" />
                  <div className="mt-2 text-lg font-bold text-white">
                    {k.value}
                  </div>
                  <div className="text-[11px] text-white/45">{k.label}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* languages */}
        <Reveal direction="right" className="rounded-3xl glass p-6">
          <h3 className="text-sm font-semibold text-white">
            Most Used Languages
          </h3>
          <div className="mt-6 space-y-5">
            {languages.map((lang, i) => (
              <div key={lang.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-white/70">{lang.name}</span>
                  <span className="text-white/40">{lang.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.pct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-5">
            <div className="text-3xl font-bold text-gradient">A+</div>
            <p className="mt-1 text-sm text-white/60">
              Code quality grade — typed, tested and reviewed across 470+ PRs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
