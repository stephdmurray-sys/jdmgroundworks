import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, Shield, Clock, Award } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-primary overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-primary-foreground mb-6">
          <Clock className="h-4 w-4" />
          <span>Booking Fast for Spring 2026</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground lg:text-5xl">
          Get Your Free Site Evaluation Today
        </h2>
        <p className="mt-4 text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
          No obligation. No pressure. Just honest advice from local excavation experts who've completed over 200 projects in Kitsap County.
        </p>
        
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 h-14 sm:h-12 text-base font-semibold shadow-xl transition-all duration-200 active:scale-[0.98]">
            <Link href="/contact">
              Request a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto border-2 border-white/40 text-primary-foreground hover:bg-white/10 bg-white/5 h-14 sm:h-12 text-base font-semibold transition-all duration-200 active:scale-[0.98]">
            <a href="tel:+13603557006">
              <Phone className="mr-2 h-5 w-5" />
              Call (360) 355-7006
            </a>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 text-primary-foreground/80">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <p className="text-sm font-medium">100% Satisfaction Guarantee</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-primary-foreground/80">
            <Clock className="h-8 w-8 text-primary-foreground" />
            <p className="text-sm font-medium">24-Hour Response Time</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-primary-foreground/80">
            <Award className="h-8 w-8 text-primary-foreground" />
            <p className="text-sm font-medium">Licensed & Fully Insured</p>
          </div>
        </div>

        <p className="mt-8 text-xs sm:text-sm text-primary-foreground/60">
          Proudly serving Bremerton, Silverdale, Poulsbo, Port Orchard, Seabeck, and all of Kitsap County since 2014
        </p>
      </div>
    </section>
  )
}
