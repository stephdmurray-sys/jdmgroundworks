"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export type TraitSignal = { label: string; count: number }
export type VibeSignal = { label: string; count: number }

interface AiPatternSummaryProps {
  analysisText: string
  traitSignals: TraitSignal[]
  vibeSignals: VibeSignal[]
  firstName?: string
  contributionsCount: number
}

export function AiPatternSummary({
  analysisText,
  traitSignals,
  vibeSignals,
  firstName = "this person",
  contributionsCount,
}: AiPatternSummaryProps) {
  const [summary, setSummary] = useState<{
    synthesis: string
    patterns: Array<{ label: string; type: "trait" | "vibe" }>
  } | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    generateSummary()
  }, [analysisText, traitSignals, vibeSignals, firstName, contributionsCount])

  const generateSummary = () => {
    const hasTraits = traitSignals.length > 0
    const hasVibes = vibeSignals.length > 0
    const hasText = analysisText.length >= 40

    if (!hasTraits && !hasVibes && !hasText) {
      setSummary(null)
      return
    }

    const patterns: Array<{ label: string; type: "trait" | "vibe" }> = []

    // Prefer traits for pills, then fill with vibes
    traitSignals.slice(0, 3).forEach((t) => {
      patterns.push({ label: t.label, type: "trait" })
    })

    if (patterns.length < 3) {
      vibeSignals.slice(0, 3 - patterns.length).forEach((v) => {
        patterns.push({ label: v.label, type: "vibe" })
      })
    }

    let synthesis = ""
    const topThreeTraits = traitSignals.slice(0, 3)

    if (topThreeTraits.length > 0) {
      if (contributionsCount === 1) {
        if (topThreeTraits.length >= 2) {
          synthesis = `Early feedback describes ${firstName} as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}${topThreeTraits.length >= 3 ? `, with a ${topThreeTraits[2].label.toLowerCase()} approach` : ""}.`
        } else {
          synthesis = `Early feedback describes ${firstName} as ${topThreeTraits[0].label.toLowerCase()}.`
        }
      } else if (contributionsCount === 2) {
        if (topThreeTraits.length >= 2) {
          synthesis = `So far, ${firstName} comes through as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}${topThreeTraits.length >= 3 ? `, with emphasis on ${topThreeTraits[2].label.toLowerCase()}` : ""}.`
        } else {
          synthesis = `So far, ${firstName} comes through as ${topThreeTraits[0].label.toLowerCase()}.`
        }
      } else if (contributionsCount >= 3 && contributionsCount < 5) {
        if (topThreeTraits.length >= 3) {
          synthesis = `People describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}, with a strong emphasis on ${topThreeTraits[2].label.toLowerCase()}.`
        } else if (topThreeTraits.length === 2) {
          synthesis = `People describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}.`
        } else {
          synthesis = `People describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()}.`
        }
      } else if (contributionsCount >= 5) {
        if (topThreeTraits.length >= 3) {
          synthesis = `People consistently describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}, with a strong emphasis on ${topThreeTraits[2].label.toLowerCase()}.`
        } else if (topThreeTraits.length === 2) {
          synthesis = `People consistently describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()} and ${topThreeTraits[1].label.toLowerCase()}.`
        } else {
          synthesis = `People consistently describe working with ${firstName} as ${topThreeTraits[0].label.toLowerCase()}.`
        }
      }
    } else if (hasVibes && vibeSignals.length > 0) {
      const topVibes = vibeSignals.slice(0, 2)
      if (topVibes.length >= 2) {
        synthesis = `Working with ${firstName} feels ${topVibes[0].label.toLowerCase()} and ${topVibes[1].label.toLowerCase()}.`
      } else {
        synthesis = `Working with ${firstName} feels ${topVibes[0].label.toLowerCase()}.`
      }
    } else if (hasText) {
      synthesis = `${firstName} is gathering feedback to build their professional reputation.`
    }

    setSummary({
      synthesis,
      patterns,
    })
  }

  if (!summary) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <p className="text-base leading-relaxed">Summary will appear once feedback or highlights are added.</p>
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
            {summary.patterns.map((pattern, index) => {
              let displayText = ""

              if (pattern.type === "trait") {
                const prefixes = ["Known for being", "Reputation for", "Recognized for"]
                const prefix = prefixes[index % prefixes.length]
                displayText =
                  index === 1
                    ? `${prefix} ${pattern.label.toLowerCase()} work`
                    : index === 2
                      ? `${prefix} ${pattern.label.toLowerCase()} approach`
                      : `${prefix} ${pattern.label.toLowerCase()}`
              } else {
                displayText = `Brings a ${pattern.label.toLowerCase()} energy`
              }

              return (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 transition-all duration-200 ease-out cursor-default hover:scale-105 hover:shadow-md hover:shadow-blue-100/50 hover:bg-blue-100 hover:border-blue-200"
                >
                  {displayText}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
