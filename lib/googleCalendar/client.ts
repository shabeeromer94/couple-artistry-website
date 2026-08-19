import "server-only";
import { google } from "googleapis";
import { env } from "@/lib/config/env";

// Server-only Google Calendar client, used to answer free/busy questions for
// the availability/slot stubs (see lib/utils/availabilityStub.ts and
// lib/utils/slotStub.ts). Callers should check isGoogleCalendarConfigured()
// (lib/config/env.ts) first — this throws if credentials are missing, same
// pattern as getSupabaseServerClient().
//
// Read-only scope: this can never create, edit, or delete anything on the
// shared calendar, only read free/busy — matching the "See all event
// details" sharing permission requested in the setup guide.

let authClient: InstanceType<typeof google.auth.JWT> | null = null;

function getAuth() {
  if (authClient) return authClient;
  if (!env.googleServiceAccountEmail || !env.googleServiceAccountPrivateKey) {
    throw new Error(
      "Google Calendar is not configured — set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY."
    );
  }
  // Vercel and .env.local both store the private key with literal "\n"
  // sequences (real newlines don't survive round-tripping through env var
  // storage) — turn them back into real newlines, or the JWT signature
  // Google verifies against will fail.
  const key = env.googleServiceAccountPrivateKey.replace(/\\n/g, "\n");
  authClient = new google.auth.JWT({
    email: env.googleServiceAccountEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  return authClient;
}

export interface BusyInterval {
  start?: string | null;
  end?: string | null;
}

/**
 * Busy intervals a calendar reports for [timeMinISO, timeMaxISO) — an empty
 * array means nothing is booked in that window. Throws if Google Calendar
 * isn't configured or the API call fails; callers decide how to fall back.
 */
export async function getBusyIntervals(
  calendarId: string,
  timeMinISO: string,
  timeMaxISO: string
): Promise<BusyInterval[]> {
  if (!calendarId) {
    throw new Error("Google Calendar is not configured — set GOOGLE_CALENDAR_ID.");
  }
  const calendar = google.calendar({ version: "v3", auth: getAuth() });
  const res = await calendar.freebusy.query({
    requestBody: { timeMin: timeMinISO, timeMax: timeMaxISO, items: [{ id: calendarId }] },
  });
  return res.data.calendars?.[calendarId]?.busy ?? [];
}

export interface CalendarEventSummary {
  id: string;
  summary?: string | null;
  /** The event's Location field — where Ashi & Shabeer note the venue/city when they block a booking. */
  location?: string | null;
}

/**
 * Events overlapping [timeMinISO, timeMaxISO) on a calendar, with enough
 * detail (location, title) to tell *where* a conflict is — unlike
 * getBusyIntervals, which only says *whether* one exists. Used for the
 * location-aware Makeup availability check (see availabilityStub.ts), which
 * needs to know if an overlapping booking is at the same place or not.
 * Requires the same "See all event details" calendar sharing permission the
 * setup guide already asks for (a free/busy-only share wouldn't expose
 * location or title).
 */
export async function getOverlappingEvents(
  calendarId: string,
  timeMinISO: string,
  timeMaxISO: string
): Promise<CalendarEventSummary[]> {
  if (!calendarId) {
    throw new Error("Google Calendar is not configured — set GOOGLE_CALENDAR_ID.");
  }
  const calendar = google.calendar({ version: "v3", auth: getAuth() });
  const res = await calendar.events.list({
    calendarId,
    timeMin: timeMinISO,
    timeMax: timeMaxISO,
    singleEvents: true,
    orderBy: "startTime",
  });
  return (res.data.items ?? []).map((item) => ({
    id: item.id ?? "",
    summary: item.summary,
    location: item.location,
  }));
}
