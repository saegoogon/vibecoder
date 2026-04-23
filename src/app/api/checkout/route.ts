import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { createTossCheckout } from "@/lib/toss";

const schema = z.object({
  planCode: z.enum(["pro", "pro_plus"]),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "입력값을 다시 확인해주세요." }, { status: 400 });
    }

    const checkout = await createTossCheckout(parsed.data);
    const supabase = getSupabaseAdmin();

    if (supabase) {
      await supabase.from("planmon_orders").insert({
        order_id: checkout.orderId,
        plan_code: parsed.data.planCode,
        amount: checkout.amount,
        customer_name: parsed.data.customerName,
        customer_email: parsed.data.customerEmail,
        customer_key: randomUUID(),
        payment_status: "READY",
        metadata: checkout.raw,
      });
    }

    return NextResponse.json({
      checkoutUrl: checkout.checkoutUrl,
      orderId: checkout.orderId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "결제 요청 중 알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
