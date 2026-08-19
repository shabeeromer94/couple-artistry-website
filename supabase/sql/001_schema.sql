-- Couple Artistry by Shaash — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New Query)
-- on a fresh project. Safe to re-run: every statement is idempotent.
--
-- Design notes:
--   * One unified `inquiries` table covers all four flows (makeup, classes,
--     colour-analysis, stitching) via a `flow_type` discriminator plus a
--     flexible `details` JSONB column for flow-specific fields. The app
--     validates the JSONB shape with Zod before every insert (see
--     lib/validation/inquiry.ts) — the looseness here is intentional.
--   * `availability_checks` and `slot_checks` are log tables for the Makeup
--     availability flow and Colour Analysis slot flow respectively — useful
--     later for demand/conversion analytics, and `inquiries` can optionally
--     reference a row in each via a nullable FK.
--   * RLS is enabled on every table. The public/anon key may only INSERT —
--     there is no SELECT/UPDATE/DELETE policy for anon or public, so those
--     are default-denied. Reads are reserved for a future authenticated
--     admin role (see the commented-out policy at the bottom).

-- Required for gen_random_uuid()
create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────
-- availability_checks (Makeup flow — log of every "Check Availability" call)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.availability_checks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  events jsonb not null,                 -- [{ id, date, timing, city }]
  event_count integer not null,
  overall_status text not null check (overall_status in ('available', 'unavailable', 'partial')),
  results jsonb not null,                -- [{ id, date, status }]
  session_id text,                       -- client-generated, no PII
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

create index if not exists idx_availability_checks_created_at
  on public.availability_checks (created_at desc);
create index if not exists idx_availability_checks_status
  on public.availability_checks (overall_status);

alter table public.availability_checks enable row level security;

drop policy if exists insert_public on public.availability_checks;
create policy insert_public
  on public.availability_checks
  for insert
  to anon
  with check (true);

-- ─────────────────────────────────────────────────────────────────────────
-- slot_checks (Colour Analysis flow — log of every "Check Slots" call)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.slot_checks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  requested_date date not null,
  slots jsonb not null,                  -- [{ time, status }]
  session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

create index if not exists idx_slot_checks_requested_date
  on public.slot_checks (requested_date);
create index if not exists idx_slot_checks_created_at
  on public.slot_checks (created_at desc);

alter table public.slot_checks enable row level security;

drop policy if exists insert_public on public.slot_checks;
create policy insert_public
  on public.slot_checks
  for insert
  to anon
  with check (true);

-- ─────────────────────────────────────────────────────────────────────────
-- inquiries (unified table for Makeup / Classes / Colour Analysis / Stitching)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  flow_type text not null
    check (flow_type in ('makeup', 'classes', 'colour-analysis', 'stitching')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'converted', 'closed')),

  full_name text not null,
  whatsapp_number text not null,
  email text,
  message text,

  details jsonb not null default '{}'::jsonb, -- flow-specific fields, see lib/validation/inquiry.ts

  selected_package_category text,
  selected_package_tier text,

  availability_check_id uuid references public.availability_checks(id),
  slot_check_id uuid references public.slot_checks(id),

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  source_page text
);

create index if not exists idx_inquiries_flow_type on public.inquiries (flow_type);
create index if not exists idx_inquiries_status on public.inquiries (status);
create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);
create index if not exists idx_inquiries_flow_status on public.inquiries (flow_type, status);

alter table public.inquiries enable row level security;

drop policy if exists insert_public on public.inquiries;
create policy insert_public
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Keep updated_at current on every UPDATE (used once an admin tool exists).
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_inquiries_updated_at on public.inquiries;
create trigger trg_inquiries_updated_at
  before update on public.inquiries
  for each row
  execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- Future admin reads (NOT enabled now — no admin role/table exists yet).
-- When a real authenticated admin dashboard is built, add a policy such as:
--
--   create policy select_admin
--     on public.inquiries
--     for select
--     to authenticated
--     using (true);
--
-- and equivalent policies on availability_checks / slot_checks, scoped to
-- whatever admin-allowlist mechanism you build at that time. Until then,
-- reads are only possible via the Supabase dashboard (which uses your
-- project credentials, not RLS) or the service-role key from a trusted
-- server context.
-- ─────────────────────────────────────────────────────────────────────────
