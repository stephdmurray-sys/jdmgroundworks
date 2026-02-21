import Image from "next/image"
import { Shield, Clock, Award, Users } from "lucide-react"

const features = [
  {
    title: "Licensed & Insured",
    description: "Fully licensed Washington State contractor with comprehensive liability and workers compensation insurance.",
    icon: Shield,
  },
  {
    title: "Reliable & On Time",
    description: "We show up when we say we will and complete projects on schedule. Your time matters.",
    icon: Clock,
  },
  {
    title: "Quality Equipment",
    description: "Modern, well-maintained excavators, skid steers, and forestry equipment for efficient, quality work.",
    icon: Award,
  },
  {
    title: "Local Expertise",
    description: "Deep knowledge of Kitsap County terrain, soil conditions, permitting requirements, and local regulations.",
    icon: Users,
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-square order-2 lg:order-1">
            <Image
              src="/images/cleared-land.jpg"
              alt="Professionally cleared and graded land ready for construction"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why Choose JDM</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-background lg:text-4xl">
              Professional Results You Can Count On
            </h2>
            <p className="mt-4 text-base sm:text-lg text-background/70 leading-relaxed">
              With years of experience in Kitsap County, we understand the unique 
              challenges of Pacific Northwest land development. From steep slopes to 
              dense vegetation, we have the expertise and equipment to get the job done right.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature) => (
                <div key={feature.title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-background">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-sm text-background/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
