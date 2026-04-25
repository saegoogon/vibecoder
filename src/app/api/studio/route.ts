import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { defaultStudioData } from "@/lib/planmon";

const payloadSchema = z.object({
  deviceId: z.string().min(8),
  profile: z.object({
    displayName: z.string(),
    bio: z.string(),
    selectedSkin: z.string(),
    ownedSkins: z.array(z.string()),
    favoriteSkins: z.array(z.string()),
    clicks: z.number(),
  }),
});

export async function GET(request: NextRequest) {
  const deviceId = request.nextUrl.searchParams.get("deviceId");
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ message: "Supabase not configured" }, { status: 503 });
  }

  if (!deviceId) {
    return NextResponse.json({ message: "deviceId가 필요합니다." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cursor_profiles")
    .select("display_name, bio, selected_skin, owned_skins, favorite_skins, clicks")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ profile: null });
  }

  return NextResponse.json({
    profile: {
      displayName: data.display_name || defaultStudioData.displayName,
      bio: data.bio || defaultStudioData.bio,
      selectedSkin: data.selected_skin || defaultStudioData.selectedSkin,
      ownedSkins: data.owned_skins || defaultStudioData.ownedSkins,
      favoriteSkins: data.favorite_skins || defaultStudioData.favoriteSkins,
      clicks: data.clicks || defaultStudioData.clicks,
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ message: "Supabase not configured" }, { status: 503 });
  }

  const json = await request.json();
  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const { deviceId, profile } = parsed.data;

  const { error } = await supabase.from("cursor_profiles").upsert(
    {
      device_id: deviceId,
      display_name: profile.displayName,
      bio: profile.bio,
      selected_skin: profile.selectedSkin,
      owned_skins: profile.ownedSkins,
      favorite_skins: profile.favoriteSkins,
      clicks: profile.clicks,
    },
    { onConflict: "device_id" },
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
