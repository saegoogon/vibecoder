import Link from "next/link";

type Props = {
  searchParams: Promise<{ code?: string; message?: string }>;
};

export default async function PaymentFailPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8">
      <section className="glass-card rounded-[2.4rem] p-8 text-center">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Payment Failed
        </p>
        <h1 className="mt-4 font-display text-5xl text-[#16324F]">결제가 완료되지 않았어요</h1>
        <p className="mt-5 text-base leading-8 text-[#355070]">
          {params.message || "구매자가 결제 과정을 취소했거나 승인 전에 문제가 발생했습니다."}
        </p>
        {params.code ? (
          <p className="mt-2 text-sm text-[#5C7C92]">오류 코드: {params.code}</p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="rounded-full bg-[#16324F] px-6 py-4 text-sm font-semibold text-white hover:-translate-y-0.5"
            href="/checkout"
          >
            다시 결제하기
          </Link>
          <Link
            className="rounded-full border border-[#16324F]/10 bg-white/80 px-6 py-4 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
            href="/"
          >
            홈으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
