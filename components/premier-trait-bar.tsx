"use client"

import { useState, useMemo } from "react"
import { ChevronDown, X, Sparkles } from "lucide-react"
import { isSavedFeedback, getAllTraits } from "@/types"

function safeArray<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr : []
}

function safeString(str: string | null | undefined): string {
  return typeof str === "string" ? str : ""
}

function safeNumber(num: number | null | undefined, fallback = 0): number {
  return typeof num === "number" && !isNaN(num) ? num : fallback
}

export function PremierTraitBar({ traits, selectedTraits, onTraitSelect, contributions }: any) {
  const [showAllTraits, setShowAllTraits] = useState(false)

  const safeTraits = safeArray(traits)
  const safeSelectedTraits = safeArray(selectedTraits)
  const safeContributions = safeArray(contributions)

  const totalContributions = safeContributions.length
  const writtenCount = safeContributions.filter((c) => !isSavedFeedback(c)).length
  const uploadsCount = safeContributions.filter((c) => isSavedFeedback(c)).length

  const traitCounts = useMemo(() => {
    return safeTraits.map((trait, idx) => ({
      trait: trait?.label || "",
      count: trait?.count || 0,
      confidence:
        (trait?.count || 0) >= 3 ? "High" : (trait?.count || 0) >= 2 ? "Med" : ("Low" as "High" | "Med" | "Low"),
      type: (idx < 6 ? "Top signal" : "Emerging") as "Top signal" | "Emerging",
    }))
  }, [safeTraits])

  const maxTraits = 6
  const visibleTraits = showAllTraits ? traitCounts : traitCounts.slice(0, maxTraits)
  const hiddenCount = Math.max(0, traitCounts.length - maxTraits)

  const matchCount = useMemo(() => {
    if (safeSelectedTraits.length === 0) return 0

    return safeContributions.filter((c) => {
      if (!c) return false
      const allTraits = getAllTraits(c)
      return safeSelectedTraits.some((selected) =>
        allTraits.some((t) => safeString(t).toLowerCase() === selected.toLowerCase()),
      )
    }).length
  }, [safeContributions, safeSelectedTraits])

  if (traitCounts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-sm font-semibold">Common themes people repeat</h3>
        </div>
        <p className="text-xs text-neutral-500">Ranked by how consistently they appear across perspectives</p>
        <p className="text-xs text-neutral-400">
          Based on {writtenCount} {writtenCount === 1 ? "contribution" : "contributions"}
          {uploadsCount > 0 && ` + ${uploadsCount} ${uploadsCount === 1 ? "upload" : "uploads"}`}
        </p>
      </div>

      {/* Trait pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {visibleTraits.map((item) => {
          if (!item || !item.trait) return null
          const isSelected = safeSelectedTraits.includes(item.trait)
          return (
            <button
              key={item.trait}
              onClick={() => onTraitSelect(item.trait)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
                border transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-300 text-blue-800 shadow-sm"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:shadow-sm"
                }
              `}
            >
              <span>{item.trait}</span>
              <span className={`text-xs ${isSelected ? "text-blue-600" : "text-neutral-400"}`}>{item.count}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  item.type === "Top signal" ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {item.type}
              </span>
              {isSelected && <X className="w-3 h-3 ml-0.5" />}
            </button>
          )
        })}
      </div>

      {/* View all toggle */}
      {hiddenCount > 0 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllTraits(!showAllTraits)}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAllTraits ? "Show less" : `View all ${traitCounts.length} traits`}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllTraits ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      {/* Match count & clear */}
      {safeSelectedTraits.length > 0 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-neutral-600">
            {matchCount} {matchCount === 1 ? "match" : "matches"}
          </span>
          <button
            onClick={() => safeSelectedTraits.forEach((t) => onTraitSelect(t))}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
