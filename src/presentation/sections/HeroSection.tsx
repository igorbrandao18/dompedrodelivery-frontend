import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="text-center space-y-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-semibold text-orange-600">
        Dom Pedro Delivery · plataforma completa
      </span>
      <div className="space-y-4">
        <h1 className="text-4xl font-black md:text-5xl">Seu delivery profissional pronto em minutos</h1>
        <p className="text-lg text-gray-600 md:text-xl">
          Crie um cardápio digital, receba pedidos e administre toda a operação em um só lugar — em qualquer
          dispositivo.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Criar conta gratuita</Button>
        <Button variant="secondary">Ver demonstração</Button>
      </div>
      <p className="text-sm text-gray-500">Sem cartão de crédito · cancelamento a qualquer momento</p>
    </section>
  );
}

