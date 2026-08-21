-- Couple Artistry by Shaash — migration 002
-- Run this in the Supabase SQL editor against an EXISTING project that
-- already ran 001_schema.sql. (A brand-new project can skip straight to
-- 001_schema.sql, which already includes these columns.)
--
-- Adds full_name / whatsapp_number to availability_checks: the Makeup
-- page's "Check Your Date" form now collects these directly (the separate
-- inquiry form was removed), so every availability check doubles as a
-- captured lead. Safe to re-run.

alter table public.availability_checks
  add column if not exists full_name text not null default '';

alter table public.availability_checks
  add column if not exists whatsapp_number text not null default '';

-- Drop the defaults now that the columns exist — new rows are always
-- inserted with real values going forward; the default above only exists
-- to satisfy `not null` on any pre-existing rows during the migration.
alter table public.availability_checks
  alter column full_name drop default;

alter table public.availability_checks
  alter column whatsapp_number drop default;
