import { describe, it, expect } from "vitest";
import {
  validateContact,
  parseContactForm,
  isValid,
  CONTACT_LIMITS,
  type ContactFields,
} from "@/lib/validation/contact";

const valid: ContactFields = {
  name: "Jane Recruiter",
  email: "jane@acme.com",
  subject: "Senior FE role",
  message: "Hi Vishnu, we have a role that fits your background well.",
};

describe("validateContact", () => {
  it("accepts a well-formed submission", () => {
    const errors = validateContact(valid);
    expect(isValid(errors)).toBe(true);
    expect(errors).toEqual({});
  });

  it("requires name, email and message", () => {
    const errors = validateContact({ name: "", email: "", subject: "", message: "" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
    expect(isValid(errors)).toBe(false);
  });

  it("does not require a subject", () => {
    const errors = validateContact({ ...valid, subject: "" });
    expect(errors.subject).toBeUndefined();
  });

  it.each([
    "not-an-email",
    "missing@tld",
    "@no-local.com",
    "spaces in@email.com",
    "trailing@dot.",
  ])("rejects invalid email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it("rejects a too-short message", () => {
    expect(validateContact({ ...valid, message: "hi" }).message).toBeDefined();
  });

  it("enforces max lengths", () => {
    expect(validateContact({ ...valid, name: "a".repeat(CONTACT_LIMITS.name + 1) }).name).toBeDefined();
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.messageMax + 1) }).message).toBeDefined();
    expect(validateContact({ ...valid, subject: "a".repeat(CONTACT_LIMITS.subject + 1) }).subject).toBeDefined();
  });

  it("accepts a message exactly at the minimum length", () => {
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.messageMin) }).message).toBeUndefined();
  });
});

describe("parseContactForm", () => {
  it("trims whitespace from every field", () => {
    const fd = new FormData();
    fd.set("name", "  Jane  ");
    fd.set("email", " jane@acme.com ");
    fd.set("subject", "  hi ");
    fd.set("message", "  a real message here  ");
    expect(parseContactForm(fd)).toEqual({
      name: "Jane",
      email: "jane@acme.com",
      subject: "hi",
      message: "a real message here",
    });
  });

  it("defaults missing fields to empty strings", () => {
    expect(parseContactForm(new FormData())).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  });
});
