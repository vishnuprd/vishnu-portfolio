# Vishnu Prasad R — Portfolio

An award-style, premium portfolio for a Senior Full Stack Software Engineer.
Dark theme, glassmorphism, neon gradients, and Framer Motion micro-interactions
throughout. Fully responsive, accessible, and SEO-optimized.

## Tech Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** (custom design system)
- **Framer Motion** (page/scroll/hover animations, magnetic buttons, custom cursor)
- **Lucide Icons**
- Static export — fully prerendered, ~169 kB first-load JS

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

## Signature interactions

- **Multi-color theme toggle** — floating palette (bottom-left) with 5 accent
  schemes (Aurora, Ocean, Sunset, Emerald, Crimson). Persists to `localStorage`,
  applied via CSS variables (`--a1/--a2/--a3`) with no flash on reload.
- **Hash-free navigation** — nav/anchor clicks smooth-scroll to sections without
  writing `#section` into the address bar (see `components/SmoothScroll.tsx`).
- **Active-section highlighting** — nav pill follows the section in view
  (IntersectionObserver scrollspy).
- **Aurora mesh background** + mouse-following spotlight + film-grain noise.
- **Canvas particle field** in the hero (dependency-free, reacts to the cursor,
  respects `prefers-reduced-motion`).
- Custom glass cursor, magnetic buttons, preloader, scroll progress bar.

### Changing accent colors

Themes are defined once in `app/globals.css` under `[data-theme="…"]` blocks as
RGB triplets. Add or edit a palette there, then add it to the `THEMES` array in
`components/ThemeSwitcher.tsx`.

## Sections

Hero · About + animated stats · Skills · Experience timeline · Featured
Projects (with detail modal) · System Design · GitHub dashboard · Certifications
· Testimonials carousel · Blog · Contact form · Footer.

## Customization

Almost everything lives in **`lib/data.ts`** — edit content there and it
updates across the whole site. Common edits:

| What | Where |
|------|-------|
| Name, email, phone, social links, Calendly | `profile` in `lib/data.ts` |
| Resume PDF | replace `public/Vishnu_Prasad_Resume.pdf` (keep the name or update `profile.resume`) |
| Skills, projects, experience, blog, testimonials | arrays in `lib/data.ts` |
| Colors / gradients / animations | `tailwind.config.ts` |
| SEO / metadata | `app/layout.tsx` |
| Deployed domain (sitemap/robots/OG) | `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` |

### TODO before publishing

- [ ] Replace the **Calendly** link in `profile.calendly`.
- [ ] Add real **live demo / GitHub** links to projects (`live` / `github` fields in `projects`).
- [ ] Wire the **contact form** to a real backend (Resend, Formspree, or a Next.js route handler) — see `components/sections/Contact.tsx` (`handleSubmit`).
- [ ] Swap placeholder **certifications** for your actual credentials.
- [ ] Update the deployment domain (currently `vishnuprd.dev`).

## Deploy

Push to GitHub and import into **Vercel** — zero config. The site is fully
static and edge-cached.
