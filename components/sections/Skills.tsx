"use client";

import { motion } from "framer-motion";
import type { SkillGroup } from "@/lib/types";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

export function Skills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section id="skills" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Skills"
        title="A full-stack toolkit, battle-tested in production"
        subtitle="From type-safe frontends to cached backends and cloud deployment — the tools I reach for every day."
      />

      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = getIcon(group.icon);
          return (
            <motion.div
              key={group.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:border-white/20"
            >
              {/* hover glow */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${group.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
              />

              <div className="relative flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${group.accent} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {group.title}
                  </h3>
                  <p className="text-xs text-white/40">
                    {group.skills.length} technologies
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="chip hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </Stagger>
    </section>
  );
}
