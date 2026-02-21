"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Service Area", href: "/service-area" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-foreground">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 sm:px-8 lg:px-12 lg:py-2">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/jdm-groundworks-logo.png"
            alt="JDM Groundworks - Land Clearing & Excavation Services"
            width={800}
            height={240}
            className="h-20 w-auto sm:h-24 md:h-28 lg:h-32"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-background/80 transition-colors hover:text-background"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:+13603557006"
            className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-lg text-sm font-semibold text-background hover:bg-background/15 transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            (360) 355-7006
          </a>
          <Button asChild className="bg-primary hover:bg-primary/90 font-semibold">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-lg p-2.5 text-background hover:bg-background/10 active:bg-background/20 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden bg-foreground border-t border-background/10 overflow-hidden transition-all duration-300 ease-in-out will-change-[max-height,opacity] ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-4 space-y-1">
          {navigation.map((item) => (
              <Link
              key={item.name}
              href={item.href}
              className="flex py-3.5 px-3 text-base font-medium text-background/80 hover:text-background hover:bg-background/5 rounded-lg transition-colors active:bg-background/10 min-h-[44px] items-center touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-background/10">
            <a
              href="tel:+13603557006"
              className="flex items-center gap-3 py-3.5 px-3 text-base font-medium text-background/80 hover:bg-background/5 rounded-lg transition-colors active:bg-background/10 min-h-[44px] touch-manipulation"
            >
              <Phone className="h-5 w-5 shrink-0" />
              (360) 355-7006
            </a>
            <Button asChild className="w-full mt-3 bg-primary hover:bg-primary/90 h-12 text-base font-medium active:scale-[0.98] touch-manipulation">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
