"use client";

import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import type { NavLink, Profile } from "@/lib/types";

export function Footer({
  navLinks,
  profile,
}: {
  navLinks: NavLink[];
  profile: Profile;
}) {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <a
              href="#hero"
              className="inline-flex items-center gap-2.5 text-base font-bold text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-br shadow-glow">
                <Terminal className="h-4 w-4" />
              </span>
              {profile.firstName}
              <span className="text-gradient">.dev</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {profile.role} building scalable, production-ready web
              applications end-to-end.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
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
                className="grid h-10 w-10 place-items-center rounded-xl glass text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-glow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
            TypeScript & Framer Motion.
          </p>
          <p>Designed & built end-to-end.</p>
        </div>
      </div>
    </footer>
  );
}
