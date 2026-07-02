/**
 * Shared content types. These describe the data as the public site consumes
 * it (icons are plain strings here so they cross the server→client boundary).
 */

export type Profile = {
  name: string;
  firstName: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubUser: string;
  linkedin: string;
  calendly: string;
  resume: string;
  available: boolean;
  heroTyping: string[];
  heroBadges: string[];
};

export type About = {
  summary: string;
  expertise: string[];
};

export type Stat = {
  id?: string;
  label: string;
  value: number;
  suffix: string;
};

export type SkillGroup = {
  id?: string;
  title: string;
  /** Lucide icon name (see lib/icons.ts) */
  icon: string;
  accent: string;
  skills: string[];
};

export type Experience = {
  id?: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  tech: string[];
  achievements: string[];
  impact: string;
};

export type Metric = { label: string; value: string };

export type Project = {
  id?: string;
  title: string;
  client: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  architecture: string;
  challenge: string;
  metrics: Metric[];
  accent: string;
  live?: string;
  github?: string;
};

export type ArchitectureLayer = {
  id?: string;
  label: string;
  detail: string;
  /** Lucide icon name */
  icon: string;
};

export type DesignPillar = {
  id?: string;
  title: string;
  body: string;
};

export type Certification = {
  id?: string;
  name: string;
  issuer: string;
  tag: string;
};

export type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  role: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  excerpt: string;
  tag: string;
  read: string;
  date: string;
};

export type NavLink = {
  id?: string;
  label: string;
  href: string;
};

/** The full bundle the public page fetches in one go. */
export type SiteContent = {
  profile: Profile;
  about: About;
  stats: Stat[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  architectureLayers: ArchitectureLayer[];
  designPillars: DesignPillar[];
  certifications: Certification[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  navLinks: NavLink[];
};
