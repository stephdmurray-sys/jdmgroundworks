"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What areas do you serve for excavation and land clearing?",
    answer: "JDM Groundworks provides professional excavation and land clearing services throughout Kitsap County, Washington. We serve Bremerton, Silverdale, Poulsbo, Port Orchard, Seabeck, and all surrounding rural areas. Our local expertise means we understand the unique terrain, soil conditions, and permitting requirements specific to Kitsap County properties."
  },
  {
    question: "How much does it cost to build a gravel driveway in Kitsap County?",
    answer: "Gravel driveway costs in Kitsap County typically range from $2,500 to $8,000 depending on length, width, base preparation requirements, and drainage needs. The Pacific Northwest climate requires proper base compaction and drainage to prevent washouts. We provide free estimates that include all materials, grading, base prep, and gravel installation."
  },
  {
    question: "Can you build an RV pad or parking area for my boat?",
    answer: "Yes! We specialize in RV pad and boat parking area construction throughout Kitsap County. We'll excavate, grade, and compact a stable base, install proper drainage, and surface with gravel or crushed rock. RV pads typically range from 12x40 feet to 14x50 feet depending on your RV size. We also build equipment storage pads and additional parking areas."
  },
  {
    question: "Do you offer building demolition services?",
    answer: "Yes, JDM Groundworks provides professional demolition services for residential and light commercial structures throughout Kitsap County. We demolish and remove old houses, barns, sheds, garages, carports, mobile homes, and other structures. Our services include complete teardown, foundation and slab removal, debris hauling, and site grading after demolition so your property is clean and ready for new construction or landscaping."
  },
  {
    question: "Do you offer tree removal and stump grinding services?",
    answer: "Absolutely. JDM Groundworks provides complete tree removal services including stump grinding and debris removal for properties in Bremerton, Silverdale, Poulsbo, and throughout Kitsap County. We safely remove trees of all sizes, grind stumps below grade, and can chip or haul away all debris. This service is often combined with land clearing for new construction sites."
  },
  {
    question: "How much does land clearing cost in Kitsap County?",
    answer: "The cost of land clearing varies based on several factors including lot size, vegetation density, terrain difficulty, and disposal requirements. Most residential land clearing projects in Kitsap County range from $3,000 to $15,000. We provide free site evaluations and detailed quotes so you know exactly what to expect before we begin work."
  },
  {
    question: "Do I need permits for excavation or land clearing in Kitsap County?",
    answer: "Permit requirements depend on the scope of work, property location, and local regulations. Many land clearing and excavation projects in Kitsap County require permits, especially for grading, drainage work, or tree removal in critical areas. We can help guide you through the permitting process and ensure your project meets all local requirements."
  },
  {
    question: "What's included in your site preparation services?",
    answer: "Our comprehensive site preparation includes land clearing, tree removal, stump grinding, rough grading, access road or driveway construction, drainage planning, and final grading to create a construction-ready building pad. We work with homeowners, builders, and developers throughout Kitsap County to deliver turnkey sites ready for foundation work."
  },
  {
    question: "Can you install French drains or fix drainage problems?",
    answer: "Yes, drainage solutions are a key service we provide. Kitsap County's heavy rainfall requires proper drainage systems. We install French drains, catch basins, culverts, and surface drainage to direct water away from foundations, driveways, and yards. We can assess and fix existing drainage issues or design new systems for your property."
  },
  {
    question: "Are you licensed and insured for excavation work?",
    answer: "Yes, JDM Groundworks is fully licensed and insured for all excavation, land clearing, and groundworks services in Washington State. We maintain comprehensive liability insurance and workers' compensation coverage to protect both our crew and your property during every project."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Common questions about our excavation and land clearing services in Kitsap County
            </p>
          </div>

          <div className="mt-10 sm:mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-muted/50 transition-colors touch-manipulation min-h-[56px]"
                >
                  <span className="text-base sm:text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
