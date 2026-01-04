import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getLandingPlans } from "@/application/subscription-plan-service";
import { HeroSection } from "@/presentation/sections/HeroSection";
import { MetricsSection } from "@/presentation/sections/MetricsSection";
import { FeaturesSection } from "@/presentation/sections/FeaturesSection";
import { StepsSection } from "@/presentation/sections/StepsSection";
import { PlansSection } from "@/presentation/sections/PlansSection";
import { TestimonialsSection } from "@/presentation/sections/TestimonialsSection";
import { CtaSection } from "@/presentation/sections/CtaSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const plans = await getLandingPlans();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-16 space-y-20">
          <HeroSection />
          <MetricsSection />
          <FeaturesSection />
          <StepsSection />
          <PlansSection plans={plans} />
          <TestimonialsSection />
          <CtaSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

