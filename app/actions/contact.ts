"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { ContactState } from "./contact-state";
import { parseContactForm, validateContact, isValid } from "@/lib/validation/contact";

/**
 * Public contact-form submission handler (React 19 `useActionState`).
 *
 * Defense in depth, none of it trusting the client:
 *   1. Honeypot field ("company") — bots fill it; we pretend success and drop.
 *   2. Server-side validation with hard length caps (mirrored in the RLS
 *      `with check` policy, so a raw API call can't bypass it either).
 *   3. Best-effort in-memory rate limit per IP (see caveat below).
 *   4. Row Level Security: the anon key may only INSERT, never read the inbox.
 */

// --- Rate limiter -----------------------------------------------------------
// NOTE: in-memory, so it resets on cold start and isn't shared across
// serverless instances. It's a cheap first line against casual floods, not a
// hard guarantee — a production deploy would back this with Upstash/Redis.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // opportunistic cleanup so the map can't grow unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1. Honeypot — silent success (don't tip off the bot).
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — your message has been sent." };
  }

  const values = parseContactForm(formData);
  const { name, email, subject, message } = values;

  // 2. Validation (shared pure logic — see lib/validation/contact.ts).
  const errors = validateContact(values);
  if (!isValid(errors)) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  // 3. Rate limit by client IP.
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages already — please try again in a little while.",
      values,
    };
  }

  // 4. Persist (anon role → INSERT-only per RLS).
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
      user_agent: (hdrs.get("user-agent") ?? "").slice(0, 300),
    });
    if (error) {
      return {
        status: "error",
        message: "Something went wrong sending your message. Please email me directly.",
        values,
      };
    }
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email me directly.",
      values,
    };
  }

  return { status: "success", message: "Thanks — your message has been sent. I'll be in touch soon." };
}
