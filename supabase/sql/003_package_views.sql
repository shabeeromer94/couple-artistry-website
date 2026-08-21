-- Couple Artistry by Shaash — migration 003
-- Run this in the Supabase SQL editor. Safe to re-run.
--
-- Logs every "View Packages" click on the Makeup page (name/WhatsApp number
-- already known by then, from the availability check) and tracks whether
-- the delayed follow-up reminder (see app/api/packages/view/route.ts and
-- app/api/packages/followup/route.ts) has fired yet — or should be skipped
-- because the visitor already reached out ("Enquire Now" on a package, see
-- app/api/packages/interest/route.ts).

create table if not exists public.package_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  whatsapp_number text not null,
  availability_check_id uuid references public.availability_checks(id),
  selected_package_category text,
  selected_package_tier text,
  follow_up_status text not null default 'pending'
    check (follow_up_status in ('pending', 'sent', 'skipped')),
  session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

create index if not exists idx_package_views_created_at
  on public.package_views (created_at desc);
create index if not exists idx_package_views_follow_up_status
  on public.package_views (follow_up_status);

alter table public.package_views enable row level security;

-- Same insert-only-for-anon shape as every other public-facing table —
-- reads/updates stay reserved for the service-role key, used only by the
-- gatekept server routes that need them (the "already reached out" update
-- and the QStash follow-up webhook) or the Supabase dashboard.
drop policy if exists insert_public on public.package_views;
create policy insert_public
  on public.package_views
  for insert
  to anon
  with check (true);
