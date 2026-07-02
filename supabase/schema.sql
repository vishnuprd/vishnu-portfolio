-- ==================================================================
--  Vishnu Portfolio — Database schema
--  Paste this whole file into Supabase → SQL Editor → Run.
--  Safe to re-run (uses IF NOT EXISTS / drops+recreates policies).
-- ==================================================================

-- ---------- Singleton: PROFILE (one row) --------------------------
create table if not exists public.profile (
  id           boolean primary key default true,          -- always true → single row
  name         text not null default '',
  first_name   text not null default '',
  role         text not null default '',
  tagline      text not null default '',
  location     text not null default '',
  email        text not null default '',
  phone        text not null default '',
  github       text not null default '',
  github_user  text not null default '',
  linkedin     text not null default '',
  calendly     text not null default '',
  resume       text not null default '',
  available    boolean not null default true,
  hero_typing  text[] not null default '{}',
  hero_badges  text[] not null default '{}',
  updated_at   timestamptz not null default now(),
  constraint profile_singleton check (id)
);

-- ---------- Singleton: ABOUT --------------------------------------
create table if not exists public.about (
  id         boolean primary key default true,
  summary    text not null default '',
  expertise  text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint about_singleton check (id)
);

-- ---------- Collections -------------------------------------------
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  label text not null default '',
  value integer not null default 0,
  suffix text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  icon text not null default 'Server',
  accent text not null default 'from-sky-400 to-blue-600',
  skills text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company text not null default '',
  role text not null default '',
  duration text not null default '',
  location text not null default '',
  tech text[] not null default '{}',
  achievements text[] not null default '{}',
  impact text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  client text not null default '',
  category text not null default '',
  description text not null default '',
  tech text[] not null default '{}',
  features text[] not null default '{}',
  architecture text not null default '',
  challenge text not null default '',
  metrics jsonb not null default '[]',
  accent text not null default 'from-sky-500 to-blue-600',
  live text,
  github text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.architecture_layers (
  id uuid primary key default gen_random_uuid(),
  label text not null default '',
  detail text not null default '',
  icon text not null default 'Server',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.design_pillars (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  body text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  issuer text not null default '',
  tag text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null default '',
  name text not null default '',
  role text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  excerpt text not null default '',
  tag text not null default '',
  read text not null default '',
  date text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.nav_links (
  id uuid primary key default gen_random_uuid(),
  label text not null default '',
  href text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ==================================================================
--  Row Level Security
--  Public (anon) can READ everything. Only authenticated users can WRITE.
-- ==================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profile','about','stats','skill_groups','experience','projects',
    'architecture_layers','design_pillars','certifications','testimonials',
    'blog_posts','nav_links'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public_read_%1$s" on public.%1$s;', t);
    execute format(
      'create policy "public_read_%1$s" on public.%1$s for select using (true);', t);

    execute format('drop policy if exists "auth_write_%1$s" on public.%1$s;', t);
    execute format(
      'create policy "auth_write_%1$s" on public.%1$s for all
         to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ==================================================================
--  Storage bucket for uploaded images (project shots, avatars, resume)
-- ==================================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_public_read" on storage.objects;
create policy "portfolio_public_read" on storage.objects
  for select using (bucket_id = 'portfolio');

drop policy if exists "portfolio_auth_write" on storage.objects;
create policy "portfolio_auth_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio');

drop policy if exists "portfolio_auth_update" on storage.objects;
create policy "portfolio_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio');

drop policy if exists "portfolio_auth_delete" on storage.objects;
create policy "portfolio_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio');
