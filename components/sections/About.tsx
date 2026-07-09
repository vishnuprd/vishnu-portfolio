"use client";

import { CheckCircle2 } from "lucide-react";
import type { About as AboutType, Stat } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";

export function About({ about, stats }: { about: AboutType; stats: Stat[] }) {
  return (
    <section id="about" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="About"
        title="Engineering end-to-end, from pixel to pipeline"
        subtitle="I bridge product design and infrastructure — shipping features that are fast, secure and built to scale."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* summary + expertise */}
        <div>
          <Reveal direction="left">
            <p className="text-lg leading-relaxed text-white/70">
              {about.summary}
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {about.expertise.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                {item}
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* stats grid */}
        <Stagger className="grid grid-cols-2 gap-4 self-start">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-glow ${
                i === 0 ? "col-span-2" : ""
              }`}
            >
              <Spotlight />
              <div className="relative text-3xl font-bold text-gradient sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="relative mt-1.5 text-sm text-white/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
