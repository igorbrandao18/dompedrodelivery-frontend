'use client';

import { SubscriptionPlan } from "@/domain/types";
import { PlanCard } from "./PlanCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PlansSectionProps {
  plans: SubscriptionPlan[];
}

export function PlansSection({ plans }: PlansSectionProps) {
  return (
    <section id="plans" className="space-y-8 pt-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Planos
        </p>
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Escolha o plano perfeito para o seu negócio
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Todos incluem painel completo, cardápio digital e atualizações constantes.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              highlight={index === 1} 
            />
          ))
        ) : (
          <div className="md:col-span-3">
            <Card className="border-dashed border-orange-200 bg-orange-50/50">
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Planos em preparação
                    </h3>
                    <p className="text-gray-600">
                      Estamos finalizando os planos. Volte em alguns instantes.
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Link href="#contact">
                      Fale conosco
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Trust Badge */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Garantia de 7 dias
        </div>
        <p className="text-xs text-gray-500">
          Teste por 7 dias. Se não gostar, cancelamos sem custos.
        </p>
      </div>
    </section>
  );
}

