import CheckoutClient from "@/components/checkout-client";
import { hasTossEnv } from "@/lib/env";
import { type PlanCode } from "@/lib/planmon";

type Props = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const plan = (params.plan === "pro_plus" ? "pro_plus" : "pro") as PlanCode;

  return <CheckoutClient initialPlan={plan} tossReady={hasTossEnv()} />;
}
