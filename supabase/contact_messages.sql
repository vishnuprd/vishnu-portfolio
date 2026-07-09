-- ==================================================================
--  Contact form submissions
--  Paste into Supabase → SQL Editor → Run. Safe to re-run.
--
--  RLS model (deliberately different from the content tables):
--    • anon (public visitors) may INSERT a message — nothing else.
--    • only authenticated (you, the admin) may SELECT / read them.
--  So the form works without login, but the inbox stays private.
-- ==================================================================
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null default '',
  message    text not null,
  -- lightweight context for triage / abuse review (no PII beyond the above)
  user_agent text not null default '',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Public may submit. The WITH CHECK mirrors the server-side validation so a
-- crafted request still can't insert junk past these hard limits.
drop policy if exists "contact_anon_insert" on public.contact_messages;
create policy "contact_anon_insert" on public.contact_messages
  for insert to anon
  with check (
    char_length(name)    between 1 and 100  and
    char_length(email)   between 3 and 150  and
    char_length(subject) <= 150             and
    char_length(message) between 1 and 5000
  );

-- Only the logged-in admin can read the inbox.
drop policy if exists "contact_auth_read" on public.contact_messages;
create policy "contact_auth_read" on public.contact_messages
  for select to authenticated using (true);

-- Newest first when browsing.
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
