import { testimonials } from "@/presentation/content/landing-content";

export function TestimonialsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <blockquote key={testimonial.author} className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-md">
          <p className="text-lg font-semibold text-gray-900">“{testimonial.quote}”</p>
          <footer className="mt-4 text-sm text-gray-600">
            {testimonial.author} • {testimonial.role}
          </footer>
        </blockquote>
      ))}
    </section>
  );
}

