/* ------------------------------------------------------------------ */
/*  PROFILE — edit these to update contact links across the whole site */
/* ------------------------------------------------------------------ */
export const profile = {
  name: "Vishnu Prasad R",
  firstName: "Vishnu",
  role: "Senior Full Stack Software Engineer",
  tagline: "Full Stack Software Engineer",
  location: "Coimbatore, India",
  email: "vishnuravichandran.28@gmail.com",
  phone: "+91 96776 58304",
  github: "https://github.com/vishnuprd",
  githubUser: "vishnuprd",
  linkedin: "https://www.linkedin.com/in/vpd93",
  // TODO: replace with your real Calendly link
  calendly: "https://calendly.com/vishnuprd",
  resume: "/Vishnu_Prasad_Resume.pdf",
  available: true,
};

export const heroTyping = [
  "React & Next.js",
  "TypeScript",
  "Node.js APIs",
  "PostgreSQL & Prisma",
  "Cloud Architecture",
  "Scalable SaaS",
];

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */
export const about = {
  summary:
    "Frontend and Full Stack Developer with 3+ years of experience building scalable web applications across PropTech, manufacturing, and travel domains. I turn complex product requirements into production-ready features — from interactive dashboards and RBAC systems to multi-tenant SaaS platforms — and ship them end-to-end in fast-moving Agile teams.",
  expertise: [
    "Frontend Engineering",
    "Backend Development",
    "REST APIs",
    "GraphQL",
    "Authentication & RBAC",
    "Database Design",
    "System Design",
    "Performance Optimization",
    "Clean Architecture",
    "Scalable Applications",
    "Cloud Deployment",
    "DevOps & CI/CD",
    "Security Best Practices",
    "Observability & Monitoring",
  ],
};

export const stats: { label: string; value: number; suffix: string }[] = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Production Apps Shipped", value: 9, suffix: "+" },
  { label: "Pull Requests Merged", value: 470, suffix: "+" },
  { label: "Technologies Mastered", value: 35, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
];

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */
export const skillGroups: {
  title: string;
  icon: string;
  accent: string;
  skills: string[];
}[] = [
  {
    title: "Frontend",
    icon: "Code2",
    accent: "from-sky-400 to-blue-600",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Framer Motion",
      "Recharts",
      "Mapbox GL",
      "HTML5 / CSS3",
      "Responsive Design",
      "Accessibility (WCAG)",
      "Code Splitting",
      "Performance Optimization",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    accent: "from-violet-400 to-purple-600",
    skills: [
      "Node.js",
      "Next.js API Routes",
      "Python",
      "REST APIs",
      "NextAuth",
      "JWT / OAuth",
      "RBAC",
      "API Security",
      "Rate Limiting",
      "WebSockets",
      "Cron Jobs",
      "Caching",
      "Redis",
      "Resend (Email)",
      "jsPDF / ExcelJS",
    ],
  },
  {
    title: "Database",
    icon: "Database",
    accent: "from-cyan-400 to-teal-500",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Prisma ORM",
      "Drizzle ORM",
      "SQL Optimization",
      "Database Indexing",
      "Multi-tenant Schemas",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "Cloud",
    accent: "from-fuchsia-400 to-pink-600",
    skills: [
      "Docker",
      "AWS S3",
      "Vercel",
      "Vercel Blob",
      "Render",
      "Railway",
      "GitHub Actions",
      "CI/CD",
      "Sentry",
      "PostHog",
      "Vite",
    ],
  },
  {
    title: "Tools & Practice",
    icon: "Wrench",
    accent: "from-amber-400 to-orange-600",
    skills: [
      "Git & GitHub",
      "NPM",
      "VS Code",
      "Postman",
      "Figma",
      "Storyblok CMS",
      "Agile / Scrum",
      "i18n",
    ],
  },
];

/* Marquee badges for the hero */
export const heroBadges = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Supabase",
  "Redis",
  "Docker",
  "AWS",
  "TanStack Query",
  "Tailwind CSS",
  "Framer Motion",
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */
export const experience: {
  company: string;
  role: string;
  duration: string;
  location: string;
  tech: string[];
  achievements: string[];
  impact: string;
}[] = [
  {
    company: "ColiviQ",
    role: "Full Stack Developer",
    duration: "Jan 2026 — Present",
    location: "Germany (Remote)",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "Tailwind CSS",
      "Shadcn UI",
      "Mapbox GL",
      "Recharts",
      "Storyblok",
    ],
    achievements: [
      "Built and maintained features for a PropTech property-management SaaS platform using React, TypeScript, Vite, Supabase and Shadcn/Radix UI.",
      "Developed interactive property-listing pages with live filters and a Mapbox GL map view, improving property discovery.",
      "Implemented role-based access control and auth flows for Super Admin, property-owner and tenant roles.",
      "Shipped a super-admin tenant-management dashboard and a multi-step property onboarding wizard with dynamic revenue configuration.",
      "Integrated Recharts analytics dashboards and Storyblok CMS for multilingual (i18n) content.",
      "Built reminders, notifications, booking workflows and jsPDF report generation; monitored health via Sentry & PostHog.",
    ],
    impact: "Contributed across 470+ pull requests on a live production SaaS.",
  },
  {
    company: "Shivatex Texyarn Limited",
    role: "Full Stack Developer",
    duration: "May 2024 — Dec 2025",
    location: "Coimbatore, India",
    tech: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "TanStack Query",
      "Redis",
      "Framer Motion",
    ],
    achievements: [
      "Led end-to-end development of 4 production applications spanning asset management, order workflows, corporate presence and product visualization.",
      "Applied Agile methodologies, fixed front-end defects and optimized cross-browser responsiveness.",
      "Collaborated closely with designers, backend engineers and QA to deliver client-ready releases.",
    ],
    impact: "Delivered 4 internal & client-facing platforms used across divisions.",
  },
  {
    company: "Wij Zijn Reizigers Pvt. Ltd.",
    role: "Frontend Developer — Freelance",
    duration: "Feb 2023 — Apr 2024",
    location: "Maharashtra, India",
    tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "AWS S3", "AI Workflows"],
    achievements: [
      "Engineered a Visa Application Interface enabling travelers to upload documents and track real-time application status.",
      "Integrated conversational AI workflows so users could update information, submit documents and resolve pending requirements via chat.",
      "Designed and built the 'Visa Genie' chat interface, improving clarity of required / provided / pending items.",
      "Identified Railway hosting latency and migrated to a Render (India-based) region, significantly improving performance.",
    ],
    impact:
      "Laid the foundation for an AI-powered travel & visa-automation platform.",
  },
];

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */
export const projects: {
  title: string;
  client: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  architecture: string;
  challenge: string;
  metrics: { label: string; value: string }[];
  accent: string;
  live?: string;
  github?: string;
}[] = [
  {
    title: "Property Management SaaS",
    client: "ColiviQ · Germany",
    category: "PropTech · Multi-tenant SaaS",
    description:
      "A production property-management platform with interactive map-based listings, role-based dashboards, tenant onboarding wizards and multilingual content.",
    tech: ["React", "TypeScript", "Vite", "Supabase", "Mapbox GL", "Recharts", "Storyblok"],
    features: [
      "Live-filtered property listings with Mapbox GL map view",
      "RBAC for Super Admin / owner / tenant roles",
      "Multi-step onboarding wizard with dynamic revenue config",
      "Analytics dashboards, booking workflows & PDF reports",
    ],
    architecture:
      "React + Vite SPA → Supabase (Postgres + Auth + RLS) → Storyblok CMS for i18n → Sentry + PostHog observability.",
    challenge:
      "Modeling multi-tenant row-level security while keeping owner and tenant dashboards fast and cleanly separated.",
    metrics: [
      { label: "PRs merged", value: "470+" },
      { label: "User roles", value: "3" },
      { label: "Languages", value: "i18n" },
    ],
    accent: "from-sky-500 to-blue-600",
  },
  {
    title: "Enterprise Asset Management System",
    client: "Shivatex Texyarn",
    category: "Internal Platform",
    description:
      "A full-stack internal platform for tracking company assets with image support, activity logs, lost-asset reporting, Excel export and an admin panel.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Zod", "ExcelJS"],
    features: [
      "Asset lifecycle tracking with image attachments",
      "Activity logs & lost-asset reporting workflows",
      "One-click Excel export via ExcelJS",
      "Role-gated admin panel with NextAuth",
    ],
    architecture:
      "Next.js App Router → Prisma ORM → PostgreSQL, with Zod-validated server actions and NextAuth session/RBAC.",
    challenge:
      "Designing an indexed schema that keeps asset history queryable at scale while supporting bulk Excel exports.",
    metrics: [
      { label: "Data integrity", value: "Zod" },
      { label: "Export", value: "XLSX" },
      { label: "Auth", value: "RBAC" },
    ],
    accent: "from-violet-500 to-purple-600",
  },
  {
    title: "Order Management Platform",
    client: "Shivatex Texyarn",
    category: "Multi-tenant Operations",
    description:
      "Multi-tenant order-tracking platform with multi-division access control, SLA management, audit trails, analytics dashboards and print-ready order views.",
    tech: ["Next.js", "Prisma", "TanStack Query", "Recharts", "Redis", "Resend", "Vercel Blob"],
    features: [
      "Multi-division access control & audit trail",
      "SLA management with email notifications (Resend)",
      "Recharts analytics dashboards + XLSX export",
      "Redis caching & print-ready order views",
    ],
    architecture:
      "Next.js → TanStack Query cache → Prisma/Postgres, Redis for hot reads, Vercel Blob for files, Resend for transactional email.",
    challenge:
      "Keeping dashboards responsive under heavy read load — solved with Redis caching and query-level pagination.",
    metrics: [
      { label: "Cache", value: "Redis" },
      { label: "SLA", value: "Tracked" },
      { label: "Divisions", value: "Multi" },
    ],
    accent: "from-cyan-500 to-teal-500",
  },
  {
    title: "Ellendorf Wallpaper Visualizer",
    client: "Ellendorf (via Shivatex)",
    category: "Interactive Product Dashboard",
    description:
      "An interactive wallpaper product dashboard featuring browsing, a recent-installations gallery, services directory and auth-gated PDF export.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Radix UI", "jsPDF"],
    features: [
      "Rich wallpaper browsing & filtering experience",
      "Recent-installations gallery with motion",
      "Services directory & catalog",
      "Auth-gated PDF export via jsPDF",
    ],
    architecture:
      "Next.js + Framer Motion front end with Radix UI primitives and jsPDF client-side document generation behind auth.",
    challenge:
      "Delivering fluid gallery animations without hurting Core Web Vitals on image-heavy pages.",
    metrics: [
      { label: "Animations", value: "Framer" },
      { label: "Export", value: "PDF" },
      { label: "UI", value: "Radix" },
    ],
    accent: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Visa Genie — AI Visa Platform",
    client: "Wij Zijn Reizigers",
    category: "Travel · Conversational AI",
    description:
      "A visa application interface with real-time status tracking and a conversational 'Visa Genie' assistant that guides travelers through documents and requirements.",
    tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "AWS S3", "AI Workflows"],
    features: [
      "Document upload with real-time application status",
      "Conversational AI to resolve pending requirements",
      "'Visa Genie' chat UI/UX for clarity of items",
      "Automated visa-type selection & document validation",
    ],
    architecture:
      "Next.js → Drizzle ORM → PostgreSQL, AWS S3 for document storage, AI workflows for guided data capture; migrated hosting to Render for latency.",
    challenge:
      "Cutting request latency for Indian users — diagnosed Railway hosting bottleneck and migrated to a Render India region.",
    metrics: [
      { label: "Latency", value: "↓ Fixed" },
      { label: "Storage", value: "AWS S3" },
      { label: "AI", value: "Chat" },
    ],
    accent: "from-emerald-500 to-green-600",
  },
  {
    title: "Shivatex Corporate Website",
    client: "Shivatex Texyarn",
    category: "3D Marketing Site",
    description:
      "A corporate website with 3D interactive hero animations and sections for About, Brands, Divisions, Careers, Board of Directors and Shareholders.",
    tech: ["Next.js", "Spline 3D", "Framer Motion", "Tailwind CSS"],
    features: [
      "3D interactive hero powered by Spline",
      "Scroll-driven Framer Motion reveals",
      "Structured corporate & investor sections",
      "Fully responsive brand experience",
    ],
    architecture:
      "Next.js with embedded Spline 3D scenes and Framer Motion scroll animations, statically optimized for fast delivery.",
    challenge:
      "Balancing an immersive 3D hero against load performance using lazy hydration and optimized assets.",
    metrics: [
      { label: "3D", value: "Spline" },
      { label: "Motion", value: "Framer" },
      { label: "Type", value: "SSG" },
    ],
    accent: "from-orange-500 to-amber-600",
  },
];

/* ------------------------------------------------------------------ */
/*  SYSTEM DESIGN                                                      */
/* ------------------------------------------------------------------ */
export const architectureLayers = [
  { label: "Client / Frontend", detail: "Next.js · React · TypeScript", icon: "Layout" },
  { label: "API Gateway", detail: "Edge routing · Rate limiting", icon: "Network" },
  { label: "Authentication", detail: "NextAuth · JWT · RBAC", icon: "ShieldCheck" },
  { label: "Backend Services", detail: "Node · REST · Server Actions", icon: "Server" },
  { label: "Database", detail: "PostgreSQL · Prisma · Drizzle", icon: "Database" },
  { label: "Redis Cache", detail: "Hot reads · Sessions · Queues", icon: "Zap" },
  { label: "Cloud Storage", detail: "AWS S3 · Vercel Blob", icon: "CloudUpload" },
  { label: "CI/CD & Deploy", detail: "GitHub Actions · Vercel · Docker", icon: "Rocket" },
];

export const designPillars = [
  { title: "Scalability", body: "Stateless services, connection pooling and horizontal-ready design so traffic spikes don't break UX." },
  { title: "Performance", body: "Redis caching, query indexing, code-splitting and lazy loading for sub-second interactions." },
  { title: "Security", body: "RBAC, JWT/OAuth, input validation with Zod, rate limiting and least-privilege access." },
  { title: "Monitoring", body: "Sentry error tracking and PostHog product analytics for real-time observability." },
  { title: "Logging", body: "Structured audit trails across order & asset flows for traceability and compliance." },
  { title: "Error Handling", body: "Typed error boundaries, graceful degradation and idempotent server actions." },
];

/* ------------------------------------------------------------------ */
/*  CERTIFICATIONS                                                     */
/* ------------------------------------------------------------------ */
export const certifications = [
  { name: "React Developer", issuer: "Meta / Frontend", tag: "Frontend" },
  { name: "Node.js Backend", issuer: "Backend Engineering", tag: "Backend" },
  { name: "TypeScript", issuer: "Advanced Types", tag: "Language" },
  { name: "AWS Cloud Foundations", issuer: "Amazon Web Services", tag: "Cloud" },
  { name: "Docker Essentials", issuer: "Containerization", tag: "DevOps" },
  { name: "PostgreSQL", issuer: "Relational Databases", tag: "Database" },
  { name: "MongoDB", issuer: "NoSQL Databases", tag: "Database" },
  { name: "JavaScript (ES6+)", issuer: "Modern JS", tag: "Language" },
];

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
export const testimonials = [
  {
    quote:
      "Vishnu ships production-ready features fast without cutting corners. Our SaaS dashboards and RBAC came together cleanly — he thinks about edge cases before they become bugs.",
    name: "Product Lead",
    role: "ColiviQ · PropTech SaaS",
  },
  {
    quote:
      "He owned four internal platforms end-to-end. The asset and order-management systems became core to our operations — reliable, well-architected and genuinely pleasant to use.",
    name: "Engineering Manager",
    role: "Shivatex Texyarn",
  },
  {
    quote:
      "The Visa Genie interface transformed how our travelers submit documents. Vishnu diagnosed our latency problem and fixed it at the infrastructure level — a rare full-stack instinct.",
    name: "Founder",
    role: "Wij Zijn Reizigers",
  },
];

/* ------------------------------------------------------------------ */
/*  BLOG                                                               */
/* ------------------------------------------------------------------ */
export const blogPosts = [
  {
    title: "Advanced React Patterns for Scalable UIs",
    excerpt:
      "Compound components, headless hooks and server components — patterns that keep large React codebases maintainable.",
    tag: "React",
    read: "8 min",
    date: "2026",
  },
  {
    title: "Scaling Node.js Applications with Redis",
    excerpt:
      "How caching hot reads and offloading queues kept our order dashboards responsive under production load.",
    tag: "Backend",
    read: "10 min",
    date: "2026",
  },
  {
    title: "Optimizing Next.js Performance & Core Web Vitals",
    excerpt:
      "Streaming, partial prerendering, image optimization and lazy hydration for image-heavy dashboards.",
    tag: "Next.js",
    read: "7 min",
    date: "2025",
  },
  {
    title: "Designing Multi-tenant SaaS Architecture",
    excerpt:
      "Row-level security, tenant isolation and role-based access — lessons from building a live PropTech platform.",
    tag: "System Design",
    read: "12 min",
    date: "2025",
  },
  {
    title: "Database Optimization: Indexing & Query Tuning",
    excerpt:
      "Practical indexing strategies in PostgreSQL that turned slow reports into instant reports.",
    tag: "Database",
    read: "9 min",
    date: "2025",
  },
  {
    title: "Authentication Best Practices with NextAuth & RBAC",
    excerpt:
      "Sessions, JWTs, OAuth and role-based access control done right in modern Next.js apps.",
    tag: "Security",
    read: "8 min",
    date: "2025",
  },
];

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "System Design", href: "#system-design" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
