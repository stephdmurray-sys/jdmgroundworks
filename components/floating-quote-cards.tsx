"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReportButton } from "@/components/report-button"
import { IntimateAudioPlayer } from "@/components/intimate-audio-player"
import { Share2 } from "lucide-react"
import { highlightQuote } from "@/lib/highlight-quote"
import { extractKeywordsFromText } from "@/lib/extract-keywords-from-text"
import type { HighlightPattern } from "@/lib/extract-highlight-patterns"

function safeArray<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr : []
}

function safeString(str: string | null | undefined): string {
  return typeof str === "string" ? str : ""
}

interface FloatingQuoteCardsProps {
  contributions: any[]
  selectedPhrase?: string | null
  selectedRelationship?: string | null
  selectedTraits?: string[]
  hoveredTrait?: string | null
  profileName?: string
  isFeatured?: boolean
  isFirstInGroup?: boolean
  groupIndex?: number
  highlightPatterns?: HighlightPattern[]
}

export function FloatingQuoteCards({
  contributions,
  selectedPhrase,
  selectedRelationship,
  selectedTraits = [],
  hoveredTrait = null,
  profileName = "this professional",
  isFeatured = false,
  isFirstInGroup = false,
  groupIndex = 0,
  highlightPatterns = [],
}: FloatingQuoteCardsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const safeContributions = safeArray(contributions).filter((c) => c != null)

  const handleShareQuote = (contribution: any, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!contribution) return

    const quote = safeString(contribution.written_note).split(".")[0] + "."
    const author = safeString(contribution.contributor_name)
    const role =
      safeString(contribution.contributor_role) || getRelationshipLabel(safeString(contribution.relationship))
    const company = safeString(contribution.contributor_company)

    const shareText = `"${quote}"\n\n— ${author}${role ? `, ${role}` : ""}${company ? ` at ${company}` : ""}\n\nvia ${profileName}'s Nomee profile`

    if (navigator.share) {
      navigator
        .share({
          title: `Feedback for ${profileName}`,
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
      alert("Quote copied to clipboard!")
    }
  }

  const filteredContributions = safeContributions.filter((contribution) => {
    if (!contribution) return false

    if (selectedPhrase) {
      const text = safeString(contribution.written_note).toLowerCase()
      if (!text.includes(selectedPhrase.toLowerCase())) return false
    }

    if (selectedRelationship && selectedRelationship !== "All") {
      const relationship = safeString(contribution.relationship).toLowerCase()
      const filter = selectedRelationship.toLowerCase()

      if (filter === "clients" && !relationship.includes("client")) return false
      if (filter === "peers" && !relationship.includes("peer") && !relationship.includes("together")) return false
      if (filter === "managers" && !relationship.includes("manager")) return false
      if (filter === "partners" && !relationship.includes("partner")) return false
    }

    if (selectedTraits.length > 0) {
      const allTraits = [
        ...safeArray(contribution.traits_category1),
        ...safeArray(contribution.traits_category2),
        ...safeArray(contribution.traits_category3),
        ...safeArray(contribution.traits_category4),
      ]
      const hasSelectedTrait = selectedTraits.some((trait) => allTraits.includes(trait))
      if (!hasSelectedTrait) return false
    }

    return true
  })

  const getRelationshipLabel = (relationship: string) => {
    const rel = safeString(relationship).toLowerCase()
    if (rel.includes("client")) return "Client"
    if (rel.includes("manager") || rel.includes("managed")) return "Manager"
    if (rel.includes("direct report") || rel.includes("report")) return "Direct Report"
    if (rel.includes("peer") || rel.includes("together")) return "Peer"
    if (rel.includes("partner")) return "Partner"
    if (rel.includes("vendor")) return "Vendor"
    return "Other"
  }

  const truncateToSentences = (text: string, maxSentences = 2) => {
    const safeText = safeString(text)
    if (!safeText) return ""
    const sentences = safeText.match(/[^.!?]+[.!?]+/g) || [safeText]
    if (sentences.length <= maxSentences) return safeText
    return sentences.slice(0, maxSentences).join(" ").trim()
  }

  const contributionMatchesHoveredTrait = (contribution: any) => {
    if (!contribution) return false
    if (!hoveredTrait) return true
    const allTraits = [
      ...safeArray(contribution.traits_category1),
      ...safeArray(contribution.traits_category2),
      ...safeArray(contribution.traits_category3),
      ...safeArray(contribution.traits_category4),
    ]
    return allTraits.includes(hoveredTrait)
  }

  const getCardTint = (index: number) => {
    const tints = [
      null,
      "rgba(250, 247, 243, 0.06)",
      null,
      "rgba(244, 247, 251, 0.06)",
      null,
      "rgba(246, 250, 247, 0.06)",
    ]
    return tints[index % tints.length]
  }

  if (safeContributions.length === 0) {
    return null
  }

  return (
    <>
      {/* Desktop: Unified grid with featured card spanning 2 columns */}
      <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-4">
        {safeContributions.map((contribution: any, index: number) => {
          if (!contribution) return null

          const isExpanded = expandedId === contribution.id
          const matchesHovered = contributionMatchesHoveredTrait(contribution)
          const staggerDelay = index * 0.03
          const cardTint = getCardTint(index)

          const allTraits = [
            ...safeArray(contribution.traits_category1),
            ...safeArray(contribution.traits_category2),
            ...safeArray(contribution.traits_category3),
            ...safeArray(contribution.traits_category4),
          ]

          const hasVoice = !!contribution.audio_url || !!contribution.voice_url

          const writtenNote = safeString(contribution.written_note)
          const displayText = isExpanded ? writtenNote : truncateToSentences(writtenNote, 3)

          const cardPatterns = extractKeywordsFromText(writtenNote, allTraits)

          const renderedText = displayText ? highlightQuote(displayText, cardPatterns, 5) : displayText

          return (
            <motion.div
              key={contribution.id || `contrib-${index}`}
              id={`quote-${contribution.id || index}`}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: matchesHovered ? 1 : 0.4,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
              }}
              className="cursor-pointer group relative break-inside-avoid mb-4"
              onClick={() => setExpandedId(isExpanded ? null : contribution.id)}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleShareQuote(contribution, e)}
                className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                title="Share this quote"
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Card
                className="bg-white p-6 border border-neutral-200 shadow-sm hover:shadow-lg rounded-2xl transition-all duration-300 hover:border-neutral-300"
                style={{ backgroundColor: cardTint || "white" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--trust-blue-hover)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = cardTint || "white"
                }}
              >
                {(contribution.voice_url || contribution.audio_url) && (
                  <div className="mb-4 pb-4 border-b border-neutral-100">
                    <IntimateAudioPlayer audioUrl={contribution.voice_url || contribution.audio_url} />
                  </div>
                )}

                {writtenNote && (
                  <p
                    className="text-sm md:text-base leading-relaxed text-neutral-700 mb-4 max-w-[72ch]"
                    style={{ lineHeight: "1.6" }}
                  >
                    {renderedText}
                  </p>
                )}

                {allTraits.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-neutral-100">
                    {allTraits.map((trait, traitIdx) => (
                      <Badge
                        key={`${trait}-${traitIdx}`}
                        variant="outline"
                        className="text-xs bg-neutral-50 text-neutral-600 border-neutral-200"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-neutral-900">
                      {safeString(contribution.contributor_name)}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {getRelationshipLabel(contribution.relationship)}
                      {contribution.relationship_context && (
                        <span className="text-neutral-600"> · {contribution.relationship_context}</span>
                      )}
                      {!contribution.relationship_context &&
                        contribution.contributor_company &&
                        contribution.contributor_company !== "Unknown" && (
                          <span className="text-neutral-400"> · {contribution.contributor_company}</span>
                        )}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ReportButton contributionId={contribution.id} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile: Horizontal scroll carousel with snap */}
      <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
        <div className="flex gap-4 pb-4">
          {safeContributions.map((contribution: any, index: number) => {
            if (!contribution) return null

            const isExpanded = expandedId === contribution.id
            const matchesHovered = contributionMatchesHoveredTrait(contribution)
            const cardTint = getCardTint(index)

            const allTraits = [
              ...safeArray(contribution.traits_category1),
              ...safeArray(contribution.traits_category2),
              ...safeArray(contribution.traits_category3),
              ...safeArray(contribution.traits_category4),
            ]

            const hasVoice = !!contribution.audio_url || !!contribution.voice_url

            const writtenNote = safeString(contribution.written_note)
            const displayText = isExpanded ? writtenNote : truncateToSentences(writtenNote, 3)

            const cardPatterns = extractKeywordsFromText(writtenNote, allTraits)

            const renderedText = displayText ? highlightQuote(displayText, cardPatterns, 5) : displayText

            return (
              <motion.div
                key={contribution.id || `mobile-contrib-${index}`}
                className="snap-center flex-shrink-0 w-[85vw] max-w-md cursor-pointer group relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: matchesHovered ? 1 : 0.4,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setExpandedId(isExpanded ? null : contribution.id)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleShareQuote(contribution, e)}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
                  title="Share this quote"
                >
                  <Share2 className="h-4 w-4" />
                </Button>

                <Card
                  className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-neutral-300"
                  style={{ backgroundColor: cardTint || "white" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--trust-blue-hover)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = cardTint || "white"
                  }}
                >
                  {(contribution.voice_url || contribution.audio_url) && (
                    <div className="mb-4 pb-4 border-b border-neutral-100">
                      <IntimateAudioPlayer audioUrl={contribution.voice_url || contribution.audio_url} />
                    </div>
                  )}

                  {writtenNote && (
                    <p
                      className="text-sm md:text-base leading-relaxed text-neutral-700 mb-4 max-w-[72ch]"
                      style={{ lineHeight: "1.6" }}
                    >
                      {renderedText}
                    </p>
                  )}

                  {allTraits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-neutral-100">
                      {allTraits.map((trait, traitIdx) => (
                        <Badge
                          key={`${trait}-${traitIdx}`}
                          variant="outline"
                          className="text-xs bg-neutral-50 text-neutral-600 border-neutral-200"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-neutral-900">
                        {safeString(contribution.contributor_name)}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {getRelationshipLabel(contribution.relationship)}
                        {contribution.relationship_context && (
                          <span className="text-neutral-600"> · {contribution.relationship_context}</span>
                        )}
                        {!contribution.relationship_context &&
                          contribution.contributor_company &&
                          contribution.contributor_company !== "Unknown" && (
                            <span className="text-neutral-400"> · {contribution.contributor_company}</span>
                          )}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ReportButton contributionId={contribution.id} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
