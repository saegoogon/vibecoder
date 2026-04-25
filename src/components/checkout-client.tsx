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
  const [customerName, setCustomerName] = useState("김포인터");
  const [customerEmail, setCustomerEmail] = useState("pointer@example.com");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedPlan = useMemo(() => planMap[planCode], [planCode]);

  const handleCheckout = async () => {
    if (!tossReady) {
      setStatus("토스 결제 키가 아직 연결되지 않았습니다. 먼저 /setup에서 상태를 확인해 주세요.");
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
            <div className="section-chip">premium packs</div>
            <h1 className="mt-4 font-display text-5xl leading-none text-white">
              좋아하는 커서를
              <br />
              오래 쓰고 싶다면
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#9eadc1]">
              포인터룸의 프리미엄 팩은 강한 개성을 가진 스킨과 저장 기능을 여는 업그레이드입니다.
              싸게 보이는 결제 페이지 대신, 실제 제품 페이지처럼 믿고 누를 수 있는 톤으로 다시
              설계했습니다.
            </p>
          </div>
          <Link className="ghost-button px-5 py-3 text-sm font-bold text-white" href="/setup">
            연결 상태 확인
          </Link>
        </div>
      </header>

      {!tossReady ? (
        <section className="panel-outline mt-6 px-5 py-4 text-sm leading-7 text-[#ffd57c]">
          지금은 토스 시크릿 키가 없어서 실제 결제는 막혀 있습니다. `/setup`에서 환경변수를 넣은 뒤
          다시 시도하면 됩니다.
        </section>
      ) : null}

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <article className="poster-card p-6">
          <div className="section-chip">pack select</div>
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
                        ? "border-[#a9ff2f]/45 bg-[#141b11] shadow-[0_0_0_1px_rgba(169,255,47,0.12)]"
                        : "border-white/8 bg-white/[0.02]"
                    }`}
                    onClick={() => setPlanCode(plan.code)}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#9cadc2]">{plan.headline}</p>
                        <h2 className="mt-2 font-display text-4xl leading-none text-white">{plan.name}</h2>
                      </div>
                      <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-white">
                        {plan.priceText}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#9eadc1]">{plan.summary}</p>
                  </button>
                );
              })}
          </div>
        </article>

        <article className="hard-card p-6">
          <div className="note-label gold">checkout</div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white">이름</span>
              <input
                className="form-field"
                onChange={(event) => setCustomerName(event.target.value)}
                value={customerName}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white">이메일</span>
              <input
                className="form-field"
                onChange={(event) => setCustomerEmail(event.target.value)}
                value={customerEmail}
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-white/8 bg-black/25 p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/55">selected pack</p>
            <h3 className="mt-2 font-display text-4xl leading-none">{selectedPlan.name}</h3>
            <p className="mt-2 text-lg text-white/85">{selectedPlan.priceText}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/82">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>

          {status ? (
            <p className="mt-4 rounded-[1.2rem] bg-[#2a1412] px-4 py-3 text-sm text-[#ff9d90]">{status}</p>
          ) : null}

          <button
            className="sticker-button mt-6 inline-flex w-full items-center justify-center bg-[#a9ff2f] px-6 py-4 text-sm font-bold text-[#081018] disabled:opacity-70"
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
