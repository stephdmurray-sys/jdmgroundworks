import { Award, Clock, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "200+",
    label: "Satisfied Clients",
    description: "Homeowners & builders trust us"
  },
  {
    icon: TrendingUp,
    value: "500+",
    label: "Acres Cleared",
    description: "In Kitsap County alone"
  },
  {
    icon: Clock,
    value: "24hr",
    label: "Response Time",
    description: "Free quotes within one day"
  },
  {
    icon: Award,
    value: "10+",
    label: "Years Experience",
    description: "Local excavation experts"
  },
]

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-foreground leading-7 font-thin">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 mb-12 sm:mb-16 text-sm sm:text-base text-background/90">
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-background shrink-0 shadow-sm" />
            <span className="whitespace-nowrap font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-background shrink-0 shadow-sm" />
            <span className="whitespace-nowrap font-medium">Free Estimates</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background mb-2">
                {stat.value}
              </p>
              <p className="text-base sm:text-lg font-semibold text-background/90 mb-1">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm text-background/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
