import PaymentSuccessClient from "@/components/payment-success-client";

type Props = {
  searchParams: Promise<{ paymentKey?: string; orderId?: string; amount?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.paymentKey || !params.orderId || !params.amount) {
    return (
      <main className="site-shell mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8">
        <section className="poster-card p-8 text-center">
          <h1 className="font-display text-5xl text-[#09111f]">결제 정보가 부족해요</h1>
          <p className="mt-4 text-sm leading-7 text-[#355070]">
            성공 페이지로 돌아왔지만 필요한 결제 정보가 없어 상태를 확인할 수 없었습니다.
          </p>
        </section>
      </main>
    );
  }

  return (
    <PaymentSuccessClient
      amount={params.amount}
      orderId={params.orderId}
      paymentKey={params.paymentKey}
    />
  );
}
