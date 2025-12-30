"use client"

import type { TraitSignal, VibeSignal } from "@/lib/build-profile-analysis"

interface ProofSnapshotProps {
  traitSignals: TraitSignal[]
  vibeSignals: VibeSignal[]
  analysisText: string
  firstName: string
}

export function ProofSnapshot({ traitSignals, vibeSignals, analysisText, firstName }: ProofSnapshotProps) {
  // Extract top 3 strengths (highest count traits)
  const topStrengths = traitSignals.slice(0, 3)

  // Extract top 3 work style signals from vibes
  const workStyle = vibeSignals.slice(0, 3)

  // Extract impact phrases from text
  const impactPhrases = extractImpactPhrases(analysisText, 2)

  // Don't render if no data
  if (topStrengths.length === 0 && workStyle.length === 0 && impactPhrases.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Strengths */}
      {topStrengths.length > 0 && (
        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Top strengths</h4>
          <div className="space-y-2">
            {topStrengths.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50 border border-blue-100"
              >
                <span className="text-sm font-medium text-neutral-800">{trait.label}</span>
                <span className="text-xs font-semibold text-blue-600">{trait.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Style */}
      {workStyle.length > 0 && (
        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Work style</h4>
          <div className="space-y-2">
            {workStyle.map((vibe, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-purple-50 border border-purple-100"
              >
                <span className="text-sm font-medium text-neutral-800">{vibe.label}</span>
                <span className="text-xs font-semibold text-purple-600">{vibe.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact */}
      {impactPhrases.length > 0 && (
        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Impact</h4>
          <div className="space-y-2">
            {impactPhrases.map((phrase, idx) => (
              <p
                key={idx}
                className="text-sm text-neutral-700 leading-relaxed px-3 py-2 rounded-lg bg-amber-50 border border-amber-100"
              >
                "{phrase}"
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper to extract impact phrases from text corpus
function extractImpactPhrases(text: string, maxPhrases: number): string[] {
  if (!text || text.length < 50) return []

  const impactPatterns = [
    /(?:helped|drove|increased|grew|delivered|achieved|exceeded|led|transformed|improved)\s+[^.]{10,60}/gi,
    /\d+%?\s*(?:increase|growth|improvement|boost|reduction)/gi,
    /(?:revenue|engagement|conversion|performance|productivity)\s+[^.]{5,40}/gi,
  ]

  const phrases: string[] = []

  for (const pattern of impactPatterns) {
    const matches = text.match(pattern)
    if (matches) {
      for (const match of matches) {
        const cleaned = match.trim()
        if (cleaned.length >= 15 && cleaned.length <= 80 && !phrases.includes(cleaned)) {
          phrases.push(cleaned)
          if (phrases.length >= maxPhrases) break
        }
      }
    }
    if (phrases.length >= maxPhrases) break
  }

  return phrases
}
