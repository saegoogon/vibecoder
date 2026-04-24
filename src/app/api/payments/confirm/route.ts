import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { confirmTossPayment } from "@/lib/toss";

const schema = z.object({
  paymentKey: z.string().min(1),
  orderId: z.string().min(1),
  amount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "결제 승인 파라미터가 올바르지 않습니다." }, { status: 400 });
  }

  try {
    const payment = await confirmTossPayment(parsed.data);
    const supabase = getSupabaseAdmin();

    if (supabase) {
      await supabase
        .from("planmon_orders")
        .update({
          payment_status: "DONE",
          payment_key: parsed.data.paymentKey,
          approved_at: new Date().toISOString(),
          metadata: payment,
        })
        .eq("order_id", parsed.data.orderId);
    }

    return NextResponse.json({ ok: true, payment });
  } catch (error) {
    const supabase = getSupabaseAdmin();

    if (supabase) {
      await supabase
        .from("planmon_orders")
        .update({
          payment_status: "FAILED",
          payment_key: parsed.data.paymentKey,
          metadata: {
            error:
              error instanceof Error ? error.message : "결제 확인 중 오류가 발생했습니다.",
          },
        })
        .eq("order_id", parsed.data.orderId);
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "결제 확인 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
