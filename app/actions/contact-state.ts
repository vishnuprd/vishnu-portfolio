/**
 * Shared shape + initial value for the contact form action. Kept OUT of the
 * "use server" module because those files may only export async functions.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
  /** Echoed back so the client can repopulate fields after a failed submit. */
  values?: { name: string; email: string; subject: string; message: string };
};

export const initialContactState: ContactState = { status: "idle" };
