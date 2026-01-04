import { SubscriptionPlan } from "@/domain/models/subscription-plan";
import { formatCurrency } from "@/lib/formatters";

interface PlanCardProps {
  plan: SubscriptionPlan;
  highlight?: boolean;
}

export function PlanCard({ plan, highlight }: PlanCardProps) {
  return (
    <article
      className={[
        "flex h-full flex-col rounded-3xl border p-6 text-left shadow-lg",
        highlight ? "border-orange-200 bg-gradient-to-b from-orange-50 to-white" : "border-orange-100 bg-white/90",
      ].join(" ")}
    >
      <div className="space-y-2">
        <span className="text-sm font-semibold uppercase tracking-wide text-orange-500">{plan.slug}</span>
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-3xl font-black">{formatCurrency(plan.priceCents)}</p>
      </div>
      <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-700">
        {plan.features.slice(0, 6).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="/auth/register"
        className="mt-6 w-full rounded-2xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700 text-center block"
      >
        Assinar {plan.name}
      </a>
    </article>
  );
}

