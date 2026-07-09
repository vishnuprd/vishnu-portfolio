"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Layout,
  Network,
  ShieldCheck,
  Server,
  Database,
  Zap,
  CloudUpload,
  Rocket,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import type { ArchitectureLayer, DesignPillar } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Layout,
  Network,
  ShieldCheck,
  Server,
  Database,
  Zap,
  CloudUpload,
  Rocket,
};

/**
 * One architecture layer whose reveal is driven CONTINUOUSLY by the section's
 * scroll progress (not a binary in-view trigger). Each layer owns a slice of
 * the 0→1 progress range, so they light up top-to-bottom as you scroll and
 * dim back out on the way up — a scrubbable, scroll-linked animation.
 */
function FlowLayer({
  layer,
  index,
  total,
  progress,
}: {
  layer: ArchitectureLayer;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = icons[layer.icon] ?? Server;
  const last = index === total - 1;

  // Spread the layers across the first ~85% of progress, each with overlap.
  const span = 0.85 / total;
  const start = index * span;
  const end = start + span * 1.6;

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const x = useTransform(progress, [start, end], [-28, 0]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <motion.div style={{ opacity }}>
      <motion.div
        style={{ x, scale }}
        whileHover={{ scale: 1.03, x: 4 }}
        className="flex items-center gap-4 rounded-2xl glass px-4 py-3.5 transition-colors hover:border-sky-400/40"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold text-white">{layer.label}</div>
          <div className="text-xs text-white/60">{layer.detail}</div>
        </div>
      </motion.div>
      {!last && (
        <div className="flex justify-center py-1.5">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.1 }}
          >
            <ChevronDown className="h-4 w-4 text-sky-400/60" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export function SystemDesign({
  architectureLayers,
  designPillars,
}: {
  architectureLayers: ArchitectureLayer[];
  designPillars: DesignPillar[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Progress from when the section enters the lower viewport to when its
  // content clears the upper third — the window over which the layers reveal.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <section id="system-design" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="System Design"
        title="Architecture that scales under real load"
        subtitle="How I structure applications — from the browser down to the deployment pipeline."
      />

      <div
        ref={sectionRef}
        className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
      >
        {/* flow diagram — pinned while its layers scrub in */}
        <div className="relative mx-auto w-full max-w-sm pl-8 lg:sticky lg:top-28 lg:self-start">
          {/* scroll-scrubbed connecting spine drawn via pathLength */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-2 top-0 h-full w-4"
            viewBox="0 0 8 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M4 0 L4 100" stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" />
            <motion.path
              d="M4 0 L4 100"
              stroke="url(#spine)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgb(var(--a1))" />
                <stop offset="0.5" stopColor="rgb(var(--a2))" />
                <stop offset="1" stopColor="rgb(var(--a3))" />
              </linearGradient>
            </defs>
          </svg>

          {architectureLayers.map((layer, i) => (
            <FlowLayer
              key={layer.label}
              layer={layer}
              index={i}
              total={architectureLayers.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* pillars */}
        <Stagger className="grid content-start gap-4 sm:grid-cols-2">
          {designPillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="rounded-2xl glass p-5 transition-all duration-300 hover:border-white/20"
            >
              <h3 className="text-base font-semibold text-white">
                <span className="mr-2 text-gradient">▹</span>
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
