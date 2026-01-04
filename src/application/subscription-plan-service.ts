import { SubscriptionPlan } from "@/domain/models/subscription-plan";
import { fetchSubscriptionPlans } from "@/infrastructure/http/subscription-plan-api";

export async function getLandingPlans(limit?: number): Promise<SubscriptionPlan[]> {
  try {
    const plans = await fetchSubscriptionPlans();
    const ordered = plans.sort((a, b) => a.sortOrder - b.sortOrder);
    return limit ? ordered.slice(0, limit) : ordered;
  } catch (error) {
    console.error("[subscription-plan-service] Failed to fetch plans", error);
    return [];
  }
}

