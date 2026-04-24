"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { planMap, plans, type PlanCode } from "@/lib/planmon";

type Props = {
  initialPlan: PlanCode;
  tossReady: boolean;
};

export default function CheckoutClient({ initialPlan, tossReady }: Props) {
  const [planCode, setPlanCode] = useState<PlanCode>(initialPlan);
  const [customerName, setCustomerName] = useState("김플랜");
  const [customerEmail, setCustomerEmail] = useState("student@example.com");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedPlan = useMemo(() => planMap[planCode], [planCode]);

  const handleCheckout = async () => {
    if (!tossReady) {
      setStatus("토스 결제 키가 아직 연결되지 않았어요. 먼저 /setup 페이지에서 상태를 확인해 주세요.");
      return;
    }

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
    <main className="site-shell mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-24 pt-5 sm:px-7 lg:px-10">
      <header className="poster-card px-6 py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-chip">Toss Payments Checkout</div>
            <h1 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
              결제도
              <br />
              브랜드 경험처럼 보여야 해요
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#41556b]">
              학생 사용자에게 부담 없이 보이도록 구성한 업그레이드 페이지입니다. 플랜을 고르고
              정보 입력 후 실제 토스 결제창으로 자연스럽게 넘어가도록 설계했습니다.
            </p>
          </div>
          <Link className="ghost-button px-5 py-3 text-sm font-bold text-[#17273a]" href="/setup">
            설정 상태 확인
          </Link>
        </div>
      </header>

      {!tossReady ? (
        <section className="panel-outline mt-6 px-5 py-4 text-sm leading-7 text-[#7a4d00]">
          토스 결제 키가 아직 없어서 실제 결제는 막아 둔 상태예요. `/setup`에서 준비 상태를
          확인한 뒤 다시 시도하면 됩니다.
        </section>
      ) : null}

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="poster-card p-6">
          <div className="section-chip">Plan Select</div>
          <div className="mt-5 grid gap-4">
            {plans
              .filter((plan) => plan.code !== "free")
              .map((plan) => {
                const active = plan.code === planCode;

                return (
                  <button
                    key={plan.code}
                    className={`rounded-[1.8rem] border-2 px-5 py-5 text-left ${
                      active
                        ? "border-[#17273a] bg-[#17273a] text-white shadow-[10px_10px_0_rgba(23,39,58,0.95)]"
                        : "border-[#17273a]/10 bg-white/80 text-[#17273a]"
                    }`}
                    onClick={() => setPlanCode(plan.code)}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs uppercase tracking-[0.25em] ${
                            active ? "text-white/70" : "text-[#5C7C92]"
                          }`}
                        >
                          {plan.headline}
                        </p>
                        <h2 className="mt-2 font-display text-4xl leading-none">{plan.name}</h2>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          active ? "bg-white/15 text-white" : "bg-[#17273a] text-white"
                        }`}
                      >
                        {plan.priceText}
                      </span>
                    </div>
                    <p className={`mt-4 text-sm leading-7 ${active ? "text-white/82" : "text-[#41556b]"}`}>
                      {plan.summary}
                    </p>
                  </button>
                );
              })}
          </div>
        </article>

        <article className="hard-card bg-[#fffdf8] p-6">
          <div className="note-label gold">Order Form</div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#17273a]">이름</span>
              <input
                className="form-field"
                onChange={(event) => setCustomerName(event.target.value)}
                value={customerName}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#17273a]">이메일</span>
              <input
                className="form-field"
                onChange={(event) => setCustomerEmail(event.target.value)}
                value={customerEmail}
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.8rem] bg-[#17273a] p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/65">Selected Plan</p>
            <h3 className="mt-2 font-display text-4xl leading-none">{selectedPlan.name}</h3>
            <p className="mt-2 text-lg text-white/85">{selectedPlan.priceText}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/82">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>

          {status ? (
            <p className="mt-4 rounded-[1.2rem] bg-[#fff1f1] px-4 py-3 text-sm text-[#b42318]">{status}</p>
          ) : null}

          <button
            className="sticker-button mt-6 inline-flex w-full items-center justify-center bg-[#ffb24b] px-6 py-4 text-sm font-bold text-[#17273a] disabled:cursor-not-allowed disabled:opacity-70"
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
