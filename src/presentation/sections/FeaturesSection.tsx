import { highlights } from "@/presentation/content/landing-content";

export function FeaturesSection() {
  return (
    <section id="features" className="grid gap-8 md:grid-cols-3">
      {highlights.map((item) => (
        <article key={item.title} className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg">
          <div className="mb-4 h-12 w-12 rounded-2xl bg-orange-100" />
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{item.description}</p>
        </article>
      ))}
    </section>
  );
}

