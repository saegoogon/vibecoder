import { createClient } from "@supabase/supabase-js";
import { appEnv, hasSupabaseServerEnv } from "@/lib/env";

export function getSupabaseAdmin() {
  if (!hasSupabaseServerEnv()) {
    return null;
  }

  return createClient(appEnv.supabaseUrl, appEnv.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
