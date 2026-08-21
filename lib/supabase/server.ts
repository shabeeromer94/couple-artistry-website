import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config/env";

// Server-only Supabase client factory, used inside Route Handlers.
// Deliberately uses the anon key, not the service-role key: every insert
// this app performs through this function is covered by the public
// insert-only RLS policy (see supabase/sql/001_schema.sql), and
// "server-side" here means "hidden from the client bundle," not "needs
// elevated privileges."
export function getSupabaseServerClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

// Elevated client for the handful of genuinely trusted server contexts that
// need to read or update a row an anon key never can (RLS only grants anon
// insert — see the "Reads..." comments in the schema files). Today that's
// just the package-view follow-up flow (app/api/packages/interest and
// app/api/packages/followup), both of which are themselves gatekept (a
// verified QStash signature, or a same-request update immediately after an
// anon insert) rather than exposed directly to arbitrary client input.
// Never import this into a "use client" file.
export function getSupabaseServiceClient() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error(
      "Supabase service role is not configured — set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
}
