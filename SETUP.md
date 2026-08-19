# Setup Guide — Couple Artistry by Shaash

Everything you need to do on your end to get this site running locally, connected to Supabase, and deployed on Vercel.

## 1. Local prerequisites

- Node.js 18.18+ (you have v24 — fine)
- The repo cloned locally with dependencies installed:

```bash
npm install
```

## 2. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in / sign up.
2. Click **New Project**. Choose an organization, name it (e.g. `couple-artistry`), set a database password (save it somewhere safe — you likely won't need it day-to-day), and pick a region close to your users (e.g. Singapore or Mumbai for India).
3. Wait for the project to finish provisioning (a couple of minutes).

### Run the schema

1. In your Supabase project, open **SQL Editor** in the left sidebar.
2. Click **New Query**.
3. Open [supabase/sql/001_schema.sql](supabase/sql/001_schema.sql) from this repo, copy its entire contents, and paste into the SQL editor.
4. Click **Run**. You should see "Success. No rows returned."
5. Confirm it worked: open **Table Editor** — you should see three new tables: `inquiries`, `availability_checks`, `slot_checks`.

This script is safe to re-run if you ever need to (every statement uses `if not exists` / `drop policy if exists` guards).

### Get your API keys

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** — this is `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the **anon / public** key — this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service_role** key too — this is `SUPABASE_SERVICE_ROLE_KEY`. Nothing in the current codebase uses it yet (every write happens through the anon key, which is safe by design because of the Row Level Security policies in the schema), but it's reserved for a future authenticated admin dashboard. **Never** put this key in a `NEXT_PUBLIC_` variable or client-side code.

## 3. Configure environment variables

1. Copy the example file:

```bash
cp .env.local.example .env.local
```

(On Windows PowerShell: `Copy-Item .env.local.example .env.local`)

2. Open `.env.local` and fill in the three Supabase values from step 2 above.
3. The other variables already default to your real business values (WhatsApp number, Shaash Beauty Store URL, Instagram links, Google Business link) if left blank — but you can override any of them here. Set `NEXT_PUBLIC_SITE_URL` once you know your final Vercel URL or custom domain.

`.env.local` is already in `.gitignore` — it will never be committed.

## 4. Run it locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). You should see the cinematic reveal cover — tap/scroll/press Enter to open into the home page.

Walk through each flow to confirm Supabase is wired correctly:
- **Makeup** → Check Availability → submit an Inquiry → confirm a row appears in the `inquiries` table in Supabase (Table Editor), with `flow_type = 'makeup'`.
- **Classes** → pick a learning path → submit an Inquiry.
- **Colour Analysis** → Check Slots → pick an available slot → submit an Inquiry.
- **Stitching** → submit an Inquiry.

Each successful submission shows a "Continue on WhatsApp" button — click it to confirm it opens `wa.me` with a pre-filled, correctly formatted message.

## 5. Push to GitHub

The repo is already initialized locally with `origin` pointing at your GitHub repo. To push:

```bash
git add -A
git commit -m "Initial site build"
git push -u origin main
```

## 6. Connect the repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (connect your GitHub account if you haven't).
2. Click **Add New → Project**, and import `shabeeromer94/couple-artistry-website`.
3. Vercel will auto-detect Next.js — leave the build settings as default (`next build`).
4. Before deploying, add your environment variables: open the **Environment Variables** section and add every variable from your `.env.local` (same names, same values) for the **Production**, **Preview**, and **Development** environments.
5. Click **Deploy**.
6. Once live, copy your Vercel URL (e.g. `https://couple-artistry-website.vercel.app`) and update `NEXT_PUBLIC_SITE_URL` in Vercel's environment variables to match (then redeploy, or it'll pick it up on the next deploy). If you later attach a custom domain, update it again.

From then on, every push to `main` auto-deploys.

## 7. Replacing placeholder content with real content

Everything placeholder is clearly labeled and centralized so swaps are mechanical — nothing requires touching component code.

| What | Where to edit |
|---|---|
| Gallery photos (Makeup / Colour Analysis / Stitching / About) | Drop image files into `public/images/{makeup,colour-analysis,stitching,about}/`, then set the matching `src` path in [lib/config/gallery.ts](lib/config/gallery.ts). Until `src` is set, a styled placeholder tile renders instead of a broken image. |
| Pricing / packages | [lib/config/pricing.ts](lib/config/pricing.ts) — one file, no prices live anywhere else in the codebase. |
| Testimonials | [lib/config/testimonials.ts](lib/config/testimonials.ts) — replace placeholder entries with real client quotes once you have permission to publish them (never invent these). |
| Nav / footer / service card copy, WhatsApp & Instagram links | [lib/config/navigation.ts](lib/config/navigation.ts), [lib/config/copy.ts](lib/config/copy.ts), and your `.env.local` / Vercel env vars. |
| Brand wordmark on the reveal screen | [components/home/RevealGate.tsx](components/home/RevealGate.tsx) — `brandWordmark` prop, currently defaults to the brand name. |
| Favicon / logo | Replace `app/favicon.ico`; drop a real logo file into `public/images/logo/` if you want it used elsewhere. |

## 8. What's stubbed, and how to go live with it later

- **Availability & slot checks** (`/api/availability/check`, `/api/slots/check`) are wired for a real Google Calendar free/busy lookup, but run on a deterministic stub result until you supply credentials — see `lib/utils/availabilityStub.ts` and `lib/utils/slotStub.ts`. Both call `isGoogleCalendarConfigured()` first and only fall back to the stub when it's false (or if the live lookup itself throws), so the site works exactly as it does today with zero setup.

  To go live: follow the Google Cloud Console steps (create a project, enable the Calendar API, create a service account, download its JSON key, share your bookings calendar with the service account's email as "See all event details", copy the calendar's ID), then set these three env vars — locally in `.env.local`, and in Vercel for Production/Preview/Development:

  | Variable | Where it comes from |
  |---|---|
  | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` field in the downloaded JSON key |
  | `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | The `private_key` field — paste as-is, literal `\n` sequences included |
  | `GOOGLE_CALENDAR_ID` | Your calendar's Settings and sharing → Integrate calendar → Calendar ID |

  As soon as all three are set, real checks kick in automatically — no other code change. A bridal event date is treated as unavailable if the calendar has *any* event that day (the artist(s) are booked for the whole day); a Colour Analysis slot is treated as unavailable only if an event overlaps that specific hour. Both are hardcoded to IST (+05:30).

- **WhatsApp handoff** uses `wa.me` deep links (no WhatsApp Business API integration). This is standard practice and works well as-is — upgrading to the official API later is a backend-only change to `lib/utils/whatsapp.ts` and the `/api/inquiries` route.

## 9. Admin access to inquiries (for now)

There's no admin dashboard yet. To see submitted inquiries, use the Supabase **Table Editor** directly (Table Editor → `inquiries`), or run a query in the SQL Editor, e.g.:

```sql
select * from public.inquiries order by created_at desc limit 50;
```

You're signed in to Supabase with full project access, which bypasses Row Level Security — the public site itself can only insert, never read, by design.
