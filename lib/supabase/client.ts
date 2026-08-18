"use client";

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config/env";

// Browser Supabase client — anon/public key only, RLS-enforced. Barely used
// in v1 (all writes go through server Route Handlers, see lib/supabase/server.ts)
// but kept available for any future client-side read that doesn't need a
// server hop.
export function getSupabaseBrowserClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return createClient(env.supabaseUrl, env.supabaseAnonKey);
}
