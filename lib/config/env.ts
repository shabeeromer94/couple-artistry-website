// Single, typed entry point for every environment variable the app reads.
// Components/routes should import `env` from here instead of touching
// process.env directly, so there is exactly one place that documents what
// exists and what it's for (see .env.local.example / SETUP.md for values).

function readPublic(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

export const env = {
  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  // Server-only. Not used by any route in v1 — reserved for a future
  // authenticated admin dashboard. Never import this into a "use client" file.
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",

  // Contact / external links (public — safe to ship to the browser)
  whatsappNumber: readPublic("NEXT_PUBLIC_WHATSAPP_NUMBER", "917200001934"),
  shaashStoreUrl: readPublic(
    "NEXT_PUBLIC_SHAASH_STORE_URL",
    "https://shaash-extension.vercel.app/"
  ),
  instagramMain: readPublic(
    "NEXT_PUBLIC_INSTAGRAM_MAIN",
    "https://www.instagram.com/the_couple_artistry"
  ),
  instagramStore: readPublic(
    "NEXT_PUBLIC_INSTAGRAM_STORE",
    "https://www.instagram.com/shaash.beautystore"
  ),
  instagramStitching: readPublic(
    "NEXT_PUBLIC_INSTAGRAM_STITCHING",
    "https://www.instagram.com/shaash_bridal_designer_studio"
  ),
  googleReviewUrl: readPublic(
    "NEXT_PUBLIC_GOOGLE_REVIEW_URL",
    "https://share.google/EUAbcsd5vH12nTZO6"
  ),
  siteUrl: readPublic("NEXT_PUBLIC_SITE_URL", "https://couple-artistry-website.vercel.app"),

  // Google Calendar (real availability lookups) — server-only, never
  // NEXT_PUBLIC_. Optional: until all three are set, checkEventAvailability
  // and checkSlotAvailability fall back to their deterministic stub (see
  // lib/utils/availabilityStub.ts / slotStub.ts and isGoogleCalendarConfigured
  // below).
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
  googleServiceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
  googleCalendarId: process.env.GOOGLE_CALENDAR_ID ?? "",

  // Telegram (silent backend notification to the owner every time someone
  // checks their date) — server-only, never NEXT_PUBLIC_. Optional: until
  // both are set, sendOwnerNotification() is a no-op.
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",

  // Upstash QStash (delayed "package view" follow-up reminder) — server-only,
  // never NEXT_PUBLIC_. Optional: until all three are set, viewing packages
  // is tracked (if Supabase is configured) but no delayed reminder is
  // scheduled. See lib/scheduling/qstash.ts.
  qstashToken: process.env.QSTASH_TOKEN ?? "",
  qstashCurrentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "",
  qstashNextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "",
} as const;

export function isSupabaseConfigured(): boolean {
  return env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
}

export function isGoogleCalendarConfigured(): boolean {
  return (
    env.googleServiceAccountEmail.length > 0 &&
    env.googleServiceAccountPrivateKey.length > 0 &&
    env.googleCalendarId.length > 0
  );
}

export function isTelegramConfigured(): boolean {
  return env.telegramBotToken.length > 0 && env.telegramChatId.length > 0;
}

export function isQStashConfigured(): boolean {
  return (
    env.qstashToken.length > 0 &&
    env.qstashCurrentSigningKey.length > 0 &&
    env.qstashNextSigningKey.length > 0
  );
}
