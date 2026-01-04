import { metrics } from "@/presentation/content/landing-content";

export function MetricsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-3xl border border-orange-100 bg-white/80 p-6 text-center shadow-md">
          <p className="text-3xl font-black text-gray-900">{metric.value}</p>
          <p className="mt-2 text-sm text-gray-500">{metric.label}</p>
        </div>
      ))}
    </section>
  );
}

