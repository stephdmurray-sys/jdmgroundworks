import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const services = [
  { name: "Land Clearing", href: "/services#land-clearing" },
  { name: "Tree Removal", href: "/services#tree-removal" },
  { name: "Building Demolition", href: "/services#demolition" },
  { name: "Excavation", href: "/services#excavation" },
  { name: "Grading & Leveling", href: "/services#grading" },
  { name: "Site Preparation", href: "/services#site-prep" },
  { name: "Driveways & Pads", href: "/services#driveways" },
  { name: "Drainage & Erosion Control", href: "/services#drainage" },
]

const serviceAreas = [
  "Bremerton",
  "Silverdale",
  "Poulsbo",
  "Port Orchard",
  "Bainbridge Island",
  "Seabeck",
  "Kingston",
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-14 lg:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Company Info */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/jdm-groundworks-logo.png"
                alt="JDM Groundworks"
                width={800}
                height={240}
                className="h-20 w-auto sm:h-24 lg:h-20"
              />
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mb-4 max-w-xs">
              Professional land clearing, excavation, building demolition, and site preparation services for Kitsap County, WA.
            </p>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <a href="tel:+13603557006" className="flex items-center gap-2 hover:text-background transition-colors active:text-background">
                <Phone className="h-4 w-4 shrink-0" />
                (360) 355-7006
              </a>
              <a href="mailto:info@jdmgroundworks.com" className="flex items-center gap-2 hover:text-background transition-colors active:text-background">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">info@jdmgroundworks.com</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Kitsap County, WA
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-background/70 hover:text-background transition-colors inline-block py-1 active:text-background"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Service Areas</h3>
            <ul className="space-y-1">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <Link
                    href="/service-area"
                    className="text-sm text-background/70 hover:text-background transition-colors inline-block py-1 active:text-background"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="text-sm text-background/70 hover:text-background transition-colors inline-block py-1 active:text-background">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-background/70 hover:text-background transition-colors inline-block py-1 active:text-background">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/service-area" className="text-sm text-background/70 hover:text-background transition-colors inline-block py-1 active:text-background">
                  Service Area
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-background/10">
              <p className="text-xs text-background/50 leading-relaxed">Licensed & Insured</p>
              <p className="text-xs text-background/50 mt-1">WA Contractor License #JDMGR*123AB</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-background/10">
          <p className="text-center text-xs text-background/50 leading-relaxed">
            {new Date().getFullYear()} JDM Groundworks. All rights reserved. Professional land clearing, excavation, building demolition, and site preparation services proudly serving Bremerton, Silverdale, Poulsbo, Port Orchard, Bainbridge Island, and all of Kitsap County, Washington.
          </p>
        </div>
      </div>
    </footer>
  )
}
