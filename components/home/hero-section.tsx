import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-excavator.jpg"
          alt="Excavator clearing land in Pacific Northwest"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-foreground/80 via-foreground/75 to-foreground" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 pb-20 sm:py-20 sm:pb-28 lg:py-24 lg:pb-32 leading-4">
        <div className="max-w-3xl flex flex-col justify-center">
          <h1 className="text-[1.875rem] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-balance">
            Land Clearing, Excavation & Demolition in Kitsap County
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/95 max-w-lg sm:max-w-2xl">
            Full-service excavation, land clearing, building demolition, tree removal, and site preparation for homeowners, developers, and builders across Kitsap County, Washington.
          </p>
          
          {/* Call Now Button */}
          <div className="mt-5 sm:mt-7">
            <a 
              href="tel:+13603557006" 
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3.5 bg-white/15 backdrop-blur-sm rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/40 transition-all text-white group"
            >
              <Phone className="h-5 w-5 shrink-0 text-background" />
              <span className="font-bold text-lg sm:text-xl">(360) 355-7006</span>
            </a>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 text-sm text-white/75">
              <Clock className="h-4 w-4" />
              <span>24-hour response time</span>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 sm:h-12 text-base sm:text-base font-semibold shadow-xl transition-all duration-200 active:scale-[0.98]">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white/50 text-white hover:bg-white/15 bg-white/5 h-14 sm:h-12 text-base sm:text-base font-semibold transition-all duration-200 active:scale-[0.98]">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
