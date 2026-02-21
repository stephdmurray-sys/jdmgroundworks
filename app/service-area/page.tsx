import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Areas - Excavation, Demolition & Land Clearing in Kitsap County",
  description: "JDM Groundworks provides excavation, land clearing, building demolition, and site preparation services throughout Kitsap County, WA. Serving Bremerton, Silverdale, Poulsbo, Port Orchard, Bainbridge Island, Seabeck and all surrounding areas. Local excavation and demolition experts.",
  keywords: [
    "excavation Bremerton WA",
    "land clearing Silverdale",
    "tree removal Poulsbo",
    "site preparation Port Orchard",
    "building demolition Bremerton",
    "house demolition Silverdale WA",
    "barn demolition Poulsbo",
    "demolition contractor Port Orchard",
    "excavation contractors Kitsap County",
    "land clearing Seabeck",
    "excavation Bainbridge Island",
    "demolition Bainbridge Island WA",
    "excavation services Kitsap WA",
    "local excavation contractor",
    "groundworks Kitsap Peninsula",
    "land clearing Kingston WA",
    "excavation Gorst WA",
    "tree removal Suquamish",
    "site prep Indianola WA",
    "excavation contractor near me Kitsap"
  ],
  openGraph: {
    title: "Service Areas | Excavation, Demolition & Land Clearing Throughout Kitsap County, WA",
    description: "Professional excavation, land clearing, and building demolition services throughout Kitsap County including Bremerton, Silverdale, Poulsbo, Port Orchard, and Bainbridge Island.",
    url: "https://jdmgroundworks.com/service-area",
  },
  alternates: {
    canonical: "https://jdmgroundworks.com/service-area",
  },
}

const mainAreas = [
  {
    name: "Bremerton",
    description: "Full-service groundworks for Bremerton and surrounding neighborhoods. From East Bremerton to Charleston and everywhere in between.",
    services: ["Land clearing", "Excavation", "Building demolition", "Drainage systems"],
  },
  {
    name: "Silverdale",
    description: "Serving the Silverdale area including Clear Creek, Ridgetop, and Newberry Hill communities with comprehensive land development services.",
    services: ["Tree removal", "Demolition", "Driveway construction", "Lot clearing"],
  },
  {
    name: "Poulsbo",
    description: "Expert groundworks services for Poulsbo properties from waterfront lots to hillside developments in the surrounding area.",
    services: ["Site preparation", "Excavation", "Building demolition", "Foundation work"],
  },
  {
    name: "Port Orchard",
    description: "Complete groundworks solutions for Port Orchard and South Kitsap including Bethel, Sedgwick, and surrounding communities.",
    services: ["Land clearing", "Demolition", "Erosion control", "Access roads"],
  },
  {
    name: "Bainbridge Island",
    description: "Professional excavation, land clearing, and demolition services for Bainbridge Island properties, including waterfront lots and wooded acreage.",
    services: ["Land clearing", "Excavation", "Building demolition", "Site preparation"],
  },
]

const additionalAreas = [
  "Seabeck",
  "Keyport",
  "Indianola",
  "Suquamish",
  "Hansville",
  "Kingston",
  "Olalla",
  "Gorst",
  "Tracyton",
  "Illahee",
  "Rolling Bay",
  "Manchester",
  "Fragaria",
  "Brownsville",
  "Chico",
]

export default function ServiceAreaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-foreground py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Service Area</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-background lg:text-5xl">
              Serving All of Kitsap County, Washington
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
              From Bremerton to Port Orchard, Poulsbo to Silverdale, and Bainbridge Island 
              to Seabeck, JDM Groundworks provides professional land clearing, excavation, 
              building demolition, and site preparation services throughout Kitsap County. 
              Our local expertise means we understand the unique terrain, soil conditions, 
              and permitting requirements of each community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Service Areas */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-8 sm:mb-12">
            Primary Service Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {mainAreas.map((area) => (
              <div
                key={area.name}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold text-card-foreground">{area.name}</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {area.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Popular services:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {area.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Areas */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Additional Communities We Serve
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                In addition to our primary service areas, we provide groundworks services 
                to numerous smaller communities and rural areas throughout Kitsap County. 
                No matter where your property is located, we can help.
              </p>
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {additionalAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                Rural & Undeveloped Properties
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                We specialize in working with challenging rural properties throughout 
                Kitsap County. Whether you have a heavily wooded lot, steep terrain, 
                or limited access, our equipment and expertise can handle it.
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Heavily wooded and overgrown lots</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Steep slopes and hillside properties</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Limited or no existing access</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Wetland-adjacent properties</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Raw, undeveloped land</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Local Knowledge Makes the Difference
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Kitsap County presents unique challenges for land development: heavy clay soils, 
              high water tables, steep terrain, and dense Pacific Northwest vegetation. Our 
              years of local experience mean we understand these challenges and know how to 
              address them efficiently.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded bg-primary text-primary-foreground mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-bold">P</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Permit Knowledge</h3>
              <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground">
                Familiar with Kitsap County permitting requirements, setbacks, critical areas, and regulations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded bg-primary text-primary-foreground mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-bold">T</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Terrain Expertise</h3>
              <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground">
                Experience with the slopes, soil types, and drainage patterns common to our region.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded bg-primary text-primary-foreground mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-bold">R</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Local Relationships</h3>
              <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground">
                Established connections with local suppliers, inspectors, and complementary contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            No matter where you are in Kitsap County, we can help with your land clearing, 
            excavation, building demolition, or site preparation needs. Contact us for a free site evaluation.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 h-12 sm:h-11 text-base transition-all duration-200 active:scale-[0.98]">
              <Link href="/contact">
                Request a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent h-12 sm:h-11 text-base transition-all duration-200 active:scale-[0.98]">
              <a href="tel:+13603557006">
                <Phone className="mr-2 h-4 w-4" />
                Call (360) 355-7006
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
