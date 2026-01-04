import { steps } from "@/presentation/content/landing-content";

export function StepsSection() {
  return (
    <section id="steps" className="rounded-[32px] bg-gray-900 px-8 py-12 text-white md:flex md:items-center md:gap-12">
      <div className="space-y-4 md:flex-1">
        <h2 className="text-3xl font-bold">Do cadastro ao primeiro pedido em 3 passos</h2>
        <p className="text-gray-300">
          Simples para donos de restaurantes, confiável para clientes. O painel orienta cada etapa.
        </p>
      </div>
      <ol className="mt-8 space-y-6 md:mt-0 md:flex-1">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-gray-300">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

