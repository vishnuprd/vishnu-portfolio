"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { Certification } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { Spotlight } from "@/components/ui/Spotlight";

function CertCard({ c }: { c: Certification }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      className="group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:border-white/20 hover:shadow-glow sm:w-[340px]"
    >
      <Spotlight />
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-500/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300">
          <Award className="h-5 w-5" />
        </span>
        <span className="chip">{c.tag}</span>
      </div>
      <h3 className="relative mt-4 text-base font-semibold text-white">
        {c.name}
      </h3>
      <p className="relative mt-1 text-xs text-white/60">{c.issuer}</p>
    </motion.div>
  );
}

export function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials across the stack"
          subtitle="Verified skills in frontend, backend, cloud and databases — scroll to browse."
        />
      </div>

      <HorizontalScroll trackClassName="px-5 sm:px-8">
        {certifications.map((c) => (
          <CertCard key={c.name} c={c} />
        ))}
      </HorizontalScroll>
    </section>
  );
}
