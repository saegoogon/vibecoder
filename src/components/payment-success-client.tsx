"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  paymentKey: string;
  orderId: string;
  amount: string;
};

export default function PaymentSuccessClient({ paymentKey, orderId, amount }: Props) {
  const [message, setMessage] = useState("결제를 확인하고 있어요...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    const confirmPayment = async () => {
      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const payload = (await response.json()) as { message?: string };

        if (!active) {
          return;
        }

        if (!response.ok) {
          throw new Error(payload.message || "결제 승인에 실패했습니다.");
        }

        setSuccess(true);
        setMessage("결제가 정상적으로 승인되었어요. 이제 플랜 업그레이드를 적용할 수 있어요.");
      } catch (error) {
        if (active) {
          setSuccess(false);
          setMessage(
            error instanceof Error
              ? error.message
              : "결제 승인 중 오류가 발생했습니다.",
          );
        }
      }
    };

    void confirmPayment();

    return () => {
      active = false;
    };
  }, [amount, orderId, paymentKey]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8">
      <section className="glass-card rounded-[2.4rem] p-8 text-center">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Payment Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[#16324F]">
          {success ? "결제 완료" : "결제 확인 중"}
        </h1>
        <p className="mt-5 text-base leading-8 text-[#355070]">{message}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="rounded-full bg-[#16324F] px-6 py-4 text-sm font-semibold text-white hover:-translate-y-0.5"
            href="/start"
          >
            대시보드로 이동
          </Link>
          <Link
            className="rounded-full border border-[#16324F]/10 bg-white/80 px-6 py-4 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
            href="/checkout"
          >
            결제 페이지로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
