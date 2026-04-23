import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { defaultStudioData } from "@/lib/planmon";

const payloadSchema = z.object({
  deviceId: z.string().min(8),
  profile: z.object({
    studentName: z.string(),
    goal: z.string(),
    subjects: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        examDate: z.string(),
        progress: z.number(),
      }),
    ),
    tasks: z.array(
      z.object({
        id: z.number(),
        text: z.string(),
        subject: z.string(),
        done: z.boolean(),
      }),
    ),
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
    .from("planmon_profiles")
    .select("student_name, goal, subjects, tasks")
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
      studentName: data.student_name || defaultStudioData.studentName,
      goal: data.goal || defaultStudioData.goal,
      subjects: data.subjects || defaultStudioData.subjects,
      tasks: data.tasks || defaultStudioData.tasks,
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
    return NextResponse.json({ message: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { deviceId, profile } = parsed.data;

  const { error } = await supabase.from("planmon_profiles").upsert(
    {
      device_id: deviceId,
      student_name: profile.studentName,
      goal: profile.goal,
      subjects: profile.subjects,
      tasks: profile.tasks,
    },
    { onConflict: "device_id" },
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
