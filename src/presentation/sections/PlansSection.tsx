import { SubscriptionPlan } from "@/domain/models/subscription-plan";
import { PlanCard } from "./PlanCard";

interface PlansSectionProps {
  plans: SubscriptionPlan[];
}

export function PlansSection({ plans }: PlansSectionProps) {
  return (
    <section id="plans" className="space-y-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">Planos</p>
      <h2 className="text-3xl font-bold">Escolha o plano perfeito para o seu momento</h2>
      <p className="text-gray-600">Todos incluem painel completo, cardápio digital e atualizações constantes.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.length > 0 ? (
          plans.map((plan, index) => <PlanCard key={plan.id} plan={plan} highlight={index === 1} />)
        ) : (
          <div className="md:col-span-3 rounded-3xl border border-dashed border-orange-200 bg-white/70 p-8 text-center text-gray-600">
            Ainda estamos preparando os planos. Volte em instantes.
          </div>
        )}
      </div>
    </section>
  );
}

