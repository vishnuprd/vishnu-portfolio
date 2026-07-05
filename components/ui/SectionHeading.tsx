"use client";

import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-14 max-w-2xl text-center"
          : "mb-14 max-w-2xl"
      }
    >
      <Reveal direction="up">
        <span className="text-accent inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "rgb(var(--a1))",
              boxShadow: "0 0 10px rgb(var(--a1))",
            }}
          />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        <SplitText text={title} per="word" delay={0.08} />
      </h2>
      {subtitle && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={
              "mt-4 text-base leading-relaxed text-white/55 sm:text-lg" +
              (align === "center" ? " mx-auto" : "")
            }
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
