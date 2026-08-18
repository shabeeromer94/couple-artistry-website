import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config/env";

// Server-only Supabase client factory, used inside Route Handlers.
// Deliberately uses the anon key, not the service-role key: every insert
// this app performs is covered by the public insert-only RLS policy (see
// supabase/sql/001_schema.sql), and "server-side" here means "hidden from
// the client bundle," not "needs elevated privileges." The service-role key
// is provisioned for a future authenticated admin dashboard and is not
// touched by this function.
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
