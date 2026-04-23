function read(name: string) {
  return process.env[name]?.trim() || "";
}

export const appEnv = {
  siteUrl: read("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",
  supabaseUrl: read("NEXT_PUBLIC_SUPABASE_URL"),
  supabasePublishableKey:
    read("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") || read("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: read("SUPABASE_SERVICE_ROLE_KEY"),
  tossSecretKey: read("TOSS_SECRET_KEY"),
};

export function hasSupabaseServerEnv() {
  return Boolean(
    appEnv.supabaseUrl &&
      appEnv.supabasePublishableKey &&
      appEnv.supabaseServiceRoleKey,
  );
}

export function hasTossEnv() {
  return Boolean(appEnv.tossSecretKey);
}
