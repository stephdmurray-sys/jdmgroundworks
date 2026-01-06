"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Plus, Upload, Users, BarChart3, Settings, Share2, Menu, X, Star } from "lucide-react"
import { useScrollToTop } from "@/lib/use-scroll-to-top"

type SidebarProps = {
  activePage?: string
  plan?: string
}

export function DashboardSidebar({ activePage = "home", plan = "free" }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollToTop = useScrollToTop()

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white min-h-screen transition-all duration-300 flex flex-col fixed left-0 top-0 z-50`}
    >
      <div className="p-6 flex items-center justify-between">
        {sidebarOpen && (
          <Link href="/" className="text-2xl font-bold" onClick={scrollToTop}>
            Nomee
          </Link>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-3">
        {[
          { id: "home", icon: Home, label: "Dashboard", href: "/dashboard" },
          { id: "request", icon: Plus, label: "Request Feedback", href: "/dashboard" },
          { id: "saved", icon: Upload, label: "Saved Feedback", href: "/dashboard/imported-feedback/upload" },
          { id: "contributors", icon: Users, label: "Contributors", href: "/dashboard" },
          { id: "insights", icon: BarChart3, label: "Insights", href: "/dashboard" },
          { id: "share", icon: Share2, label: "Share & Embed", href: "/dashboard" },
          { id: "settings", icon: Settings, label: "Settings", href: "/dashboard/settings" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={scrollToTop}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
              activePage === item.id ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        {sidebarOpen ? (
          <div>
            <div className="text-xs text-gray-500 mb-2">YOUR PLAN</div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3">
              <div className="text-sm font-semibold capitalize">{plan} Plan</div>
              <div className="text-xs text-indigo-100">
                {plan === "free" ? "Free" : plan === "starter" ? "$15.99/month" : "$29.99/month"}
              </div>
              <Link href="/pricing" className="text-xs underline mt-2 block" onClick={scrollToTop}>
                Manage plan
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}
