"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Upload, Info } from "lucide-react"
import { VoiceCard } from "@/components/voice-card"
import { AiPatternSummary } from "@/components/ai-pattern-summary"
import { RelationshipFilter } from "@/components/relationship-filter"
import type { RelationshipFilterCategory } from "@/lib/relationship-filter"
import { dedupeContributions } from "@/lib/dedupe-contributions"
import { highlightQuote } from "@/lib/highlight-quote"
import { extractKeywordsFromText } from "@/lib/extract-keywords-from-text"
import { PremierTraitBar } from "@/components/premier-trait-bar"
import { PremierSignalBar } from "@/components/premier-signal-bar"
import { usePinnedHighlights, PinButton } from "@/components/pinned-highlights"
import { SmartVibePills } from "@/components/smart-vibe-pills"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface Profile {
  id: string
  slug: string
  full_name?: string | null
  title?: string | null
  avatar_url?: string | null
  tier?: string | null
}

interface Contribution {
  id: string
  contributor_name?: string | null
  contributor_company?: string | null
  written_note?: string | null
  voice_url?: string | null
  audio_url?: string | null
  traits_category1?: string[] | null
  traits_category2?: string[] | null
  traits_category3?: string[] | null
  traits_category4?: string[] | null
  relationship?: string | null
  relationship_category?: string | null
  contributor_id?: string | null
  created_at?: string | null
}

interface ImportedFeedback {
  id: string
  giver_name?: string | null
  giver_company?: string | null
  ai_extracted_excerpt?: string | null
  traits?: string[] | null
  source_type?: string | null
  confidence_score?: number | null
  included_in_analysis?: boolean | null
  ocr_text?: string | null
  approved_by_owner?: boolean | null
  visibility?: string | null
}

interface TraitWithCount {
  label: string
  count: number
  weightedCount: number
  category: "leadership" | "execution" | "collaboration" | "eq"
  examples: string[]
}

interface ProfileAnalysis {
  traitSignals: Array<{ label: string; count: number; sources: string[] }>
  vibeSignals: Array<{ label: string; count: number }>
  impactSignals: Array<{ label: string; count: number; phrases: string[] }>
  totalDataCount: number
}

interface PremierProfileClientProps {
  profile: Profile
  contributions: Contribution[]
  importedFeedback: ImportedFeedback[]
  traits: TraitWithCount[]
  totalContributions: number
  uniqueCompanies: number
  interpretationSentence: string
  vibeLabels: string[]
  anchorQuote: string
  profileAnalysis: ProfileAnalysis
  isOwner?: boolean
}

export function PremierProfileClient({
  profile,
  contributions: rawContributions,
  importedFeedback: rawImportedFeedback,
  traits,
  totalContributions,
  uniqueCompanies,
  interpretationSentence,
  vibeLabels,
  anchorQuote,
  profileAnalysis,
  isOwner = false,
}: PremierProfileClientProps) {
  const contributions = dedupeContributions(rawContributions)
  const voiceContributions = contributions.filter((c) => c.voice_url || c.audio_url)
  const voiceNotesCount = useMemo(() => {
    const count = rawContributions.filter((c) => c.voice_url || c.audio_url).length
    return count
  }, [rawContributions])

  const analyzableUploads = rawImportedFeedback.filter((u) => u.included_in_analysis && u.ocr_text)
  const totalUploads = rawImportedFeedback.length

  const dedupedImportedFeedback = Array.from(
    new Map(
      rawImportedFeedback.map((feedback) => {
        const key = `${feedback.giver_name}|${feedback.giver_company}|${feedback.ai_extracted_excerpt}`
        return [key, feedback]
      }),
    ).values(),
  )

  const importedFeedback = dedupedImportedFeedback.filter((feedback) => {
    const ownerFirstName = profile.full_name?.split(" ")[0]?.toLowerCase()
    const excerptLower = (feedback.ai_extracted_excerpt || "").toLowerCase()
    const commonNames = ["stephanie", "sarah", "john", "michael", "david", "jennifer", "jessica"]
    const mentionsDifferentName = commonNames.some((name) => name !== ownerFirstName && excerptLower.includes(name))
    return !mentionsDifferentName
  })

  const [selectedTraitFilters, setSelectedTraitFilters] = useState<string[]>([])
  const [sourceFilter, setSourceFilter] = useState<"all" | "nomee" | "imported">("all")
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [hoveredTrait, setHoveredTrait] = useState<string | null>(null)
  const [selectedHeatmapTrait, setSelectedHeatmapTrait] = useState<string | null>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [howItFeelsRelationshipFilter, setHowItFeelsRelationshipFilter] = useState<RelationshipFilterCategory>("All")
  const [voiceRelationshipFilter, setVoiceRelationshipFilter] = useState<RelationshipFilterCategory>("All")

  const { pinnedItems, pinQuote, pinVoice, pinTrait, unpin, isPinned } = usePinnedHighlights(profile.slug)

  const [selectedVibeFilters, setSelectedVibeFilters] = useState<string[]>([])
  const [snapshotFilter, setSnapshotFilter] = useState<{ type: "trait" | "vibe" | "outcome"; value: string } | null>(
    null,
  )

  const topSignals = useMemo(() => {
    return profileAnalysis.traitSignals.slice(0, 6).map((s) => s.label)
  }, [profileAnalysis.traitSignals])

  const filteredVoiceContributions = useMemo(() => {
    if (voiceRelationshipFilter === "All") return voiceContributions
    return voiceContributions.filter((c) => c.relationship_category === voiceRelationshipFilter)
  }, [voiceContributions, voiceRelationshipFilter])

  const howItFeelsContributions = useMemo(() => {
    return contributions.filter((c) => c.written_note?.trim())
  }, [contributions])

  const allCards = useMemo(() => {
    const nomeeCards = howItFeelsContributions.map((c) => ({
      id: c.id,
      excerpt: c.written_note || "",
      traits: [
        ...(c.traits_category1 || []),
        ...(c.traits_category2 || []),
        ...(c.traits_category3 || []),
        ...(c.traits_category4 || []),
      ],
      type: "nomee" as const,
      contributorId: c.contributor_id,
    }))

    return nomeeCards
  }, [howItFeelsContributions])

  const allCardsForSignals = useMemo(() => {
    const nomeeCards = howItFeelsContributions.map((c) => ({
      id: c.id,
      excerpt: c.written_note || "",
      traits: [
        ...(c.traits_category1 || []),
        ...(c.traits_category2 || []),
        ...(c.traits_category3 || []),
        ...(c.traits_category4 || []),
      ],
      type: "nomee" as const,
      contributorId: c.contributor_id,
    }))

    const importedCards = importedFeedback.map((f) => ({
      id: f.id,
      excerpt: f.ai_extracted_excerpt || "",
      traits: f.traits || [],
      type: "imported" as const,
    }))

    return [...nomeeCards, ...importedCards]
  }, [howItFeelsContributions, importedFeedback])

  const getFilteredCards = (cards: typeof allCards) => {
    if (!snapshotFilter) return cards

    return cards.filter((card) => {
      const text = (card.excerpt || "").toLowerCase()
      const cardTraits = card.traits || []

      if (snapshotFilter.type === "trait") {
        return cardTraits.some((t) => t.toLowerCase().includes(snapshotFilter.value.toLowerCase()))
      } else if (snapshotFilter.type === "vibe") {
        return (
          text.includes(snapshotFilter.value.toLowerCase()) ||
          cardTraits.some((t) => t.toLowerCase().includes(snapshotFilter.value.toLowerCase()))
        )
      } else if (snapshotFilter.type === "outcome") {
        return text.includes(snapshotFilter.value.toLowerCase())
      }
      return true
    })
  }

  const filteredHowItFeels = useMemo(() => {
    let filtered = howItFeelsContributions

    if (howItFeelsRelationshipFilter !== "All") {
      filtered = filtered.filter((c) => c.relationship_category === howItFeelsRelationshipFilter)
    }

    if (selectedTraitFilters.length > 0) {
      filtered = filtered.filter((c) => {
        const allTraits = [...(c.traits_category1 || []), ...(c.traits_category2 || []), ...(c.traits_category3 || [])]
        return selectedTraitFilters.some((t) => allTraits.includes(t))
      })
    }

    return filtered
  }, [howItFeelsContributions, howItFeelsRelationshipFilter, selectedTraitFilters])

  const filteredImportedFeedback = useMemo(() => {
    if (selectedTraitFilters.length === 0) return importedFeedback
    return importedFeedback.filter((f) => {
      return selectedTraitFilters.some((t) => f.traits?.includes(t))
    })
  }, [importedFeedback, selectedTraitFilters])

  const handleTraitFilterSelect = (trait: string) => {
    setSelectedTraitFilters((prev) => {
      if (prev.includes(trait)) {
        return prev.filter((t) => t !== trait)
      }
      if (prev.length >= 2) return prev
      return [...prev, trait]
    })
  }

  const handleVibeSelect = (vibe: string) => {
    setSelectedVibeFilters((prev) => {
      if (prev.includes(vibe)) {
        return prev.filter((v) => v !== vibe)
      }
      if (prev.length >= 2) return prev
      return [...prev, vibe]
    })
  }

  const handleSnapshotFilter = (type: "trait" | "vibe" | "outcome", value: string) => {
    if (snapshotFilter?.type === type && snapshotFilter?.value === value) {
      setSnapshotFilter(null)
    } else {
      setSnapshotFilter({ type, value })
    }
  }

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://www.nomee.co/${profile.slug}`)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const firstName = profile.full_name?.split(" ")[0] || "This person"

  const confidenceLevel = useMemo(() => {
    const nomeeCount = howItFeelsContributions.length
    const importedCount = importedFeedback.length
    const total = nomeeCount + importedCount

    if (total >= 10 || nomeeCount >= 7) return "High"
    if (total >= 5 || nomeeCount >= 3) return "Medium"
    return "Low"
  }, [howItFeelsContributions.length, importedFeedback.length])

  const confidenceColor =
    confidenceLevel === "High"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : confidenceLevel === "Medium"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-slate-50 text-slate-600 border-slate-200"

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-[#FAF9F7]">
        {/* Hero Section */}
        <section
          className={`pt-12 pb-8 px-4 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-3">{profile.full_name}</h1>
            {profile.title && <p className="text-lg text-neutral-600 mb-6">{profile.title}</p>}

            {/* Stats row */}
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-4 flex-wrap">
              <span className="font-medium text-neutral-700">NOMEE PROFILE</span>
              <span className="text-neutral-300">·</span>
              <span>{totalContributions} people</span>
              {voiceNotesCount > 0 && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span>{voiceNotesCount} voice notes</span>
                </>
              )}
              {totalUploads > 0 && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span>{totalUploads} screenshots</span>
                </>
              )}
              <span className="text-neutral-300">·</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${confidenceColor}`}>
                {confidenceLevel} confidence
              </span>
            </div>

            <p className="text-xs text-neutral-400 mb-6">Each contributor can submit once.</p>
          </div>
        </section>

        {/* Vibe Pills Section */}
        {vibeLabels && vibeLabels.length > 0 && (
          <section className="pb-8 px-4">
            <div className="max-w-4xl mx-auto">
              <SmartVibePills
                vibes={vibeLabels}
                traits={traits}
                selectedVibes={selectedVibeFilters}
                onVibeSelect={handleVibeSelect}
                contributions={howItFeelsContributions}
                importedFeedback={importedFeedback}
              />
            </div>
          </section>
        )}

        {/* AI Summary Section */}
        {profileAnalysis.totalDataCount >= 1 && (
          <section className="pb-8 px-4">
            <div className="max-w-4xl mx-auto">
              <AiPatternSummary
                traits={traits}
                totalContributions={totalContributions}
                uniqueCompanies={uniqueCompanies}
                interpretationSentence={interpretationSentence}
                vibeLabels={vibeLabels}
                uploadsCount={totalUploads}
              />
            </div>
          </section>
        )}

        {/* Trait Bar Section */}
        {traits.length > 0 && (
          <section className="pb-8 px-4">
            <div className="max-w-4xl mx-auto">
              <PremierTraitBar
                traits={traits}
                selectedTraits={selectedTraitFilters}
                onTraitSelect={handleTraitFilterSelect}
                contributions={howItFeelsContributions}
                importedFeedback={importedFeedback}
              />
            </div>
          </section>
        )}

        {/* Source Filter Tabs */}
        <section className="pb-4 px-4">
          <div className="max-w-4xl mx-auto flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-neutral-200 shadow-sm">
              <button
                onClick={() => setSourceFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  sourceFilter === "all" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                All ({howItFeelsContributions.length + importedFeedback.length})
              </button>
              <button
                onClick={() => setSourceFilter("nomee")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  sourceFilter === "nomee" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Direct ({howItFeelsContributions.length})
              </button>
              <button
                onClick={() => setSourceFilter("imported")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  sourceFilter === "imported" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Imported ({importedFeedback.length})
              </button>
            </div>
          </div>
        </section>

        {/* How It Feels Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-neutral-900 mb-2">How it feels</h2>
              <p className="text-neutral-500">Day-to-day collaboration style and working patterns</p>
              <div className="w-16 h-px bg-neutral-300 mx-auto mt-4" />
            </div>

            {/* Relationship Filter */}
            {(sourceFilter === "all" || sourceFilter === "nomee") && howItFeelsContributions.length > 0 && (
              <div className="flex justify-center mb-6">
                <RelationshipFilter
                  selectedCategory={howItFeelsRelationshipFilter}
                  onCategoryChange={setHowItFeelsRelationshipFilter}
                  contributions={howItFeelsContributions}
                />
              </div>
            )}

            {/* Masonry Grid of Cards */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {/* Direct/Nomee Cards */}
              {(sourceFilter === "all" || sourceFilter === "nomee") &&
                filteredHowItFeels.map((contribution) => {
                  const allTraits = [
                    ...(contribution.traits_category1 || []),
                    ...(contribution.traits_category2 || []),
                    ...(contribution.traits_category3 || []),
                    ...(contribution.traits_category4 || []),
                  ]
                  const keywords = extractKeywordsFromText(contribution.written_note || "", allTraits, topSignals)

                  return (
                    <div
                      key={contribution.id}
                      className="break-inside-avoid mb-4 bg-gradient-to-br from-sky-50/50 to-white border border-sky-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                      {/* Source Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-sky-100/80 rounded-full">
                        <MessageSquare className="w-3 h-3 text-sky-600" />
                        <span className="text-[10px] font-medium text-sky-700">Nomee Submission</span>
                      </div>

                      {/* Pin Button */}
                      {isOwner && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <PinButton
                            isPinned={isPinned("quote", contribution.id)}
                            onPin={() => pinQuote(contribution.id, contribution.written_note || "")}
                            onUnpin={() => unpin("quote", contribution.id)}
                          />
                        </div>
                      )}

                      <div className="pt-8">
                        <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                          {highlightQuote(contribution.written_note || "", keywords)}
                        </p>

                        {/* Trait Pills */}
                        {allTraits.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {allTraits.slice(0, 4).map((trait) => (
                              <Tooltip key={trait}>
                                <TooltipTrigger asChild>
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full border cursor-default transition-all ${
                                      selectedTraitFilters.includes(trait)
                                        ? "bg-sky-100 text-sky-800 border-sky-300"
                                        : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                                    }`}
                                  >
                                    {trait}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Appears in {traits.find((t) => t.label === trait)?.count || 1} contributions</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        )}

                        {/* Contributor Info */}
                        <div className="pt-3 border-t border-neutral-100">
                          <p className="font-medium text-neutral-900 text-sm">{contribution.contributor_name}</p>
                          {contribution.relationship && contribution.relationship !== "0" && (
                            <p className="text-xs text-neutral-500">
                              {contribution.relationship}
                              {contribution.contributor_company &&
                                contribution.contributor_company.trim() !== "" &&
                                ` · ${contribution.contributor_company}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

              {/* Imported Cards */}
              {(sourceFilter === "all" || sourceFilter === "imported") &&
                filteredImportedFeedback.map((feedback) => {
                  const keywords = extractKeywordsFromText(
                    feedback.ai_extracted_excerpt || "",
                    feedback.traits || [],
                    topSignals,
                  )

                  return (
                    <div
                      key={feedback.id}
                      className="break-inside-avoid mb-4 bg-gradient-to-br from-amber-50/50 to-white border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                      {/* Source Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-100/80 rounded-full">
                          <Upload className="w-3 h-3 text-amber-600" />
                          <span className="text-[10px] font-medium text-amber-700">Imported</span>
                        </span>
                        {feedback.source_type && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full">
                            {feedback.source_type}
                          </span>
                        )}
                      </div>

                      {/* Pin Button */}
                      {isOwner && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <PinButton
                            isPinned={isPinned("quote", feedback.id)}
                            onPin={() => pinQuote(feedback.id, feedback.ai_extracted_excerpt || "")}
                            onUnpin={() => unpin("quote", feedback.id)}
                          />
                        </div>
                      )}

                      <div className="pt-8">
                        <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                          {highlightQuote(feedback.ai_extracted_excerpt || "", keywords)}
                        </p>

                        {/* Trait Pills */}
                        {feedback.traits && feedback.traits.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {feedback.traits.slice(0, 4).map((trait) => (
                              <Tooltip key={trait}>
                                <TooltipTrigger asChild>
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full border cursor-default transition-all ${
                                      selectedTraitFilters.includes(trait)
                                        ? "bg-amber-100 text-amber-800 border-amber-300"
                                        : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                                    }`}
                                  >
                                    {trait}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Appears in {traits.find((t) => t.label === trait)?.count || 1} contributions</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        )}

                        {/* Contributor Info */}
                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-neutral-900 text-sm">{feedback.giver_name || "Anonymous"}</p>
                            {feedback.giver_company && feedback.giver_company.trim() !== "" && (
                              <p className="text-xs text-neutral-500">{feedback.giver_company}</p>
                            )}
                          </div>
                          {feedback.source_type && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-medium rounded">
                              {feedback.source_type}
                            </span>
                          )}
                        </div>

                        {/* Extraction confidence */}
                        {feedback.confidence_score && (
                          <div className="mt-3 pt-3 border-t border-amber-100/50">
                            <div className="flex items-center gap-1 text-[10px] text-amber-600">
                              <span>Extraction confidence: {Math.round(feedback.confidence_score * 100)}%</span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-3 h-3 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    How confident we are that the screenshot text was read correctly (OCR + parsing)
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>

            {/* Empty State */}
            {filteredHowItFeels.length === 0 && filteredImportedFeedback.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500">No contributions match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedTraitFilters([])
                    setHowItFeelsRelationshipFilter("All")
                    setSourceFilter("all")
                  }}
                  className="mt-2 text-sm text-sky-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Voice Notes Section */}
        {voiceContributions.length > 0 && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-neutral-900 mb-2">In their own words</h2>
                <p className="text-neutral-500">Voice notes from people who know {firstName}</p>
              </div>

              {/* Voice Relationship Filter */}
              <div className="flex justify-center mb-6">
                <RelationshipFilter
                  selectedCategory={voiceRelationshipFilter}
                  onCategoryChange={setVoiceRelationshipFilter}
                  contributions={voiceContributions}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredVoiceContributions.map((contribution) => (
                  <div key={contribution.id} className="relative group">
                    <VoiceCard
                      audioUrl={contribution.voice_url || contribution.audio_url || ""}
                      contributorName={contribution.contributor_name || "Anonymous"}
                      relationship={contribution.relationship || ""}
                    />
                    {isOwner && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PinButton
                          isPinned={isPinned("voice", contribution.id)}
                          onPin={() =>
                            pinVoice(
                              contribution.id,
                              contribution.voice_url || contribution.audio_url || "",
                              contribution.contributor_name || "",
                            )
                          }
                          onUnpin={() => unpin("voice", contribution.id)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Signals Section */}
        {profileAnalysis.traitSignals.length > 0 && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
              <PremierSignalBar
                traitSignals={profileAnalysis.traitSignals}
                impactSignals={profileAnalysis.impactSignals}
                allCards={allCardsForSignals}
                firstName={firstName}
              />
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-16 px-4 bg-neutral-900">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-white mb-4">Build your own Nomee profile</h2>
            <p className="text-neutral-300 mb-8">
              Get feedback from people you've worked with. Create a profile that shows how you collaborate, solve
              problems, and make an impact.
            </p>
            <Button asChild size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100">
              <Link href="/auth/sign-up">Get started for free</Link>
            </Button>
          </div>
        </section>
      </main>
    </TooltipProvider>
  )
}
