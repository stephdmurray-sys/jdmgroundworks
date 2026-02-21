"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Mike Johnson",
    location: "Bremerton, WA",
    project: "Residential Lot Clearing",
    rating: 5,
    text: "JDM Groundworks cleared our heavily wooded 2-acre lot in just 3 days. Professional crew, modern equipment, and the site looked perfect. They even helped us navigate the permitting process. Highly recommended!",
    date: "2 weeks ago"
  },
  {
    name: "Sarah Martinez",
    location: "Silverdale, WA",
    project: "Driveway & RV Pad",
    rating: 5,
    text: "We needed a new gravel driveway and RV pad built. They showed up on time, finished early, and the drainage work they did was exceptional. Our driveway hasn't had a single puddle even after heavy rains.",
    date: "1 month ago"
  },
  {
    name: "Tom & Lisa Chen",
    location: "Poulsbo, WA",
    project: "Site Preparation for New Home",
    rating: 5,
    text: "From tree removal to final grading, JDM handled our entire site prep. They worked seamlessly with our builder and stayed within budget. The attention to detail was impressive. Worth every penny.",
    date: "3 months ago"
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Client Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Homeowners & Builders Across Kitsap County
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            See why local property owners choose JDM Groundworks for their excavation and land clearing projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                
                <p className="text-foreground/90 leading-relaxed mb-6 text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary font-medium mt-1">{testimonial.project}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-foreground">
              <span className="font-bold text-primary">50+ projects</span> completed in 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
