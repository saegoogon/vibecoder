import { NextResponse } from "next/server";
import { appEnv, hasSupabaseServerEnv, hasTossEnv } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    services: {
      supabase: {
        ready: hasSupabaseServerEnv(),
        hasUrl: Boolean(appEnv.supabaseUrl),
        hasPublishableKey: Boolean(appEnv.supabasePublishableKey),
        hasServiceRoleKey: Boolean(appEnv.supabaseServiceRoleKey),
      },
      tossPayments: {
        ready: hasTossEnv(),
        hasSecretKey: Boolean(appEnv.tossSecretKey),
      },
      app: {
        siteUrl: appEnv.siteUrl,
      },
    },
  });
}
