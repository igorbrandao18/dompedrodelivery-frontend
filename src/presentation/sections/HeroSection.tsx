'use client';

import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="text-center space-y-8 pt-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        Dom Pedro Delivery · plataforma completa
      </div>

      {/* Heading */}
      <div className="space-y-6">
        <h1 className="text-4xl font-black text-gray-900 md:text-6xl lg:text-7xl leading-tight">
          Seu delivery profissional
          <span className="block text-orange-600">pronto em minutos</span>
        </h1>
        
        <p className="text-xl text-gray-600 md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed">
          Crie um cardápio digital, receba pedidos e administre toda a operação em um só lugar — 
          <span className="text-orange-600 font-semibold">em qualquer dispositivo</span>.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          variant="primary" 
          size="lg"
          className="w-full sm:w-auto shadow-lg shadow-orange-200/50"
        >
          Começar gratuitamente
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="w-full sm:w-auto"
        >
          Ver demonstração
        </Button>
      </div>

      {/* Trust indicators */}
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Sem cartão de crédito · cancelamento a qualquer momento
        </p>
        
        <div className="flex items-center justify-center gap-8 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            SSL Seguro
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            GDPR Compliant
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Suporte 24/7
          </div>
        </div>
      </div>
    </section>
  );
}

