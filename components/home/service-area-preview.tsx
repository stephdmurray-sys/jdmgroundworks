import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

const serviceAreas = [
  "Bremerton",
  "Silverdale",
  "Poulsbo",
  "Port Orchard",
  "Bainbridge Island",
  "Seabeck",
  "Kingston",
  "Rural Kitsap",
]

export function ServiceAreaPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Service Area</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Serving All of Kitsap County, Washington
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              From the urban areas of Bremerton and Silverdale to Bainbridge Island 
              and the rural properties of Seabeck and beyond, we provide professional 
              land clearing, excavation, and building demolition services throughout 
              Kitsap County.
            </p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our local expertise means we understand the unique terrain, soil conditions, 
              and permitting requirements of each area. Whether your project is on a 
              waterfront lot or a wooded hillside, we have the experience to deliver results.
            </p>

            <Button asChild className="mt-6 sm:mt-8 h-12 sm:h-11 text-[0.9375rem] sm:text-base transition-all duration-200 active:scale-[0.98]" size="lg">
              <Link href="/service-area">
                <span className="sm:hidden">View Service Area</span>
                <span className="hidden sm:inline">View Full Service Area</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </div>

          {/* Service Area List */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-5 sm:mb-6">Communities We Serve</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm sm:text-base text-muted-foreground">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Not sure if we serve your area? Contact us for a free consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
