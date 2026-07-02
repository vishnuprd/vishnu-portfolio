"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent";

const contactItems = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

const socials = [
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Calendar, label: "Calendly", href: profile.calendly },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Name is required";
    const email = String(data.get("email")).trim();
    if (!email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email";
    if (!String(data.get("message")).trim())
      next.message = "Message is required";

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    // Simulated submit — wire to your API / Resend / Formspree here.
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    }, 1400);
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-sky-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20";

  return (
    <section id="contact" className="section-pad scroll-mt-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something scalable together"
        subtitle="Open to senior full-stack roles, freelance projects and technical collaboration."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* info */}
        <Reveal direction="left" className="flex flex-col gap-4">
          {contactItems.map((c) => {
            const Icon = c.icon;
            const body = (
              <div className="flex items-center gap-4 rounded-2xl glass p-4 transition-all duration-300 hover:border-white/20 hover:shadow-glow">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-white/45">{c.label}</div>
                  <div className="truncate text-sm font-medium text-white">
                    {c.value}
                  </div>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href}>
                {body}
              </a>
            ) : (
              <div key={c.label}>{body}</div>
            );
          })}

          <div className="rounded-2xl glass p-5">
            <div className="text-sm font-medium text-white">Find me online</div>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-glow"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* form */}
        <Reveal direction="right">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl glass-strong p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-white/70">
                  Name
                </label>
                <input name="name" placeholder="Jane Doe" className={field} />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-white/70">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  className={field}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm text-white/70">
                Subject
              </label>
              <input
                name="subject"
                placeholder="Project inquiry"
                className={field}
              />
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm text-white/70">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project or role…"
                className={`${field} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileTap={{ scale: 0.98 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-violet disabled:opacity-70 sm:w-auto"
            >
              {status === "idle" && (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Sending… <Loader2 className="h-4 w-4 animate-spin" />
                </>
              )}
              {status === "sent" && (
                <>
                  Message sent <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </motion.button>
            <p className="mt-3 text-xs text-white/35">
              This demo form validates locally. Connect it to Resend, Formspree
              or an API route to receive real messages.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
