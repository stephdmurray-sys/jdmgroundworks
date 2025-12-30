"use client"

import { useMemo } from "react"
import { TrendingUp, Users, Zap, MessageSquare, Upload } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PremierSignalBarProps {
  allCards: Array<{
    id: string
    excerpt: string
    traits: string[]
    type: "nomee" | "imported"
    contributorId?: string
  }>
  traitSignals: Array<{ label: string; count: number }>
  totalContributions: number
  firstName?: string
}

// Curated impact dictionary (~50 words/phrases)
const IMPACT_DICTIONARY = [
  "increased",
  "grew",
  "drove",
  "improved",
  "exceeded",
  "delivered",
  "launched",
  "saved",
  "reduced",
  "scaled",
  "led",
  "built",
  "created",
  "transformed",
  "streamlined",
  "optimized",
  "achieved",
  "generated",
  "boosted",
  "accelerated",
  "pioneered",
  "doubled",
  "tripled",
  "revenue",
  "conversion",
  "engagement",
  "shipped",
  "executed",
  "closed",
  "secured",
  "won",
  "earned",
  "surpassed",
  "outperformed",
  "promoted",
  "highest",
  "record",
  "breakthrough",
  "milestone",
  "elevated",
  "simplified",
  "resolved",
  "championed",
  "enabled",
  "empowered",
  "facilitated",
  "enhanced",
  "strengthened",
  "expanded",
]

const IMPACT_PHRASE_MAP: Record<string, string> = {
  created: "Created outcomes",
  drove: "Drove results",
  improved: "Improved performance",
  engagement: "Boosted engagement",
  highest: "Reached highest",
  increased: "Increased impact",
  grew: "Grew metrics",
  exceeded: "Exceeded goals",
  delivered: "Delivered value",
  launched: "Launched initiatives",
  saved: "Saved resources",
  reduced: "Reduced friction",
  scaled: "Scaled operations",
  led: "Led efforts",
  built: "Built solutions",
  transformed: "Transformed processes",
  streamlined: "Streamlined workflows",
  optimized: "Optimized systems",
  achieved: "Achieved targets",
  generated: "Generated results",
  boosted: "Boosted outcomes",
  accelerated: "Accelerated growth",
  pioneered: "Pioneered change",
  doubled: "Doubled metrics",
  tripled: "Tripled impact",
  revenue: "Grew revenue",
  conversion: "Improved conversion",
  shipped: "Shipped deliverables",
  executed: "Executed flawlessly",
  closed: "Closed deals",
  secured: "Secured wins",
  won: "Won recognition",
  earned: "Earned trust",
  surpassed: "Surpassed expectations",
  outperformed: "Outperformed benchmarks",
  promoted: "Promoted growth",
  record: "Set records",
  breakthrough: "Made breakthroughs",
  milestone: "Hit milestones",
  elevated: "Elevated standards",
  simplified: "Simplified complexity",
  resolved: "Resolved issues",
  championed: "Championed initiatives",
  enabled: "Enabled success",
  empowered: "Empowered teams",
  facilitated: "Facilitated outcomes",
  enhanced: "Enhanced quality",
  strengthened: "Strengthened results",
  expanded: "Expanded reach",
}

function getStrengthLabel(count: number): { label: string; className: string } {
  if (count >= 3) return { label: "Core", className: "bg-neutral-800 text-white" }
  if (count === 2) return { label: "Strong", className: "bg-neutral-200 text-neutral-700" }
  return { label: "Emerging", className: "bg-neutral-100 text-neutral-500" }
}

function getSourceInfo(sources: { nomee: number; imported: number }): {
  label: string
  icon: "nomee" | "imported" | "both"
} {
  if (sources.nomee > 0 && sources.imported > 0) {
    return { label: "Nomee + Imported", icon: "both" }
  }
  if (sources.imported > 0) {
    return { label: "Imported feedback", icon: "imported" }
  }
  return { label: "Nomee submissions", icon: "nomee" }
}

function SignalPill({
  label,
  count,
  strength,
  source,
  examplePhrase,
  colorScheme,
}: {
  label: string
  count: number
  strength: { label: string; className: string }
  source: { label: string; icon: "nomee" | "imported" | "both" }
  examplePhrase?: string
  colorScheme: "blue" | "emerald" | "amber"
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
      countText: "text-blue-500",
      hover: "hover:bg-blue-100 hover:border-blue-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      countText: "text-emerald-500",
      hover: "hover:bg-emerald-100 hover:border-emerald-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-100",
      countText: "text-amber-500",
      hover: "hover:bg-amber-100 hover:border-amber-200",
    },
  }

  const colors = colorClasses[colorScheme]

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border cursor-default transition-colors ${colors.bg} ${colors.text} ${colors.border} ${colors.hover}`}
          >
            {/* Source indicator dot */}
            <span className="flex items-center gap-0.5 mr-0.5">
              {source.icon === "both" ? (
                <>
                  <MessageSquare className="w-2.5 h-2.5 opacity-60" />
                  <Upload className="w-2.5 h-2.5 opacity-60" />
                </>
              ) : source.icon === "imported" ? (
                <Upload className="w-2.5 h-2.5 opacity-60" />
              ) : (
                <MessageSquare className="w-2.5 h-2.5 opacity-60" />
              )}
            </span>

            {/* Label */}
            <span className="font-medium">{label}</span>

            {/* Count */}
            <span className={`${colors.countText} tabular-nums`}>{count}</span>

            {/* Strength micro-label */}
            <span
              className={`ml-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold leading-none ${strength.className}`}
            >
              {strength.label}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3 space-y-1.5">
          <p className="text-sm font-medium">
            Mentioned by {count} {count === 1 ? "person" : "people"}
          </p>
          <p className="text-xs text-neutral-500">Source: {source.label}</p>
          {examplePhrase && (
            <p className="text-xs text-neutral-600 italic border-t border-neutral-100 pt-1.5 mt-1.5">
              "{examplePhrase}"
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function PremierSignalBar({
  allCards,
  traitSignals,
  totalContributions,
  firstName = "them",
}: PremierSignalBarProps) {
  // Compute signals from cards with source tracking
  const signals = useMemo(() => {
    const traitMeta: Record<
      string,
      {
        count: number
        sources: { nomee: number; imported: number }
        examples: string[]
      }
    > = {}

    allCards.forEach((card) => {
      card.traits.forEach((trait) => {
        if (!traitMeta[trait]) {
          traitMeta[trait] = { count: 0, sources: { nomee: 0, imported: 0 }, examples: [] }
        }
        traitMeta[trait].count++
        traitMeta[trait].sources[card.type]++
        // Extract a short phrase containing the trait or related content
        if (traitMeta[trait].examples.length < 3 && card.excerpt.length > 20) {
          const shortExcerpt = card.excerpt.slice(0, 80).trim()
          if (shortExcerpt.length > 20) {
            traitMeta[trait].examples.push(shortExcerpt + (card.excerpt.length > 80 ? "..." : ""))
          }
        }
      })
    })

    // Top Signals: most frequently mentioned traits (3-6)
    const topSignals = traitSignals.slice(0, 6).map((s) => ({
      label: s.label,
      count: s.count,
      sources: traitMeta[s.label]?.sources || { nomee: s.count, imported: 0 },
      example: traitMeta[s.label]?.examples[0],
    }))

    // Most Consistent: traits appearing across the most unique contributors
    const traitByContributor: Record<string, Set<string>> = {}
    allCards.forEach((card) => {
      const contributorKey = card.contributorId || card.id
      card.traits.forEach((trait) => {
        if (!traitByContributor[trait]) {
          traitByContributor[trait] = new Set()
        }
        traitByContributor[trait].add(contributorKey)
      })
    })

    const consistentSignals = Object.entries(traitByContributor)
      .map(([trait, contributors]) => ({
        label: trait,
        contributors: contributors.size,
        sources: traitMeta[trait]?.sources || { nomee: contributors.size, imported: 0 },
        example: traitMeta[trait]?.examples[0],
      }))
      .sort((a, b) => b.contributors - a.contributors)
      .slice(0, 4)
      .filter((s) => s.contributors >= 2)

    const impactMeta: Record<
      string,
      {
        count: number
        sources: { nomee: number; imported: number }
        examples: string[]
      }
    > = {}

    allCards.forEach((card) => {
      const textLower = card.excerpt.toLowerCase()
      IMPACT_DICTIONARY.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        const matches = textLower.match(regex)
        if (matches) {
          if (!impactMeta[word]) {
            impactMeta[word] = { count: 0, sources: { nomee: 0, imported: 0 }, examples: [] }
          }
          impactMeta[word].count += matches.length
          impactMeta[word].sources[card.type]++
          // Extract phrase around the impact word
          if (impactMeta[word].examples.length < 2) {
            const wordIndex = textLower.indexOf(word)
            if (wordIndex !== -1) {
              const start = Math.max(0, wordIndex - 20)
              const end = Math.min(card.excerpt.length, wordIndex + word.length + 40)
              const phrase =
                (start > 0 ? "..." : "") +
                card.excerpt.slice(start, end).trim() +
                (end < card.excerpt.length ? "..." : "")
              impactMeta[word].examples.push(phrase)
            }
          }
        }
      })
    })

    const outcomeSignals = Object.entries(impactMeta)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 4)
      .map(([word, meta]) => ({
        keyword: word,
        label: IMPACT_PHRASE_MAP[word] || word,
        count: meta.count,
        sources: meta.sources,
        example: meta.examples[0],
      }))

    return { topSignals, consistentSignals, outcomeSignals }
  }, [allCards, traitSignals])

  // Fallback if not enough data
  if (totalContributions < 3 || signals.topSignals.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-center">
        <p className="text-sm text-neutral-500">Signals will appear after 3+ contributions.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-elegant">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
        {/* Top Signals */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h4 className="text-sm font-semibold text-neutral-900 tracking-tight">Top Signals</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {signals.topSignals.map((signal) => (
              <SignalPill
                key={signal.label}
                label={signal.label}
                count={signal.count}
                strength={getStrengthLabel(signal.count)}
                source={getSourceInfo(signal.sources)}
                examplePhrase={signal.example}
                colorScheme="blue"
              />
            ))}
          </div>
        </div>

        {/* Most Consistent */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-semibold text-neutral-900 tracking-tight">Most Consistent</h4>
          </div>
          {signals.consistentSignals.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {signals.consistentSignals.map((signal) => (
                <SignalPill
                  key={signal.label}
                  label={signal.label}
                  count={signal.contributors}
                  strength={getStrengthLabel(signal.contributors)}
                  source={getSourceInfo(signal.sources)}
                  examplePhrase={signal.example}
                  colorScheme="emerald"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">Need 2+ contributors per signal</p>
          )}
        </div>

        {/* Proof of Impact */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-neutral-900 tracking-tight">Proof of impact</h4>
          </div>
          {signals.outcomeSignals.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {signals.outcomeSignals.map((signal) => (
                <SignalPill
                  key={signal.keyword}
                  label={signal.label}
                  count={signal.count}
                  strength={getStrengthLabel(signal.count)}
                  source={getSourceInfo(signal.sources)}
                  examplePhrase={signal.example}
                  colorScheme="amber"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">No outcome verbs detected</p>
          )}
        </div>
      </div>
    </div>
  )
}
