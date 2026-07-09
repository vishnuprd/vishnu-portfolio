/**
 * Pure contact-form validation — no server/framework imports, so it's shared
 * by the server action AND unit-tested in isolation. The length caps here are
 * mirrored in the RLS `with check` policy (supabase/contact_messages.sql).
 */
export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const CONTACT_LIMITS = {
  name: 100,
  email: 150,
  subject: 150,
  messageMin: 10,
  messageMax: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Read + trim the four fields from a submitted FormData. */
export function parseContactForm(formData: FormData): ContactFields {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

/** Returns a map of field → message. Empty object means valid. */
export function validateContact(f: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!f.name) errors.name = "Name is required.";
  else if (f.name.length > CONTACT_LIMITS.name) errors.name = "Name is too long.";

  if (!f.email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email)) errors.email = "Enter a valid email address.";
  else if (f.email.length > CONTACT_LIMITS.email) errors.email = "Email is too long.";

  if (f.subject.length > CONTACT_LIMITS.subject) errors.subject = "Subject is too long.";

  if (!f.message) errors.message = "Message is required.";
  else if (f.message.length < CONTACT_LIMITS.messageMin)
    errors.message = "Please add a little more detail (10+ characters).";
  else if (f.message.length > CONTACT_LIMITS.messageMax)
    errors.message = "Message is too long (5000 characters max).";

  return errors;
}

export function isValid(errors: ContactErrors): boolean {
  return Object.keys(errors).length === 0;
}
