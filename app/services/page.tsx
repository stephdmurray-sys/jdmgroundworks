import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Excavation, Land Clearing & Demolition Services",
  description: "Complete excavation, land clearing, building demolition, and site preparation services in Kitsap County, WA. Demolition of houses, barns, sheds, garages & old structures. Tree removal, gravel driveways, RV pads, drainage systems & more. Licensed contractors serving Bremerton, Silverdale, Poulsbo & Port Orchard. Free estimates.",
  keywords: [
    "excavation services Kitsap County",
    "land clearing contractors WA",
    "building demolition Kitsap County",
    "house demolition Bremerton WA",
    "barn demolition Kitsap County",
    "shed demolition Silverdale",
    "garage demolition Poulsbo WA",
    "structure removal Port Orchard",
    "residential demolition Kitsap County",
    "commercial demolition Washington",
    "demolition contractors Bremerton",
    "old building tear down Kitsap",
    "tree removal Bremerton",
    "stump grinding Kitsap County",
    "driveway construction Silverdale",
    "gravel driveway installation Bremerton",
    "RV pad construction Kitsap WA",
    "RV parking pad Poulsbo",
    "boat parking pad Port Orchard",
    "equipment storage pad",
    "site preparation Silverdale",
    "grading services Poulsbo",
    "parking lot grading Kitsap County",
    "drainage installation Bremerton",
    "French drain installation Kitsap WA",
    "erosion control Silverdale",
    "foundation excavation Poulsbo",
    "utility trenching Port Orchard",
    "bulldozer services Washington",
    "commercial excavation Kitsap",
    "residential land clearing",
    "building pad preparation",
    "access road construction Kitsap County"
  ],
  openGraph: {
    title: "Professional Excavation, Land Clearing & Demolition Services | JDM Groundworks",
    description: "Complete excavation, land clearing, and building demolition services in Kitsap County, WA. Licensed contractors with modern equipment.",
    url: "https://jdmgroundworks.com/services",
  },
  alternates: {
    canonical: "https://jdmgroundworks.com/services",
  },
}

const services = [
  {
    id: "land-clearing",
    title: "Land Clearing",
    subtitle: "Professional brush and vegetation removal",
    description: "We provide comprehensive land clearing services for properties of all sizes throughout Kitsap County. Using modern forestry mulchers and equipment, we efficiently remove brush, vegetation, small trees, and debris to prepare your land for development.",
    image: "/images/cleared-land.jpg",
    benefits: [
      "Complete brush and vegetation removal",
      "Mulching and debris management",
      "Selective clearing available",
      "Minimal soil disturbance",
      "Environmentally responsible methods",
    ],
    idealFor: ["New home construction", "Property development", "Fire mitigation", "View clearing", "Access road creation"],
  },
  {
    id: "tree-removal",
    title: "Tree Removal",
    subtitle: "Safe removal of trees of all sizes",
    description: "Our tree removal services handle everything from small problem trees to large timber. We safely fell, remove, and process trees while protecting your property and surrounding landscape. Stump grinding and removal available.",
    image: "/images/tree-removal.jpg",
    benefits: [
      "Trees of all sizes",
      "Stump grinding and removal",
      "Hazard tree assessment",
      "Log and debris hauling",
      "Property protection",
    ],
    idealFor: ["Construction site clearing", "Hazard tree removal", "Storm damage cleanup", "Lot clearing", "View enhancement"],
  },
  {
    id: "demolition",
    title: "Building Demolition",
    subtitle: "Complete teardown and removal of old structures",
    description: "We provide professional demolition services for residential and commercial structures throughout Kitsap County. From old barns, sheds, and garages to full house demolitions, we safely tear down structures, remove all debris, and leave your site clean and ready for new construction or landscaping.",
    image: "/images/building-demolition.jpg",
    benefits: [
      "Houses, barns, sheds, and garages",
      "Complete debris removal and hauling",
      "Foundation and slab removal",
      "Safe asbestos and hazmat awareness",
      "Site grading after demolition",
    ],
    idealFor: ["Old barn removal", "Condemned structure teardown", "Shed and outbuilding removal", "House demolition", "Garage and carport removal"],
  },
  {
    id: "excavation",
    title: "Excavation",
    subtitle: "Precision earth moving and foundation work",
    description: "From foundation digging to trenching for utilities, our excavation services meet the demands of residential and commercial projects. We operate modern tracked excavators capable of handling the toughest Kitsap County terrain.",
    image: "/images/excavation-work.jpg",
    benefits: [
      "Foundation excavation",
      "Utility trenching",
      "Pond and drainage excavation",
      "Basement digging",
      "Rock and debris removal",
    ],
    idealFor: ["New construction", "Home additions", "Utility installation", "Drainage systems", "Septic systems"],
  },
  {
    id: "grading",
    title: "Grading & Leveling",
    subtitle: "Precision site grading for proper drainage",
    description: "Proper grading is critical for drainage, building stability, and overall site functionality. We provide precision grading services using laser-guided equipment to ensure accurate slopes and levels for your project.",
    image: "/images/cleared-land.jpg",
    benefits: [
      "Laser-guided precision",
      "Drainage slope creation",
      "Building pad preparation",
      "Yard and landscape grading",
      "Erosion prevention",
    ],
    idealFor: ["New construction sites", "Driveway installation", "Yard drainage correction", "Pad preparation", "Landscaping projects"],
  },
  {
    id: "site-prep",
    title: "Site Preparation",
    subtitle: "Complete turnkey site development",
    description: "Get your property ready for construction with our comprehensive site preparation services. We handle clearing, grading, access roads, and utility prep to deliver a construction-ready site. Perfect for builders and developers.",
    image: "/images/hero-excavator.jpg",
    benefits: [
      "Complete site clearing",
      "Grading and leveling",
      "Access road construction",
      "Utility corridor preparation",
      "Permit-ready documentation",
    ],
    idealFor: ["Home builders", "Property developers", "Commercial projects", "Multi-lot subdivisions", "Rural development"],
  },
  {
    id: "driveways",
    title: "Driveways & Pads",
    subtitle: "Durable access roads and parking areas",
    description: "We construct durable gravel driveways, parking pads, and access roads built to withstand Pacific Northwest weather. Proper base preparation and drainage ensure long-lasting results.",
    image: "/images/gravel-driveway.jpg",
    benefits: [
      "Proper base preparation",
      "Drainage integration",
      "Various surface options",
      "Culvert installation",
      "Turn-around areas",
    ],
    idealFor: ["Rural properties", "New home access", "Equipment storage pads", "RV and boat parking", "Farm access roads"],
  },
  {
    id: "drainage",
    title: "Drainage & Erosion Control",
    subtitle: "Protect your property from water damage",
    description: "Kitsap County's rainy climate demands proper drainage solutions. We design and install drainage systems including French drains, catch basins, culverts, and retention systems to protect your property.",
    image: "/images/excavation-work.jpg",
    benefits: [
      "French drain installation",
      "Catch basin systems",
      "Culvert installation",
      "Retention and detention systems",
      "Slope stabilization",
    ],
    idealFor: ["Wet properties", "Hillside lots", "Foundation protection", "Driveway drainage", "Yard drainage"],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-foreground py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-background lg:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
              Comprehensive groundworks services for residential and commercial projects 
              throughout Kitsap County, WA. From land clearing and building demolition to 
              excavation and final grading, we deliver professional results on every project.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {service.subtitle}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="mt-5 sm:mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                      What We Provide
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 sm:gap-3">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm sm:text-base text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="mt-5 sm:mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                      Ideal For
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.idealFor.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-secondary text-secondary-foreground rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="mt-6 sm:mt-8 h-11 sm:h-10 text-[0.875rem] sm:text-base transition-all duration-200 active:scale-[0.98]">
                    <Link href="/contact">
                      <span className="sm:hidden">Get a Quote</span>
                      <span className="hidden sm:inline">Get a Quote for {service.title}</span>
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl">
            Need Multiple Services?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Many projects require a combination of services. Contact us for a comprehensive 
            site evaluation and bundled quote for your complete project.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 sm:mt-8 bg-background text-foreground hover:bg-background/90 h-12 sm:h-11 text-[0.9375rem] sm:text-base transition-all duration-200 active:scale-[0.98]">
            <Link href="/contact">
              <span className="sm:hidden">Get a Free Quote</span>
              <span className="hidden sm:inline">Request a Site Evaluation</span>
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
