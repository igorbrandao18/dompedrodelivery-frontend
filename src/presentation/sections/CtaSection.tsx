import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="rounded-[32px] border border-orange-200 bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-12 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-wide">Pronto para começar?</p>
      <h2 className="mt-3 text-3xl font-bold">30 dias de teste gratuito. Sem truques.</h2>
      <p className="mt-2 text-orange-100">Crie seu cardápio, receba pedidos e veja o impacto na sua cozinha ainda hoje.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button className="bg-white text-orange-600 hover:bg-orange-50">Criar conta Free</Button>
        <Button variant="ghost" className="border border-white/40 text-white hover:bg-white/10">
          Falar com vendas
        </Button>
      </div>
    </section>
  );
}

