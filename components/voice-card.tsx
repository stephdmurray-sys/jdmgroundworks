"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { IntimateAudioPlayer } from "./intimate-audio-player"
import { highlightQuote } from "@/lib/highlight-quote"
import { extractKeywordsFromText } from "@/lib/extract-keywords-from-text"
import type { HighlightPattern } from "@/lib/extract-highlight-patterns"

interface VoiceCardProps {
  contribution: {
    id: string
    contributor_name: string
    contributor_company?: string | null
    relationship?: string | null
    voice_url?: string | null
    audio_duration_ms?: number | null
    written_note?: string | null
    traits_category1?: string[] | null
    traits_category2?: string[] | null
    traits_category3?: string[] | null
    traits_category4?: string[] | null
  }
  isMobile?: boolean
  highlightPatterns?: HighlightPattern[]
}

export function VoiceCard({ contribution, isMobile = false, highlightPatterns = [] }: VoiceCardProps) {
  const [showFullTranscript, setShowFullTranscript] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const allTraits = [
    ...(contribution.traits_category1 || []),
    ...(contribution.traits_category2 || []),
    ...(contribution.traits_category3 || []),
    ...(contribution.traits_category4 || []),
  ]

  const effectivePatterns = extractKeywordsFromText(contribution.written_note || "", allTraits)
  console.log(
    "[v0] Voice card",
    contribution.id,
    "- extracted",
    effectivePatterns.length,
    "patterns:",
    effectivePatterns.map((p) => p.phrase),
  )

  const truncateToSentences = (text: string, maxSentences = 2) => {
    if (!text) return ""
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    if (sentences.length <= maxSentences) return text
    return sentences.slice(0, maxSentences).join(" ").trim()
  }

  const previewText = truncateToSentences(contribution.written_note || "", 2)
  const fullText = contribution.written_note || ""
  const hasMoreText = fullText.length > previewText.length

  // Apply highlighting to both preview and full text
  const highlightedPreview = previewText ? highlightQuote(previewText, effectivePatterns, 4) : null
  const highlightedFull = fullText ? highlightQuote(fullText, effectivePatterns, 4) : null

  return (
    <div
      className={`
        rounded-xl p-6 space-y-4 transition-all duration-300 cursor-pointer
        ${isMobile ? "min-w-[85vw] snap-center" : ""}
        ${
          isPlaying
            ? "border-blue-300 bg-blue-50/30 shadow-lg scale-[1.02]"
            : "bg-white border border-blue-200/60 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] hover:-translate-y-1"
        }
      `}
    >
      <IntimateAudioPlayer audioUrl={contribution.voice_url!} onPlayingChange={setIsPlaying} />

      {highlightedPreview && (
        <div className="space-y-2">
          <div className="text-sm md:text-base text-neutral-700 leading-relaxed">
            {showFullTranscript ? highlightedFull : highlightedPreview}
          </div>
          {hasMoreText && (
            <button
              onClick={() => setShowFullTranscript(!showFullTranscript)}
              className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-expanded={showFullTranscript}
            >
              <span>{showFullTranscript ? "Show less" : "Read more"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${showFullTranscript ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      )}

      {/* Contributor info - clean hierarchy */}
      <div className="space-y-1 pt-2 border-t border-neutral-200">
        <p className="text-base font-semibold text-neutral-900 transition-colors group-hover:text-blue-900">
          {contribution.contributor_name}
        </p>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className="capitalize">{contribution.relationship?.replace(/_/g, " ")}</span>
          {contribution.contributor_company && (
            <>
              <span>•</span>
              <span>{contribution.contributor_company}</span>
            </>
          )}
        </div>
        {contribution.audio_duration_ms && (
          <p className="text-xs text-neutral-500">{Math.round(contribution.audio_duration_ms / 1000)}s recording</p>
        )}
      </div>
    </div>
  )
}
