import "server-only";
import { Client, Receiver } from "@upstash/qstash";
import { env, isQStashConfigured } from "@/lib/config/env";

// Vercel functions don't have a native "run this in N hours" — QStash
// (Upstash) is a hosted queue built for exactly that: publish a request now,
// it calls the given URL back once the delay elapses, regardless of which
// hosting plan this runs on. Used for the package-view follow-up reminder
// (see app/api/packages/view/route.ts and app/api/packages/followup/route.ts).

/**
 * Schedules `url` to be called with `body` (as JSON) after `delaySeconds`.
 * A no-op — logged, not thrown — when QStash isn't configured, so a missing
 * setup step never blocks the visitor's response.
 */
export async function scheduleDelayedCall(
  url: string,
  body: Record<string, unknown>,
  delaySeconds: number
): Promise<void> {
  if (!isQStashConfigured()) return;

  try {
    const client = new Client({ token: env.qstashToken });
    // Plain number of seconds — QStash's `delay` string variants only
    // type-check for integer/bigint literals, which a variable count
    // isn't guaranteed to satisfy at compile time.
    await client.publishJSON({ url, body, delay: Math.round(delaySeconds) });
  } catch (err) {
    console.error("QStash schedule failed:", err);
  }
}

/**
 * Verifies an inbound request really came from QStash (checks the
 * Upstash-Signature header against the raw body) before a webhook route
 * acts on it. Returns false (never throws) on any missing config or
 * verification failure — callers should treat that as "reject the request."
 */
export async function verifyQStashSignature(signature: string | null, body: string): Promise<boolean> {
  if (!signature || !isQStashConfigured()) return false;

  try {
    const receiver = new Receiver({
      currentSigningKey: env.qstashCurrentSigningKey,
      nextSigningKey: env.qstashNextSigningKey,
    });
    return await receiver.verify({ signature, body });
  } catch (err) {
    console.error("QStash signature verification threw:", err);
    return false;
  }
}
