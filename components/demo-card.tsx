"use client"

import { highlightQuote } from "@/lib/highlight-quote"
import { extractKeywordsFromText } from "@/lib/extract-keywords-from-text"
import { Play } from "lucide-react"
import { useState } from "react"

interface DemoCardProps {
  quote: string
  name: string
  company: string
  relationship: string
  hasVoice?: boolean
  voiceDuration?: string
  traits?: string[]
}

export function DemoCard({ quote, name, company, relationship, hasVoice, voiceDuration, traits }: DemoCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  const keywords = extractKeywordsFromText(quote, traits || [])
  const highlightPatterns = keywords
    .filter((keyword) => typeof keyword === "string" && keyword.trim().length > 0)
    .map((keyword) => ({
      phrase: keyword,
      tier: "theme" as const,
      frequency: 1,
    }))

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Voice UI (if present) */}
      {hasVoice && (
        <div
          className="flex items-center gap-3 pb-2 border-b border-slate-100"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </button>
          <div className="flex-1 h-8 flex items-center gap-1">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 bg-slate-200 rounded-full transition-all duration-150 ${
                  isHovering ? "bg-blue-300" : ""
                }`}
                style={{
                  height: `${Math.random() * 24 + 8}px`,
                  transform: isHovering ? `scaleY(${0.8 + Math.random() * 0.4})` : "scaleY(1)",
                }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">{voiceDuration || "42s"}</span>
        </div>
      )}

      {/* Quote with inline highlights */}
      <p className="text-base text-slate-700 leading-relaxed">{highlightQuote(quote, highlightPatterns, 4)}</p>

      {/* Contributor info */}
      <div className="pt-2 space-y-1">
        <p className="text-sm font-medium text-slate-900">{name}</p>
        <p className="text-xs text-gray-400">
          {relationship} · {company}
        </p>
      </div>
    </div>
  )
}
