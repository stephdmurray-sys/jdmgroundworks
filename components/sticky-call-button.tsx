"use client"

import { Phone } from "lucide-react"
import { useState, useEffect } from "react"

export function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <a
      href="tel:+13603557006"
      aria-label="Call JDM Groundworks at (360) 355-7006"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 touch-manipulation pb-[env(safe-area-inset-bottom)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <span className="flex h-14 w-14 sm:h-12 sm:w-auto items-center justify-center gap-2 rounded-full sm:rounded-lg sm:px-5 shadow-2xl bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground transition-all duration-200">
        <Phone className="h-6 w-6 sm:h-5 sm:w-5 shrink-0" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">Call (360) 355-7006</span>
      </span>
    </a>
  )
}
