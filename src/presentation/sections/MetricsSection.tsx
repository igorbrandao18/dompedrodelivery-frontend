'use client';

import { metrics } from "@/presentation/content/landing-content";
import { Card, CardContent } from "@/components/ui/card";

export function MetricsSection() {
  return (
    <section className="space-y-12 pt-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Resultados
        </p>
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Números que falam por si
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Milhares de restaurantes já confiam em nossa plataforma para crescer seus negócios.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card 
            key={metric.label}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <CardContent className="p-8 text-center">
              {/* Icon */}
              <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg group-hover:shadow-orange-200 transition-shadow">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {index === 0 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  )}
                  {index === 1 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {index === 2 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <p className="text-4xl font-black text-gray-900 md:text-5xl">
                  {metric.value}
                </p>
                <p className="text-gray-600 font-medium">
                  {metric.label}
                </p>
              </div>

              {/* Description */}
              <div className="mt-4 text-sm text-gray-500">
                {index === 0 && "Pedidos processados diariamente na plataforma"}
                {index === 1 && "Taxa de satisfação dos nossos clientes"}
                {index === 2 && "Tempo médio de resposta ao suporte"}
              </div>

              {/* Trend indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm font-medium">Crescimento contínuo</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="bg-gradient-to-r from-orange-50 to-white rounded-3xl p-8 border border-orange-100">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-600">Cidades atendidas</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">99.9%</p>
            <p className="text-sm text-gray-600">Uptime garantido</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">24/7</p>
            <p className="text-sm text-gray-600">Monitoramento ativo</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">SSL</p>
            <p className="text-sm text-gray-600">Segurança de ponta</p>
          </div>
        </div>
      </div>
    </section>
  );
}

