"use client";

import { motion } from "framer-motion";
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
import { architectureLayers, designPillars } from "@/lib/data";
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

export function SystemDesign() {
  return (
    <section id="system-design" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="System Design"
        title="Architecture that scales under real load"
        subtitle="How I structure applications — from the browser down to the deployment pipeline."
      />

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* flow diagram */}
        <div className="relative mx-auto w-full max-w-sm">
          {architectureLayers.map((layer, i) => {
            const Icon = icons[layer.icon] ?? Server;
            const last = i === architectureLayers.length - 1;
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-center gap-4 rounded-2xl glass px-4 py-3.5 transition-colors hover:border-sky-400/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {layer.label}
                    </div>
                    <div className="text-xs text-white/45">{layer.detail}</div>
                  </div>
                </motion.div>
                {!last && (
                  <div className="flex justify-center py-1.5">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      <ChevronDown className="h-4 w-4 text-sky-400/60" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
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
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
