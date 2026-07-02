"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSection } from "@/lib/admin/config";
import * as defaults from "@/lib/data";

/**
 * Auth guard — every write goes through this first. Returns the
 * session-bound Supabase client so writes run as the logged-in admin
 * (enforced by Row Level Security; no service-role key needed).
 *
 * Optional hardening: set ADMIN_EMAIL in the environment to restrict
 * access to a single email address.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const allowed = process.env.ADMIN_EMAIL;
  if (allowed && user.email?.toLowerCase() !== allowed.toLowerCase()) {
    redirect("/admin/login");
  }

  return { supabase, user };
}

type RecordData = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/*  Save (insert or update) a record.                                 */
/* ------------------------------------------------------------------ */
export async function saveRecord(
  sectionKey: string,
  id: string | null,
  data: RecordData,
): Promise<{ ok: boolean; error?: string }> {
  const { supabase: db } = await requireAdmin();
  const section = getSection(sectionKey);
  if (!section) return { ok: false, error: "Unknown section" };

  if (section.kind === "singleton") {
    const { error } = await db
      .from(section.table)
      .upsert({ ...data, id: true, updated_at: new Date().toISOString() });
    if (error) return { ok: false, error: error.message };
  } else if (id) {
    const { error } = await db.from(section.table).update(data).eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    // New collection row — append to the end if no sort_order given.
    if (data.sort_order == null) {
      const { count } = await db
        .from(section.table)
        .select("*", { count: "exact", head: true });
      data.sort_order = count ?? 0;
    }
    const { error } = await db.from(section.table).insert(data);
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath(`/admin/${sectionKey}`);
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/*  Delete a collection record.                                       */
/* ------------------------------------------------------------------ */
export async function deleteRecord(
  sectionKey: string,
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const { supabase: db } = await requireAdmin();
  const section = getSection(sectionKey);
  if (!section) return { ok: false, error: "Unknown section" };

  const { error } = await db.from(section.table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/");
  revalidatePath(`/admin/${sectionKey}`);
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/*  Upload an image / file to Supabase Storage, return its public URL. */
/* ------------------------------------------------------------------ */
export async function uploadFile(
  formData: FormData,
): Promise<{ ok: boolean; url?: string; error?: string }> {
  const { supabase: db } = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided" };
  }

  const ext = file.name.split(".").pop() || "bin";
  const safe = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .slice(0, 40);
  const path = `uploads/${safe}-${Math.round(file.size)}.${ext}`;

  const { error } = await db.storage
    .from("portfolio")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) return { ok: false, error: error.message };

  const { data } = db.storage.from("portfolio").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

/* ------------------------------------------------------------------ */
/*  Seed every table from the hardcoded defaults in lib/data.ts.       */
/*  Wipes existing rows first so it's a clean "import starter content". */
/* ------------------------------------------------------------------ */
export async function seedDefaults(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const { supabase: db } = await requireAdmin();

  try {
    // Singletons — map camelCase defaults to snake_case columns explicitly.
    const p = defaults.profile;
    await db.from("profile").upsert({
      id: true,
      name: p.name,
      first_name: p.firstName,
      role: p.role,
      tagline: p.tagline,
      location: p.location,
      email: p.email,
      phone: p.phone,
      github: p.github,
      github_user: p.githubUser,
      linkedin: p.linkedin,
      calendly: p.calendly,
      resume: p.resume,
      available: p.available,
      hero_typing: defaults.heroTyping,
      hero_badges: defaults.heroBadges,
      updated_at: new Date().toISOString(),
    });
    await db.from("about").upsert({
      id: true,
      summary: defaults.about.summary,
      expertise: defaults.about.expertise,
      updated_at: new Date().toISOString(),
    });

    const wipe = async (table: string) =>
      db.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const collections: { table: string; rows: RecordData[] }[] = [
      {
        table: "stats",
        rows: defaults.stats.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "skill_groups",
        rows: defaults.skillGroups.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "experience",
        rows: defaults.experience.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "projects",
        rows: defaults.projects.map((p, i) => ({
          ...p,
          live: p.live ?? null,
          github: p.github ?? null,
          sort_order: i,
        })),
      },
      {
        table: "architecture_layers",
        rows: defaults.architectureLayers.map((s, i) => ({
          ...s,
          sort_order: i,
        })),
      },
      {
        table: "design_pillars",
        rows: defaults.designPillars.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "certifications",
        rows: defaults.certifications.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "testimonials",
        rows: defaults.testimonials.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "blog_posts",
        rows: defaults.blogPosts.map((s, i) => ({ ...s, sort_order: i })),
      },
      {
        table: "nav_links",
        rows: defaults.navLinks.map((s, i) => ({ ...s, sort_order: i })),
      },
    ];

    for (const { table, rows } of collections) {
      await wipe(table);
      const { error } = await db.from(table).insert(rows);
      if (error) throw error;
    }

    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* ------------------------------------------------------------------ */
/*  Sign out.                                                          */
/* ------------------------------------------------------------------ */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
