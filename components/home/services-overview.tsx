import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TreeDeciduous, Shovel, Mountain, Building2, Route, Hammer } from "lucide-react"

const services = [
  {
    title: "Land Clearing",
    description: "Complete brush, vegetation, and debris removal to prepare your property for development or improvement.",
    icon: TreeDeciduous,
    href: "/services#land-clearing",
  },
  {
    title: "Tree Removal",
    description: "Safe and efficient removal of trees of all sizes, including stumps and root systems.",
    icon: TreeDeciduous,
    href: "/services#tree-removal",
  },
  {
    title: "Building Demolition",
    description: "Professional teardown and removal of old houses, barns, sheds, garages, and other structures.",
    icon: Hammer,
    href: "/services#demolition",
  },
  {
    title: "Excavation",
    description: "Foundation digging, trenching, and earth moving for residential and commercial projects.",
    icon: Shovel,
    href: "/services#excavation",
  },
  {
    title: "Grading & Leveling",
    description: "Precision site grading to ensure proper drainage and stable building surfaces.",
    icon: Mountain,
    href: "/services#grading",
  },
  {
    title: "Site Preparation",
    description: "Complete site prep including clearing, grading, and utility preparation for new construction.",
    icon: Building2,
    href: "/services#site-prep",
  },
  {
    title: "Driveways & Pads",
    description: "Construction of gravel driveways, parking pads, and access roads for your property.",
    icon: Route,
    href: "/services#driveways",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our Services</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Full-Service Groundworks for Every Project
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            From initial land clearing to final grading, we provide comprehensive 
            groundworks services for residential and commercial projects throughout 
            Kitsap County.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative bg-card rounded-lg border border-border p-6 sm:p-8 transition-all duration-200 hover:border-primary/30 hover:shadow-lg active:scale-[0.99]"
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded bg-primary/10 text-primary">
                <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="h-12 sm:h-11 text-base transition-all duration-200 active:scale-[0.98] bg-transparent">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
