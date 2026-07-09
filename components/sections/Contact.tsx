"use client";

import { useActionState, useEffect, useRef } from "react";
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
import type { Profile } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/app/actions/contact-state";

export function Contact({ profile }: { profile: Profile }) {
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

  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactState
  );
  const errors = state.errors ?? {};
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the fields once a submit succeeds.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition-all focus:border-sky-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 aria-[invalid=true]:border-red-400/60 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-400/20";

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
                  <div className="text-xs text-white/60">{c.label}</div>
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
            <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-glow sm:h-11 sm:w-11"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* form */}
        <Reveal direction="right">
          <form
            ref={formRef}
            action={formAction}
            noValidate
            className="rounded-3xl glass-strong p-6 sm:p-8"
          >
            {/* Honeypot — hidden from humans, tempting to bots. Real users
                leave it empty; a filled value is dropped server-side. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-1.5 block text-sm text-white/70">
                  Name
                </label>
                <input
                  id="cf-name"
                  name="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  maxLength={100}
                  defaultValue={state.values?.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "cf-name-err" : undefined}
                  className={field}
                />
                {errors.name && (
                  <p id="cf-name-err" className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-1.5 block text-sm text-white/70">
                  Email
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  maxLength={150}
                  defaultValue={state.values?.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cf-email-err" : undefined}
                  className={field}
                />
                {errors.email && (
                  <p id="cf-email-err" className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="cf-subject" className="mb-1.5 block text-sm text-white/70">
                Subject
              </label>
              <input
                id="cf-subject"
                name="subject"
                placeholder="Project inquiry"
                maxLength={150}
                defaultValue={state.values?.subject}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "cf-subject-err" : undefined}
                className={field}
              />
              {errors.subject && (
                <p id="cf-subject-err" className="mt-1 text-xs text-red-400">{errors.subject}</p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="cf-message" className="mb-1.5 block text-sm text-white/70">
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or role…"
                maxLength={5000}
                defaultValue={state.values?.message}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-err" : undefined}
                className={`${field} resize-none`}
              />
              {errors.message && (
                <p id="cf-message-err" className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isPending}
              whileTap={{ scale: 0.98 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-violet disabled:opacity-70 sm:w-auto"
            >
              {isPending ? (
                <>
                  Sending… <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : state.status === "success" ? (
                <>
                  Message sent <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </motion.button>

            {/* Status — announced to screen readers. */}
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 min-h-[1.25rem] text-xs ${
                state.status === "success"
                  ? "text-emerald-400"
                  : state.status === "error"
                  ? "text-red-400"
                  : "text-white/65"
              }`}
            >
              {state.status === "idle"
                ? "I usually reply within a day."
                : state.message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
