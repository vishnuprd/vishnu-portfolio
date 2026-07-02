import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Terminal, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SECTIONS } from "@/lib/admin/config";
import { getIcon } from "@/lib/icons";
import { SignOutButton } from "./_components/SignOutButton";

export const metadata: Metadata = {
  title: "Admin — Portfolio",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard: must be signed in (defense-in-depth on top of middleware).
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#04050a] text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-white/[0.02] p-4 md:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2.5 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-br shadow-glow">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold">Portfolio CMS</span>
        </Link>

        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {SECTIONS.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <Link
                key={s.key}
                href={`/admin/${s.key}`}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {s.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View site
          </a>
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#04050a]/80 px-4 py-3 backdrop-blur md:hidden">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-bold">
            <Terminal className="h-4 w-4" /> Portfolio CMS
          </Link>
          <SignOutButton compact />
        </header>

        <div className="md:hidden">
          <nav className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2">
            {SECTIONS.map((s) => (
              <Link
                key={s.key}
                href={`/admin/${s.key}`}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-white/60 hover:bg-white/[0.06] hover:text-white"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
