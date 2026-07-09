"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Testimonials"
        title="What teams say about working with me"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-8 shadow-card sm:p-10"
            >
              <Quote className="h-9 w-9 text-sky-400/60" />
              <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">
                “{t.quote}”
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-br text-lg font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-white/65">{t.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full glass text-white/70 transition hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-sky-400" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full glass text-white/70 transition hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
