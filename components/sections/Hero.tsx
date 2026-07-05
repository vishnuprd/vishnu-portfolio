"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";
import type { Profile } from "@/lib/types";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CodeScene } from "@/components/CodeScene";
import { Particles } from "@/components/Particles";
import { useAppReady } from "@/lib/loadState";
import { ease } from "@/lib/motion";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { DrawUnderline } from "@/components/ui/DrawUnderline";

// Orchestrated entrance: the container holds children back until the preloader
// dismisses (useAppReady), then reveals them in a staggered cascade.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = text === word;
    const cleared = text === "";
    let delay = deleting ? 45 : 90;
    if (done && !deleting) delay = 1600;
    if (cleared && deleting) delay = 300;

    const t = setTimeout(() => {
      if (done && !deleting) return setDeleting(true);
      if (cleared && deleting) {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText((cur) =>
        deleting ? word.slice(0, cur.length - 1) : word.slice(0, cur.length + 1)
      );
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

export function Hero({ profile }: { profile: Profile }) {
  const typed = useTyping(profile.heroTyping);
  const ref = useRef<HTMLDivElement>(null);
  const ready = useAppReady();
  const reveal = ready ? "show" : "hidden";

  // mouse-based parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const tx = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const ty = useTransform(sy, [-0.5, 0.5], [-18, 18]);

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 md:pt-24"
    >
      <Particles className="opacity-70" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={reveal}
          className="relative z-10"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70"
          >
            {profile.available && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            )}
            Available for senior full-stack roles
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Building{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-animated animate-gradient-x">
                Scalable
              </span>
              <DrawUnderline delay={0.7} />
            </span>{" "}
            Digital Experiences with Modern Full Stack Technologies.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            {profile.tagline} specializing in React, Next.js, TypeScript,
            Node.js, PostgreSQL, MongoDB, Docker, AWS and cloud architecture.
          </motion.p>

          {/* typing line — decorative; aria-hidden so screen readers aren't
              spammed one character at a time. The real role lives in <h1>/<p>. */}
          <motion.div
            variants={item}
            aria-hidden
            className="mt-5 flex items-center gap-2 font-mono text-sm text-white/70"
          >
            <span className="text-emerald-400">const</span>
            <span className="text-sky-300">focus</span>
            <span className="text-white/40">=</span>
            <span className="text-amber-300">
              &quot;{typed}
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-sky-400 align-middle" />
              &quot;
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={profile.resume} variant="outline" download>
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail className="h-4 w-4" /> Contact Me
            </MagneticButton>
          </motion.div>

          {/* socials */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl glass text-white/70 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-glow"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D code scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.8, delay: 0.2, ease: ease.out }}
          style={{ perspective: 1200 }}
          className="relative hidden lg:block"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty }}
            className="relative [transform-style:preserve-3d]"
          >
            <CodeScene />

            {/* floating stat cards */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong absolute -left-8 top-10 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/20 text-emerald-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">470+ PRs</div>
                <div className="text-[11px] text-white/50">Merged in prod</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="glass-strong absolute -right-6 bottom-16 rounded-2xl px-4 py-3 shadow-card"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="text-sm font-bold text-white">3+ yrs</div>
              <div className="text-[11px] text-white/50">Full-stack shipping</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll-velocity-reactive marquee tech badges */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <VelocityMarquee baseVelocity={1.6}>
          {profile.heroBadges.map((b, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/60 backdrop-blur"
            >
              {b}
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
