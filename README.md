# Couple Artistry by Shaash

The official website for Couple Artistry by Shaash — a couple-led bridal makeup and hair artistry brand. A luxury bridal editorial site: minimal, image-led, mobile-first, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase keys
npm run dev
```

Full setup instructions — creating the Supabase project, running the SQL schema, environment variables, and deploying to Vercel — are in **[SETUP.md](SETUP.md)**.

## Structure

- `app/` — routes: home (reveal gate), `/makeup`, `/classes`, `/colour-analysis`, `/stitching`, plus API routes under `app/api/`.
- `components/` — `shared/` (reused across pages: Gallery, InquiryForm, PackageGrid, TestimonialSection, Nav, Footer, …), plus per-flow components under `home/`, `makeup/`, `classes/`, `colour-analysis/`.
- `lib/config/` — the data-driven layer: pricing, gallery images, testimonials, inquiry field schemas, navigation, copy. No content is hardcoded in JSX.
- `lib/context/` — the session/journey layer (carries availability-check details into the inquiry form) and UTM capture.
- `lib/validation/` — Zod schemas shared by forms and API routes.
- `lib/utils/` — WhatsApp link building, the availability/slot stub logic, formatting helpers.
- `supabase/sql/001_schema.sql` — the full database schema, run once in the Supabase SQL editor.

See [SETUP.md](SETUP.md) for how to swap in real photography, pricing, and testimonials once available.
