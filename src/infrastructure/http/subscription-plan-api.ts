import { SubscriptionPlan } from "@/domain/models/subscription-plan";

const DEFAULT_API_URL = "http://localhost:3000";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
}

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const response = await fetch(`${getBaseUrl()}/subscription-plans`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch plans: ${response.status}`);
  }

  return (await response.json()) as SubscriptionPlan[];
}

