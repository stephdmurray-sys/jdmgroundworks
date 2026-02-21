import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Free Estimates for Excavation & Land Clearing",
  description: "Get a free site evaluation and quote for excavation, land clearing, or site preparation in Kitsap County, WA. Call (360) 355-7006 or request a quote online. Serving Bremerton, Silverdale, Poulsbo & Port Orchard.",
  keywords: [
    "free excavation estimate Kitsap County",
    "land clearing quote Bremerton",
    "excavation contractor contact",
    "site evaluation Kitsap WA",
    "request excavation quote"
  ],
  openGraph: {
    title: "Contact JDM Groundworks | Free Site Evaluation & Estimates",
    description: "Request a free site evaluation and quote for excavation and land clearing services in Kitsap County.",
    url: "https://jdmgroundworks.com/contact",
  },
  alternates: {
    canonical: "https://jdmgroundworks.com/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-foreground py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact Us</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-background lg:text-5xl">
              Request a Free Site Evaluation
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
              Ready to start your project? Contact us for a free site evaluation and 
              detailed quote. We respond to all inquiries within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Get in Touch
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Have questions or ready to get started? Reach out by phone, email, 
                or fill out the form and we will get back to you promptly.
              </p>

              <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
                <a href="tel:+13603557006" className="flex gap-3 sm:gap-4 p-3 -mx-3 rounded-lg hover:bg-secondary transition-colors active:bg-secondary/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Phone</h3>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      (360) 355-7006
                    </span>
                  </div>
                </a>

                <a href="mailto:info@jdmgroundworks.com" className="flex gap-3 sm:gap-4 p-3 -mx-3 rounded-lg hover:bg-secondary transition-colors active:bg-secondary/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Email</h3>
                    <span className="text-sm sm:text-base text-muted-foreground break-all">
                      info@jdmgroundworks.com
                    </span>
                  </div>
                </a>

                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Service Area</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Kitsap County, Washington
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Hours</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Monday - Friday: 7am - 5pm<br />
                      Saturday: By appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Why Choose JDM</h3>
                <ul className="space-y-2.5 sm:space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Licensed & Insured
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Free Site Evaluations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    24-Hour Quote Response
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Local Kitsap County Experts
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-card border border-border rounded-lg p-5 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-card-foreground mb-5 sm:mb-6">
                  Request a Quote
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Info Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Serving All of Kitsap County
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We provide land clearing, excavation, and groundworks services throughout 
              Kitsap County including Bremerton, Silverdale, Poulsbo, Port Orchard, 
              Seabeck, and surrounding areas.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["Bremerton", "Silverdale", "Poulsbo", "Port Orchard", "Seabeck"].map((area) => (
                <span key={area} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-full text-xs sm:text-sm text-muted-foreground">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
