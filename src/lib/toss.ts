import { randomUUID } from "node:crypto";
import { appEnv } from "@/lib/env";
import { planMap, type PlanCode } from "@/lib/planmon";

export function createOrderId() {
  return `planmon_${Date.now()}_${randomUUID().slice(0, 8)}`;
}

function createBasicAuth(secretKey: string) {
  return Buffer.from(`${secretKey}:`).toString("base64");
}

export async function createTossCheckout(input: {
  planCode: PlanCode;
  customerName: string;
  customerEmail: string;
}) {
  const plan = planMap[input.planCode];

  if (!plan || plan.amount <= 0) {
    throw new Error("무료 플랜은 결제가 필요하지 않습니다.");
  }

  if (!appEnv.tossSecretKey) {
    throw new Error("토스페이먼츠 시크릿 키가 설정되지 않았습니다.");
  }

  const orderId = createOrderId();
  const response = await fetch("https://api.tosspayments.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuth(appEnv.tossSecretKey)}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      method: "CARD",
      amount: plan.amount,
      orderId,
      orderName: `플랜몬 ${plan.name} 이용권`,
      successUrl: `${appEnv.siteUrl}/payments/success`,
      failUrl: `${appEnv.siteUrl}/payments/fail`,
      customerEmail: input.customerEmail,
      customerName: input.customerName,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "결제창 생성에 실패했습니다.");
  }

  return {
    orderId,
    amount: plan.amount,
    orderName: `플랜몬 ${plan.name} 이용권`,
    checkoutUrl: payload.checkout?.url as string,
    raw: payload,
  };
}

export async function confirmTossPayment(input: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  if (!appEnv.tossSecretKey) {
    throw new Error("토스페이먼츠 시크릿 키가 설정되지 않았습니다.");
  }

  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuth(appEnv.tossSecretKey)}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify(input),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "결제 승인에 실패했습니다.");
  }

  return payload;
}
