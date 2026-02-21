"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
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

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
    }`}>
      <Button
        size="lg"
        className="h-14 w-14 sm:h-auto sm:w-auto rounded-full sm:rounded-lg shadow-2xl bg-primary hover:bg-primary/90 text-white animate-pulse hover:animate-none flex items-center gap-2 sm:px-6"
      >
        <Phone className="h-6 w-6 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline font-semibold">Call Now: (360) 355-7006</span>
      </Button>
    </div>
  )
}
