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

  As soon as all three are set, real checks kick in automatically — no other code change.

  - **Makeup event dates** ask for the event's own start time (ceremony/function, not the makeup start) and check the 4 hours *before* it — `MAKEUP_SESSION_DURATION_HOURS` in `lib/config/eventTypes.ts` — against the calendar's actual events (not just free/busy), reading each overlapping event's **Location** field. Two independent caps apply: the requested location itself can take at most `MAX_BOOKINGS_PER_LOCATION` overlapping bookings (multiple people at one venue is normal, but not unlimited); and a *different* location is only unavailable once `MAX_SIMULTANEOUS_LOCATIONS` distinct *other* locations are already committed in that window, since Ashi & Shabeer can split up and cover at most two places at once. This means every calendar block for a real booking should have its venue/city filled into the event's Location field, or it's counted as an unknown location (conservatively treated as its own conflict).
  - **Colour Analysis slots** are treated as unavailable only if an event overlaps that specific hour — no location logic, since sessions all happen at one place.
  - Both are hardcoded to IST (+05:30).

- **Owner notification** (`/api/availability/check`) — the Makeup page no longer has a separate "Send an Inquiry" form; name and WhatsApp number are collected directly on the "Check Your Date" form instead, so a completed availability check *is* the lead. Every check silently notifies the owner via **Telegram** — not the `wa.me` links used elsewhere, since nothing here should ever open on the visitor's device. See `lib/ownerNotify/telegram.ts`; a missing/failed notification never blocks the visitor's response.

  (An earlier version of this used CallMeBot, an unofficial free WhatsApp notifier — it proved too unreliable in practice, so this now goes through Telegram's own Bot API instead, which is official and effectively instant.)

  To go live:
  1. In Telegram, message **@BotFather** → send `/newbot` → follow the prompts (pick a display name, then a username ending in `bot`).
  2. BotFather replies with a token like `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ` — that's `TELEGRAM_BOT_TOKEN`.
  3. Send any message to your new bot from your own Telegram account (search its username and open the chat) — this is required once, so the bot is allowed to message you back.
  4. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser (with your real token in place of `<YOUR_TOKEN>`) — find `"chat":{"id":...}` in the response; that number is `TELEGRAM_CHAT_ID`.
  5. Set both env vars — locally in `.env.local`, and in Vercel for Production/Preview/Development.

  As soon as both are set, notifications start automatically — no other code change. Each message includes the visitor's name, WhatsApp number, event details, the availability result, and a link (`/makeup?unlock=packages`) that opens the Makeup page with packages already unlocked — forward it on WhatsApp whenever suits instead of the visitor needing to redo the check themselves.

- **Package-view follow-up reminder** (`/api/packages/view`, `/api/packages/interest`, `/api/packages/followup`) — when a visitor clicks "View Packages," that's logged; `PACKAGE_VIEW_FOLLOWUP_DELAY_HOURS` (in `lib/config/packageFollowUp.ts`, default 3) later, if they haven't clicked "Enquire Now" on a package by then, you get a Telegram nudge with their details and a **ready wa.me link, pre-filled, addressed to them** — tap it and it opens WhatsApp with the message already written, ready to send from your real number. Nothing is ever sent to the visitor automatically; a real message to a client who hasn't messaged first requires WhatsApp Business Platform verification with Meta, which this deliberately avoids (see the note below).

  The "wait 3 hours, then check in" part needs a scheduler — serverless functions can't just sleep — via [Upstash QStash](https://upstash.com/docs/qstash/overall/getstarted), a free hosted queue built for exactly this ("call this URL again in N hours"). To go live:
  1. Create a free account at [upstash.com](https://upstash.com) → QStash (from the left sidebar).
  2. Copy the **QStash Token** — that's `QSTASH_TOKEN`.
  3. Copy **Current Signing Key** and **Next Signing Key** — `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` (used to verify a follow-up call really came from QStash, not somebody else hitting the webhook).
  4. Set all three — locally in `.env.local`, and in Vercel for Production/Preview/Development. `NEXT_PUBLIC_SITE_URL` also needs to already be your real deployed URL, since that's what QStash is told to call back.

  As soon as all three are set (and migration `003_package_views.sql` below has been run), this starts working automatically — no other code change.

  **Why this isn't a real WhatsApp "order confirmation" bot:** messaging a client automatically and instantly — the way an e-commerce order confirmation does — requires WhatsApp Business Platform verification with Meta (business docs, a dedicated API-only phone number, an approved message template) — a real project on its own, not something this can quietly enable. This "owner taps to send" version gets the same outcome (a genuine WhatsApp message, in your voice, landing in their chat) without any of that, and arguably fits a small studio's personal-touch brand better than a templated bot message would. If you ever do want the fully hands-off version, ask and we can scope that separately.

  Run this migration in the Supabase SQL editor before going live (adds the `package_views` table): [supabase/sql/003_package_views.sql](supabase/sql/003_package_views.sql).

- **WhatsApp handoff** uses `wa.me` deep links (no WhatsApp Business API integration). This is standard practice and works well as-is — upgrading to the official API later is a backend-only change to `lib/utils/whatsapp.ts` and the `/api/inquiries` route.

## 9. Admin access to inquiries (for now)

There's no admin dashboard yet. To see submitted inquiries, use the Supabase **Table Editor** directly (Table Editor → `inquiries`), or run a query in the SQL Editor, e.g.:

```sql
select * from public.inquiries order by created_at desc limit 50;
```

You're signed in to Supabase with full project access, which bypasses Row Level Security — the public site itself can only insert, never read, by design.
