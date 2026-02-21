import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ServiceAreaPreview } from "@/components/home/service-area-preview"
import { FAQSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jdmgroundworks.com",
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <ServiceAreaPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}
