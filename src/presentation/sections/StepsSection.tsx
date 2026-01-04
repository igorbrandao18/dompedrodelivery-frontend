'use client';

import { steps } from "@/presentation/content/landing-content";
import { Card, CardContent } from "@/components/ui/card";

export function StepsSection() {
  return (
    <section id="steps" className="space-y-12 pt-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Como funciona
        </p>
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Do cadastro ao primeiro pedido em 3 passos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simples para donos de restaurantes, poderoso para seu negócio. Fale conosco para começar.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-200 hidden md:block" />
        
        <div className="space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative flex items-start gap-8 md:items-center"
            >
              {/* Step Number */}
              <div className="relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xl font-bold shadow-lg shadow-orange-200/50">
                  {index + 1}
                </div>
                {/* Connecting dots */}
                <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-orange-200 hidden md:block" />
              </div>

              {/* Step Content */}
              <Card className="flex-1 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                        style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {index + 1} de {steps.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile connector */}
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-orange-200 md:hidden" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-500">
          Tempo médio de configuração: <span className="font-semibold text-gray-700">5 minutos</span>
        </p>
      </div>
    </section>
  );
}

