"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { Certification } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

export function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials across the stack"
        subtitle="Verified skills in frontend, backend, cloud and databases."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c) => (
          <motion.div
            key={c.name}
            variants={staggerItem}
            whileHover={{ y: -6, rotate: -1 }}
            className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:border-white/20 hover:shadow-glow"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300">
                <Award className="h-5 w-5" />
              </span>
              <span className="chip">{c.tag}</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {c.name}
            </h3>
            <p className="mt-1 text-xs text-white/45">{c.issuer}</p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
