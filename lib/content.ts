import "server-only";

import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import * as defaults from "@/lib/data";
import type {
  About,
  ArchitectureLayer,
  BlogPost,
  Certification,
  DesignPillar,
  Experience,
  NavLink,
  Profile,
  Project,
  SiteContent,
  SkillGroup,
  Stat,
  Testimonial,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Defaults (fallback when Supabase is not configured or a table is  */
/*  empty). These come straight from lib/data.ts so the site always   */
/*  renders your real content, even before the database is populated.  */
/* ------------------------------------------------------------------ */
const defaultProfile: Profile = {
  ...defaults.profile,
  heroTyping: defaults.heroTyping,
  heroBadges: defaults.heroBadges,
};

/** Return `rows` if it's a non-empty array, otherwise the fallback. */
function orDefault<T>(rows: T[] | null | undefined, fallback: T[]): T[] {
  return rows && rows.length > 0 ? rows : fallback;
}

/**
 * Fetch the entire site's content. Never throws — on any failure it
 * degrades to the hardcoded defaults so the public page always renders.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSupabaseConfigured) {
    return {
      profile: defaultProfile,
      about: defaults.about,
      stats: defaults.stats,
      skillGroups: defaults.skillGroups,
      experience: defaults.experience,
      projects: defaults.projects as Project[],
      architectureLayers: defaults.architectureLayers,
      designPillars: defaults.designPillars,
      certifications: defaults.certifications,
      testimonials: defaults.testimonials,
      blogPosts: defaults.blogPosts,
      navLinks: defaults.navLinks,
    };
  }

  try {
    const supabase = createPublicClient();
    const order = { ascending: true } as const;

    const [
      profileRes,
      aboutRes,
      statsRes,
      skillsRes,
      expRes,
      projRes,
      archRes,
      pillarsRes,
      certsRes,
      testiRes,
      blogRes,
      navRes,
    ] = await Promise.all([
      supabase.from("profile").select("*").eq("id", true).maybeSingle(),
      supabase.from("about").select("*").eq("id", true).maybeSingle(),
      supabase.from("stats").select("*").order("sort_order", order),
      supabase.from("skill_groups").select("*").order("sort_order", order),
      supabase.from("experience").select("*").order("sort_order", order),
      supabase.from("projects").select("*").order("sort_order", order),
      supabase.from("architecture_layers").select("*").order("sort_order", order),
      supabase.from("design_pillars").select("*").order("sort_order", order),
      supabase.from("certifications").select("*").order("sort_order", order),
      supabase.from("testimonials").select("*").order("sort_order", order),
      supabase.from("blog_posts").select("*").order("sort_order", order),
      supabase.from("nav_links").select("*").order("sort_order", order),
    ]);

    return {
      profile: profileRes.data
        ? mapProfile(profileRes.data)
        : defaultProfile,
      about: aboutRes.data ? mapAbout(aboutRes.data) : defaults.about,
      stats: orDefault(statsRes.data?.map(mapStat), defaults.stats),
      skillGroups: orDefault(
        skillsRes.data?.map(mapSkillGroup),
        defaults.skillGroups,
      ),
      experience: orDefault(expRes.data?.map(mapExperience), defaults.experience),
      projects: orDefault(
        projRes.data?.map(mapProject),
        defaults.projects as Project[],
      ),
      architectureLayers: orDefault(
        archRes.data?.map(mapArchLayer),
        defaults.architectureLayers,
      ),
      designPillars: orDefault(
        pillarsRes.data?.map(mapPillar),
        defaults.designPillars,
      ),
      certifications: orDefault(
        certsRes.data?.map(mapCert),
        defaults.certifications,
      ),
      testimonials: orDefault(
        testiRes.data?.map(mapTestimonial),
        defaults.testimonials,
      ),
      blogPosts: orDefault(blogRes.data?.map(mapBlog), defaults.blogPosts),
      navLinks: orDefault(navRes.data?.map(mapNav), defaults.navLinks),
    };
  } catch (err) {
    console.error("[content] falling back to defaults:", err);
    return {
      profile: defaultProfile,
      about: defaults.about,
      stats: defaults.stats,
      skillGroups: defaults.skillGroups,
      experience: defaults.experience,
      projects: defaults.projects as Project[],
      architectureLayers: defaults.architectureLayers,
      designPillars: defaults.designPillars,
      certifications: defaults.certifications,
      testimonials: defaults.testimonials,
      blogPosts: defaults.blogPosts,
      navLinks: defaults.navLinks,
    };
  }
});

/**
 * Fetch a single blog post by its URL slug. Returns null if not found.
 * Falls back to the hardcoded defaults when Supabase isn't configured.
 */
export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    if (!isSupabaseConfigured) {
      return defaults.blogPosts.find((p) => p.slug === slug) ?? null;
    }
    try {
      const supabase = createPublicClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (data) return mapBlog(data);
      return defaults.blogPosts.find((p) => p.slug === slug) ?? null;
    } catch (err) {
      console.error("[content] getBlogPost failed:", err);
      return defaults.blogPosts.find((p) => p.slug === slug) ?? null;
    }
  },
);

/* ------------------------------------------------------------------ */
/*  Row → app-shape mappers (snake_case DB → camelCase app types)     */
/* ------------------------------------------------------------------ */
/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProfile(r: any): Profile {
  return {
    name: r.name ?? "",
    firstName: r.first_name ?? "",
    role: r.role ?? "",
    tagline: r.tagline ?? "",
    location: r.location ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    github: r.github ?? "",
    githubUser: r.github_user ?? "",
    linkedin: r.linkedin ?? "",
    calendly: r.calendly ?? "",
    resume: r.resume ?? "",
    available: r.available ?? true,
    heroTyping: r.hero_typing ?? [],
    heroBadges: r.hero_badges ?? [],
  };
}

function mapAbout(r: any): About {
  return { summary: r.summary ?? "", expertise: r.expertise ?? [] };
}

function mapStat(r: any): Stat {
  return { id: r.id, label: r.label, value: r.value, suffix: r.suffix };
}

function mapSkillGroup(r: any): SkillGroup {
  return {
    id: r.id,
    title: r.title,
    icon: r.icon,
    accent: r.accent,
    skills: r.skills ?? [],
  };
}

function mapExperience(r: any): Experience {
  return {
    id: r.id,
    company: r.company,
    role: r.role,
    duration: r.duration,
    location: r.location,
    tech: r.tech ?? [],
    achievements: r.achievements ?? [],
    impact: r.impact,
  };
}

function mapProject(r: any): Project {
  return {
    id: r.id,
    title: r.title,
    client: r.client,
    category: r.category,
    description: r.description,
    tech: r.tech ?? [],
    features: r.features ?? [],
    architecture: r.architecture,
    challenge: r.challenge,
    metrics: Array.isArray(r.metrics) ? r.metrics : [],
    accent: r.accent,
    live: r.live ?? undefined,
    github: r.github ?? undefined,
  };
}

function mapArchLayer(r: any): ArchitectureLayer {
  return { id: r.id, label: r.label, detail: r.detail, icon: r.icon };
}

function mapPillar(r: any): DesignPillar {
  return { id: r.id, title: r.title, body: r.body };
}

function mapCert(r: any): Certification {
  return { id: r.id, name: r.name, issuer: r.issuer, tag: r.tag };
}

function mapTestimonial(r: any): Testimonial {
  return { id: r.id, quote: r.quote, name: r.name, role: r.role };
}

function mapBlog(r: any): BlogPost {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug ?? "",
    excerpt: r.excerpt,
    content: r.content ?? "",
    tag: r.tag,
    read: r.read,
    date: r.date,
  };
}

function mapNav(r: any): NavLink {
  return { id: r.id, label: r.label, href: r.href };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
