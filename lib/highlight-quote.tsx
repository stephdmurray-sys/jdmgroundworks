import type React from "react"
import type { HighlightPattern } from "./extract-highlight-patterns"

const IMPACT_PHRASES = [
  "increased",
  "grew",
  "drove",
  "improved",
  "exceeded",
  "highest",
  "revenue",
  "conversion",
  "engagement",
  "launched",
  "delivered",
  "saved",
  "reduced",
  "shipped",
  "led",
  "scaled",
  "promoted",
  "generated",
  "boosted",
  "accelerated",
  "transformed",
  "streamlined",
  "optimized",
  "pioneered",
  "achieved",
  "tripled",
  "doubled",
  "quadrupled",
  "outperformed",
  "surpassed",
]

export function highlightQuote(
  text: string,
  patterns: HighlightPattern[],
  maxHighlights = 8,
  enableTwoTone = true,
  useMarkerStyle = true, // New: use premium marker style
): React.ReactNode {
  if (!text || patterns.length === 0) return text

  const validPatterns = patterns.filter((p) => p && typeof p.phrase === "string" && p.phrase.trim().length > 0)

  if (validPatterns.length === 0) return text

  // Build all matches including trait patterns (yellow marker) and impact patterns (yellow highlight)
  const matches: { phrase: string; index: number; length: number; tier: string; color: "marker" | "impact" }[] = []

  // Find trait matches (yellow marker highlights)
  validPatterns.forEach((pattern) => {
    const regex = new RegExp(`\\b${pattern.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        phrase: match[0],
        index: match.index,
        length: match[0].length,
        tier: pattern.tier,
        color: "marker",
      })
    }
  })

  // Find impact phrase matches (subtle impact highlights) if two-tone enabled
  if (enableTwoTone) {
    // Match numbers/percentages
    const numberRegex = /\b(\d+%|\$[\d,]+|\d+x|\d+\s*(weeks?|months?|days?|years?|hours?))\b/gi
    let numMatch
    while ((numMatch = numberRegex.exec(text)) !== null) {
      matches.push({
        phrase: numMatch[0],
        index: numMatch.index,
        length: numMatch[0].length,
        tier: "impact",
        color: "impact",
      })
    }

    // Match impact verbs
    IMPACT_PHRASES.forEach((phrase) => {
      const regex = new RegExp(`\\b${phrase}\\b`, "gi")
      let match
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          phrase: match[0],
          index: match.index,
          length: match[0].length,
          tier: "impact",
          color: "impact",
        })
      }
    })
  }

  if (matches.length === 0) return text

  // Sort by tier priority (marker > impact) and then by position
  matches.sort((a, b) => {
    // Marker (traits) take priority over impact
    if (a.color !== b.color) {
      return a.color === "marker" ? -1 : 1
    }
    const tierOrder = { theme: 0, "working-style": 1, contextual: 2, impact: 3 }
    if (a.tier !== b.tier) {
      return tierOrder[a.tier as keyof typeof tierOrder] - tierOrder[b.tier as keyof typeof tierOrder]
    }
    return a.index - b.index
  })

  // Remove overlaps, prioritizing marker highlights
  const nonOverlapping: typeof matches = []
  let lastEnd = 0
  let markerCount = 0
  let impactCount = 0
  const maxMarker = Math.min(maxHighlights, 5) // 3-5 marker highlights
  const maxImpact = 3 // Cap impact highlights at 3

  for (const match of matches) {
    if (match.index >= lastEnd) {
      if (match.color === "marker" && markerCount >= maxMarker) continue
      if (match.color === "impact" && impactCount >= maxImpact) continue

      nonOverlapping.push(match)
      lastEnd = match.index + match.length

      if (match.color === "marker") markerCount++
      else impactCount++
    }
  }

  if (nonOverlapping.length === 0) return text

  // Re-sort by position for building the output
  nonOverlapping.sort((a, b) => a.index - b.index)

  // Build the highlighted text with appropriate CSS classes
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  nonOverlapping.forEach((match, idx) => {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const className = useMarkerStyle
      ? match.color === "marker"
        ? "nomee-highlight-marker"
        : "nomee-highlight-impact"
      : match.color === "marker"
        ? "nomee-highlight"
        : "nomee-highlight-impact"

    parts.push(
      <span
        key={`highlight-${idx}`}
        className={className}
        title={match.tier !== "impact" ? `Signal: ${match.tier}` : undefined}
      >
        {match.phrase}
      </span>,
    )

    lastIndex = match.index + match.length
  })

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}
