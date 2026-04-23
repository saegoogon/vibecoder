"use client";

import { useMemo, useState } from "react";
import { planMap, plans, type PlanCode } from "@/lib/planmon";

type Props = {
  initialPlan: PlanCode;
};

export default function CheckoutClient({ initialPlan }: Props) {
  const [planCode, setPlanCode] = useState<PlanCode>(initialPlan);
  const [customerName, setCustomerName] = useState("김플랜");
  const [customerEmail, setCustomerEmail] = useState("student@example.com");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedPlan = useMemo(() => planMap[planCode], [planCode]);

  const handleCheckout = async () => {
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode, customerName, customerEmail }),
      });

      const payload = (await response.json()) as { checkoutUrl?: string; message?: string };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.message || "결제를 시작하지 못했습니다.");
      }

      window.location.href = payload.checkoutUrl;
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "결제 요청 중 오류가 발생했습니다.");
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-20 pt-6 sm:px-8 lg:px-10">
      <header className="mb-8">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Toss Payments Checkout
        </p>
        <h1 className="mt-3 font-display text-5xl text-[#16324F]">플랜 업그레이드</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#355070]">
          한국어 환경에 맞춰 토스페이먼츠 결제창으로 연결됩니다. 서버에서 주문을 만들고,
          결제 성공 후 다시 플랜몬으로 돌아와 승인 API를 완료합니다.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="glass-card rounded-[2.3rem] p-6">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Plan Select
          </p>
          <div className="mt-5 grid gap-4">
            {plans
              .filter((plan) => plan.code !== "free")
              .map((plan) => {
                const active = plan.code === planCode;

                return (
                  <button
                    key={plan.code}
                    className={`rounded-[1.8rem] border px-5 py-5 text-left ${
                      active
                        ? "border-[#16324F] bg-[#16324F] text-white"
                        : "border-[#16324F]/10 bg-white/80 text-[#16324F]"
                    }`}
                    onClick={() => setPlanCode(plan.code)}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs tracking-[0.25em] uppercase ${
                            active ? "text-white/70" : "text-[#5C7C92]"
                          }`}
                        >
                          {plan.headline}
                        </p>
                        <h2 className="mt-2 font-display text-4xl">{plan.name}</h2>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          active ? "bg-white/15 text-white" : "bg-[#16324F] text-white"
                        }`}
                      >
                        {plan.priceText}
                      </span>
                    </div>
                    <p className={`mt-4 text-sm leading-7 ${active ? "text-white/85" : "text-[#355070]"}`}>
                      {plan.summary}
                    </p>
                  </button>
                );
              })}
          </div>
        </article>

        <article className="glass-card rounded-[2.3rem] p-6">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Order Form
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#16324F]">이름</span>
              <input
                className="w-full rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
                onChange={(event) => setCustomerName(event.target.value)}
                value={customerName}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#16324F]">이메일</span>
              <input
                className="w-full rounded-[1.2rem] border border-[#16324F]/10 bg-white/80 px-4 py-3 outline-none"
                onChange={(event) => setCustomerEmail(event.target.value)}
                value={customerEmail}
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.8rem] bg-[#16324F] p-5 text-white">
            <p className="text-sm font-semibold tracking-[0.25em] text-white/65 uppercase">
              Selected Plan
            </p>
            <h3 className="mt-2 font-display text-4xl">{selectedPlan.name}</h3>
            <p className="mt-2 text-lg text-white/85">{selectedPlan.priceText}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          {status ? (
            <p className="mt-4 rounded-[1.2rem] bg-[#fff1f1] px-4 py-3 text-sm text-[#b42318]">
              {status}
            </p>
          ) : null}

          <button
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FFBF69] px-6 py-4 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={submitting}
            onClick={handleCheckout}
            type="button"
          >
            {submitting ? "결제창 준비 중..." : `${selectedPlan.name} 결제하기`}
          </button>
        </article>
      </section>
    </main>
  );
}
