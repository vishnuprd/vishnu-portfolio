/**
 * Declarative description of every editable section. The admin UI is fully
 * driven by this config — add a field here and it appears in the form and is
 * saved automatically. All `name`s are the exact database column names.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "tags" // string[] rendered as chips (short values)
  | "list" // string[] rendered as multiline rows (long sentences)
  | "metrics" // {label,value}[] rendered as key/value rows
  | "icon" // lucide icon name from a dropdown
  | "image" // uploaded file → public URL stored as text
  | "accent"; // tailwind gradient class, with suggestions

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  rows?: number; // textarea height (defaults to 4)
  mono?: boolean; // monospace font — good for Markdown / code bodies
};

export type SectionKind = "singleton" | "collection";

export type SectionConfig = {
  key: string; // URL slug
  label: string; // sidebar / heading label
  table: string; // database table
  kind: SectionKind;
  icon: string; // lucide icon name for the sidebar
  description: string;
  titleField?: string; // collection list: main label
  subtitleField?: string; // collection list: secondary label
  fields: Field[];
};

export const SECTIONS: SectionConfig[] = [
  {
    key: "profile",
    label: "Profile & Hero",
    table: "profile",
    kind: "singleton",
    icon: "Layout",
    description: "Your name, contact links, availability and hero content.",
    fields: [
      { name: "name", label: "Full name", type: "text" },
      { name: "first_name", label: "First name (logo)", type: "text" },
      { name: "role", label: "Role / title", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "github_user", label: "GitHub username", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "calendly", label: "Calendly URL", type: "text" },
      {
        name: "resume",
        label: "Resume (upload or URL)",
        type: "image",
        help: "Upload a PDF or paste a link. Shown on the Download Resume button.",
      },
      { name: "available", label: "Available for work", type: "boolean" },
      {
        name: "hero_typing",
        label: "Hero typing phrases",
        type: "tags",
        help: "The rotating phrases in the hero code line.",
      },
      {
        name: "hero_badges",
        label: "Hero marquee badges",
        type: "tags",
        help: "Tech names scrolling at the bottom of the hero.",
      },
    ],
  },
  {
    key: "about",
    label: "About",
    table: "about",
    kind: "singleton",
    icon: "Boxes",
    description: "Your summary paragraph and areas of expertise.",
    fields: [
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "expertise", label: "Expertise areas", type: "tags" },
    ],
  },
  {
    key: "stats",
    label: "Stats",
    table: "stats",
    kind: "collection",
    icon: "Gauge",
    description: "The animated number counters in the About section.",
    titleField: "label",
    subtitleField: "value",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "value", label: "Value (number)", type: "number" },
      { name: "suffix", label: "Suffix", type: "text", placeholder: "+ / %" },
    ],
  },
  {
    key: "skills",
    label: "Skill Groups",
    table: "skill_groups",
    kind: "collection",
    icon: "Code2",
    description: "Grouped skill cards (Frontend, Backend, …).",
    titleField: "title",
    subtitleField: "icon",
    fields: [
      { name: "title", label: "Group title", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "accent", label: "Accent gradient", type: "accent" },
      { name: "skills", label: "Skills", type: "tags" },
    ],
  },
  {
    key: "experience",
    label: "Experience",
    table: "experience",
    kind: "collection",
    icon: "Rocket",
    description: "Your work history timeline.",
    titleField: "company",
    subtitleField: "role",
    fields: [
      { name: "company", label: "Company", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "tech", label: "Tech stack", type: "tags" },
      { name: "achievements", label: "Achievements", type: "list" },
      { name: "impact", label: "Impact line", type: "textarea" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    table: "projects",
    kind: "collection",
    icon: "Boxes",
    description: "Your showcase project cards.",
    titleField: "title",
    subtitleField: "client",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "client", label: "Client", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "tech", label: "Tech stack", type: "tags" },
      { name: "features", label: "Features", type: "list" },
      { name: "architecture", label: "Architecture", type: "textarea" },
      { name: "challenge", label: "Challenge", type: "textarea" },
      { name: "metrics", label: "Metrics", type: "metrics" },
      { name: "accent", label: "Accent gradient", type: "accent" },
      { name: "live", label: "Live URL", type: "text" },
      { name: "github", label: "GitHub URL", type: "text" },
    ],
  },
  {
    key: "architecture",
    label: "Architecture Layers",
    table: "architecture_layers",
    kind: "collection",
    icon: "Network",
    description: "The system-design flow diagram layers.",
    titleField: "label",
    subtitleField: "detail",
    fields: [
      { name: "label", label: "Layer name", type: "text" },
      { name: "detail", label: "Detail", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
  },
  {
    key: "pillars",
    label: "Design Pillars",
    table: "design_pillars",
    kind: "collection",
    icon: "ShieldCheck",
    description: "The system-design principle cards.",
    titleField: "title",
    subtitleField: "body",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    table: "certifications",
    kind: "collection",
    icon: "ShieldCheck",
    description: "Certification badges.",
    titleField: "name",
    subtitleField: "issuer",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "issuer", label: "Issuer", type: "text" },
      { name: "tag", label: "Tag", type: "text" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    table: "testimonials",
    kind: "collection",
    icon: "Globe",
    description: "Client / colleague quotes.",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role / company", type: "text" },
    ],
  },
  {
    key: "blog",
    label: "Blog Posts",
    table: "blog_posts",
    kind: "collection",
    icon: "Terminal",
    description: "Blog / writing cards.",
    titleField: "title",
    subtitleField: "tag",
    fields: [
      { name: "title", label: "Title", type: "text" },
      {
        name: "slug",
        label: "URL slug",
        type: "text",
        placeholder: "advanced-react-patterns",
        help: "The page address: /blog/your-slug. Lowercase, words-separated-by-hyphens. Leave blank to keep the card non-clickable.",
      },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      {
        name: "content",
        label: "Article body (Markdown)",
        type: "textarea",
        rows: 24,
        mono: true,
        help: "The full post in Markdown. Supports # headings, **bold**, ```code blocks```, lists, links, tables, ```mermaid``` diagrams, and raw HTML callouts.",
      },
      { name: "tag", label: "Tag", type: "text" },
      { name: "read", label: "Read time", type: "text", placeholder: "8 min" },
      { name: "date", label: "Date", type: "text", placeholder: "2026" },
    ],
  },
  {
    key: "nav",
    label: "Nav Links",
    table: "nav_links",
    kind: "collection",
    icon: "GitBranch",
    description: "The navigation menu items.",
    titleField: "label",
    subtitleField: "href",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "href", label: "Anchor / URL", type: "text", placeholder: "#about" },
    ],
  },
];

export const SECTION_MAP: Record<string, SectionConfig> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s]),
);

export function getSection(key: string): SectionConfig | undefined {
  return SECTION_MAP[key];
}

/** Suggested Tailwind accent gradients for the accent picker. */
export const ACCENT_SUGGESTIONS = [
  "from-sky-400 to-blue-600",
  "from-violet-400 to-purple-600",
  "from-cyan-400 to-teal-500",
  "from-fuchsia-400 to-pink-600",
  "from-amber-400 to-orange-600",
  "from-emerald-500 to-green-600",
  "from-sky-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-teal-500",
  "from-fuchsia-500 to-pink-600",
  "from-orange-500 to-amber-600",
];
