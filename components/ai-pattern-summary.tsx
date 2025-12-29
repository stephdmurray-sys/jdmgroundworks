"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export type TraitSignal = { label: string; count: number }

interface Contribution {
  id: string
  written_note: string
  relationship: string
}

interface ImportedFeedback {
  id: string
  ocr_text: string | null
  ai_extracted_excerpt: string | null
  traits: string[] | null
  included_in_analysis: boolean
}

interface AiPatternSummaryProps {
  contributions: Contribution[]
  importedFeedback: ImportedFeedback[]
  topTraits: TraitSignal[]
  firstName?: string
  contributionsCount: number
}

export function AiPatternSummary({
  contributions,
  importedFeedback,
  topTraits,
  firstName = "this person",
  contributionsCount,
}: AiPatternSummaryProps) {
  const [summary, setSummary] = useState<{
    synthesis: string
    patterns: string[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    generateSummary()
  }, [contributions, importedFeedback, topTraits, firstName, contributionsCount])

  const generateSummary = () => {
    if (contributionsCount === 0) {
      setIsLoading(false)
      return
    }

    if (topTraits.length === 0) {
      // Even with no traits, generate a basic summary if we have contributions
      setSummary({
        synthesis: `${firstName} is building their professional reputation with early feedback.`,
        patterns: [],
      })
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    const traits = topTraits.slice(0, 3)
    let synthesis = ""

    if (contributionsCount === 1) {
      if (traits.length >= 2) {
        synthesis = `Early signal from 1 person: ${firstName} comes through as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}${traits.length >= 3 ? `, and ${traits[2].label.toLowerCase()}` : ""}.`
      } else if (traits.length === 1) {
        synthesis = `Early signal from 1 person: ${firstName} comes through as ${traits[0].label.toLowerCase()}.`
      }
    } else if (contributionsCount === 2) {
      if (traits.length >= 2) {
        synthesis = `So far, ${firstName} comes through as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}${traits.length >= 3 ? `, with emphasis on ${traits[2].label.toLowerCase()}` : ""}.`
      } else if (traits.length === 1) {
        synthesis = `So far, ${firstName} comes through as ${traits[0].label.toLowerCase()}.`
      }
    } else if (contributionsCount >= 3 && contributionsCount < 5) {
      if (traits.length >= 3) {
        synthesis = `People describe working with ${firstName} as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}, with emphasis on ${traits[2].label.toLowerCase()}.`
      } else if (traits.length === 2) {
        synthesis = `People describe working with ${firstName} as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}.`
      } else if (traits.length === 1) {
        synthesis = `People describe working with ${firstName} as ${traits[0].label.toLowerCase()}.`
      }
    } else {
      // contributionsCount >= 5: Use "consistently"
      if (traits.length >= 3) {
        synthesis = `People consistently describe working with ${firstName} as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}, with emphasis on ${traits[2].label.toLowerCase()}.`
      } else if (traits.length === 2) {
        synthesis = `People consistently describe working with ${firstName} as ${traits[0].label.toLowerCase()} and ${traits[1].label.toLowerCase()}.`
      } else if (traits.length === 1) {
        synthesis = `People consistently describe working with ${firstName} as ${traits[0].label.toLowerCase()}.`
      }
    }

    const patterns = traits.map((t) => t.label)

    setSummary({
      synthesis,
      patterns: patterns.slice(0, 3),
    })

    setIsLoading(false)
  }

  if (isLoading && contributionsCount > 0) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-24 bg-neutral-100 rounded-lg"></div>
        <div className="h-8 bg-neutral-100 rounded-lg w-1/2"></div>
      </div>
    )
  }

  if (!summary || contributionsCount === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        <p className="text-lg">Summary will appear once contributions are received.</p>
      </div>
    )
  }

  const needsExpand = summary.synthesis.length > 240

  return (
    <div className="space-y-6">
      <div className="relative">
        <p
          className={`text-neutral-700 leading-relaxed text-base sm:text-lg md:text-xl transition-all duration-300 ${
            !isExpanded && needsExpand ? "line-clamp-2" : ""
          }`}
          style={{ lineHeight: "1.7" }}
        >
          {summary.synthesis}
        </p>

        {needsExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-medium"
          >
            {isExpanded ? "Read less" : "Read more"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {summary.patterns.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Most mentioned signals</p>
          <div className="flex flex-wrap gap-3">
            {summary.patterns.map((pattern, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 transition-all duration-200 ease-out cursor-default hover:scale-105 hover:shadow-md hover:shadow-blue-100/50 hover:bg-blue-100 hover:border-blue-200"
              >
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
