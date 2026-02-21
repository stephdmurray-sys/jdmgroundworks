"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2 } from "lucide-react"

const services = [
  "Land Clearing",
  "Tree Removal",
  "Excavation",
  "Grading & Leveling",
  "Site Preparation",
  "Driveways & Pads",
  "Drainage & Erosion Control",
  "Multiple Services",
  "Other",
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-primary mx-auto" />
        <h3 className="mt-6 text-xl font-semibold text-card-foreground">
          Thank You for Your Request
        </h3>
        <p className="mt-2 text-muted-foreground">
          We have received your information and will contact you within 24 hours 
          to discuss your project and schedule a site evaluation.
        </p>
        <Button 
          className="mt-6 bg-transparent" 
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {/* Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="name" className="text-sm">Full Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Smith"
            autoComplete="name"
            className="bg-background h-12 sm:h-10 text-base"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="text-sm">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            autoComplete="email"
            inputMode="email"
            className="bg-background h-12 sm:h-10 text-base"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(360) 355-7006"
            autoComplete="tel"
            inputMode="tel"
            className="bg-background h-12 sm:h-10 text-base"
          />
        </div>

        {/* Property Location */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="location" className="text-sm">Property Location *</Label>
          <Input
            id="location"
            name="location"
            type="text"
            required
            placeholder="City or address in Kitsap County"
            autoComplete="address-level2"
            className="bg-background h-12 sm:h-10 text-base"
          />
        </div>
      </div>

      {/* Service Needed */}
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="service" className="text-sm">Service Needed *</Label>
        <Select name="service" required>
          <SelectTrigger className="bg-background h-12 sm:h-10 text-base">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service.toLowerCase().replace(/ /g, "-")} className="text-base py-3 min-h-[44px]">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Project Details */}
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="message" className="text-sm">Project Details</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Please describe your project, including property size, current conditions, timeline, and any specific requirements..."
          className="bg-background resize-none text-base min-h-[140px] leading-relaxed"
        />
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full h-12 sm:h-11 text-[0.9375rem] sm:text-base transition-all duration-200 active:scale-[0.98]" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <span className="sm:hidden">Get a Free Quote</span>
            <span className="hidden sm:inline">Request Free Site Evaluation</span>
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By submitting this form, you agree to be contacted regarding your project inquiry. 
        We respect your privacy and will never share your information.
      </p>
    </form>
  )
}
