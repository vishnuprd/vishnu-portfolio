"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/app/admin/actions";

export function SignOutButton({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <button
        onClick={() => signOut()}
        className="grid h-9 w-9 place-items-center rounded-lg text-white/60 hover:bg-white/[0.06] hover:text-white"
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    );
  }
  return (
    <button
      onClick={() => signOut()}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
