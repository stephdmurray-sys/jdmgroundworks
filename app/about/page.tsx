import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Users, MapPin, Award, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Our Company - Licensed Excavation & Demolition Contractors",
  description: "JDM Groundworks is a licensed & insured excavation, land clearing, and building demolition company serving Kitsap County, WA. Modern equipment, experienced operators, and commitment to quality.",
  keywords: [
    "licensed excavation contractor Kitsap County",
    "insured land clearing company WA",
    "local excavation services Bremerton",
    "professional groundworks contractor",
    "Kitsap County excavation company"
  ],
  openGraph: {
    title: "About JDM Groundworks | Licensed Kitsap County Excavation Contractor",
    description: "Licensed & insured excavation company serving Kitsap County with modern equipment and experienced operators.",
    url: "https://jdmgroundworks.com/about",
  },
  alternates: {
    canonical: "https://jdmgroundworks.com/about",
  },
}

const values = [
  {
    title: "Safety First",
    description: "Every project begins and ends with safety. We maintain strict safety protocols, proper training, and comprehensive insurance to protect our crew and your property.",
    icon: Shield,
  },
  {
    title: "Quality Equipment",
    description: "We invest in modern, well-maintained equipment including excavators, skid steers, forestry mulchers, and support vehicles to deliver efficient, quality results.",
    icon: Truck,
  },
  {
    title: "Local Expertise",
    description: "Years of experience in Kitsap County means we understand the terrain, soil conditions, permitting requirements, and challenges unique to our region.",
    icon: MapPin,
  },
  {
    title: "Professional Results",
    description: "We take pride in delivering work that meets or exceeds expectations. Our reputation is built on consistent, professional results for every client.",
    icon: Award,
  },
]

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "24hr", label: "Quote Response" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-foreground py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">About JDM Groundworks</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-background lg:text-5xl">
                Professional Groundworks for Kitsap County
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
                JDM Groundworks is a full-service land clearing, excavation, and building 
                demolition contractor serving residential and commercial clients throughout 
                Kitsap County, Washington. We bring years of local experience, professional 
                equipment, and a commitment to quality to every project.
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-background/70 leading-relaxed">
                Whether you are a homeowner preparing land for construction, a developer 
                working on a subdivision, or a builder needing site preparation, we have 
                the expertise and equipment to deliver results on time and on budget.
              </p>
            </div>
            <div className="relative aspect-[4/3] order-1 lg:order-2">
              <Image
                src="/images/equipment-lineup.jpg"
                alt="JDM Groundworks equipment fleet"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-12 lg:py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What Sets Us Apart
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We built JDM Groundworks on a foundation of professionalism, safety, and 
              quality workmanship. These values guide everything we do.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 sm:gap-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded bg-primary/10 text-primary shrink-0">
                  <value.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] order-2 lg:order-1">
              <Image
                src="/images/hero-excavator.jpg"
                alt="Excavator at work on a Kitsap County job site"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Our Approach to Every Project
              </h2>
              <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Site Evaluation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We start with a thorough assessment of your property, discussing your goals 
                      and identifying any challenges or considerations.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Detailed Quote</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You receive a clear, detailed quote outlining the scope of work, timeline, 
                      and pricing. No surprises or hidden fees.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Professional Execution</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Our experienced crew arrives on time with the right equipment to complete 
                      your project efficiently and to specification.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Site Cleanup</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We leave your property clean and ready for the next phase of your project, 
                      with all debris removed and the site properly graded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Licensed, Insured & Professional
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              JDM Groundworks maintains all required licenses and insurance to protect 
              our clients and ensure professional, compliant work.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 text-center transition-all duration-200 hover:shadow-md">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto" />
              <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-card-foreground">Washington State Licensed</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                Licensed contractor with the Washington State Department of Labor & Industries.
              </p>
              <p className="mt-2 sm:mt-3 text-xs text-muted-foreground">License #JDMGR*123AB</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 text-center transition-all duration-200 hover:shadow-md">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto" />
              <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-card-foreground">Fully Insured</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                Comprehensive general liability and workers compensation insurance coverage.
              </p>
              <p className="mt-2 sm:mt-3 text-xs text-muted-foreground">Certificate available on request</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 text-center transition-all duration-200 hover:shadow-md">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto" />
              <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-card-foreground">Bonded</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                Contractor bond on file with Washington State for your protection.
              </p>
              <p className="mt-2 sm:mt-3 text-xs text-muted-foreground">Per WA State requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl">
            Ready to Work With Us?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Contact us today for a free site evaluation and quote. We look forward 
            to helping you with your next land clearing or excavation project.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 sm:mt-8 bg-background text-foreground hover:bg-background/90 h-12 sm:h-11 text-base transition-all duration-200 active:scale-[0.98]">
            <Link href="/contact">
              Request a Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
