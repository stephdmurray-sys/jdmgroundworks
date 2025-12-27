"use client"

/**
 * MANDATORY: Every contribution MUST display EXACTLY 3 highlight pills
 * This is structural, not optional. Zero exceptions.
 *
 * Extraction priority:
 * 1. Selected traits from the contributor
 * 2. Experiential keywords from the text (e.g., "strategic thinking", "calm under pressure")
 * 3. Strong standalone adjectives as last resort
 *
 * Visual: Light gray pills with minimal design beneath the testimonial text
 */

interface Contribution {
  traits_category1?: string[]
  traits_category2?: string[]
  traits_category3?: string[]
  traits_category4?: string[]
  written_note: string
}

// Experiential keyword patterns that describe working style
const EXPERIENTIAL_PATTERNS = [
  /\b(strategic\s+thinking|strategic\s+approach|strategic\s+mindset)\b/gi,
  /\b(calm\s+under\s+pressure|calm\s+presence|calm\s+demeanor)\b/gi,
  /\b(clear\s+communicat\w+|effective\s+communicat\w+)\b/gi,
  /\b(creative\s+thinking|creative\s+approach|creative\s+solution\w*)\b/gi,
  /\b(detail[\s-]oriented|attention\s+to\s+detail)\b/gi,
  /\b(problem[\s-]solv\w+|solution[\s-]oriented)\b/gi,
  /\b(team\s+player|collaborat\w+\s+spirit)\b/gi,
  /\b(thinks?\s+differently|innovative\s+approach)\b/gi,
  /\b(asks?\s+questions?|questions?\s+assumptions?)\b/gi,
  /\b(level[\s-]headed|even[\s-]keeled)\b/gi,
]

// Strong adjectives that describe professional qualities
const STRONG_ADJECTIVES = [
  "strategic",
  "thoughtful",
  "analytical",
  "organized",
  "systematic",
  "reliable",
  "accountable",
  "proactive",
  "thorough",
  "focused",
  "creative",
  "innovative",
  "adaptable",
  "flexible",
  "resourceful",
  "collaborative",
  "supportive",
  "empathetic",
  "patient",
  "calm",
  "clear",
  "articulate",
  "decisive",
  "confident",
  "authentic",
  "genuine",
  "trustworthy",
  "professional",
  "dedicated",
  "committed",
]

export function extractThreeHighlightPills(contribution: Contribution): [string, string, string] {
  console.log("[v0] extractThreeHighlightPills called")

  const pills: string[] = []
  const text = contribution.written_note.toLowerCase()

  // Collect all traits
  const allTraits = [
    ...(contribution.traits_category1 || []),
    ...(contribution.traits_category2 || []),
    ...(contribution.traits_category3 || []),
    ...(contribution.traits_category4 || []),
  ].map((t) => t.toLowerCase())

  console.log("[v0] All traits:", allTraits)

  // TIER 1: Extract traits that appear in the text (most authentic)
  for (const trait of allTraits) {
    if (pills.length >= 3) break
    const traitWords = trait.toLowerCase()
    if (text.includes(traitWords) && !pills.includes(traitWords)) {
      pills.push(traitWords)
      console.log(`[v0] ✓ Added trait from text: ${traitWords}`)
    }
  }

  // TIER 2: Extract experiential keyword phrases from text
  if (pills.length < 3) {
    for (const pattern of EXPERIENTIAL_PATTERNS) {
      if (pills.length >= 3) break
      const matches = text.match(pattern)
      if (matches) {
        const keyword = matches[0].toLowerCase().trim()
        if (!pills.includes(keyword)) {
          pills.push(keyword)
          console.log(`[v0] ✓ Added experiential phrase: ${keyword}`)
        }
      }
    }
  }

  // TIER 3: Use first traits even if not in text
  if (pills.length < 3) {
    for (const trait of allTraits) {
      if (pills.length >= 3) break
      const traitWords = trait.toLowerCase()
      if (!pills.includes(traitWords)) {
        pills.push(traitWords)
        console.log(`[v0] ✓ Added trait (not in text): ${traitWords}`)
      }
    }
  }

  // TIER 4: Extract strong adjectives from text
  if (pills.length < 3) {
    const words = text.match(/\b\w+\b/g) || []
    for (const word of words) {
      if (pills.length >= 3) break
      if (STRONG_ADJECTIVES.includes(word) && !pills.includes(word)) {
        pills.push(word)
        console.log(`[v0] ✓ Added strong adjective: ${word}`)
      }
    }
  }

  // TIER 5 (LAST RESORT): Force extraction from traits
  while (pills.length < 3 && allTraits.length > 0) {
    const trait = allTraits[pills.length] || allTraits[0]
    if (!pills.includes(trait.toLowerCase())) {
      pills.push(trait.toLowerCase())
      console.log(`[v0] ⚠️ Forced trait extraction: ${trait}`)
    } else {
      break
    }
  }

  // ABSOLUTE FALLBACK: Use generic descriptors (should never happen)
  const fallbacks = ["professional", "reliable", "collaborative"]
  while (pills.length < 3) {
    pills.push(fallbacks[pills.length])
    console.log(`[v0] 🚨 FALLBACK used: ${fallbacks[pills.length - 1]}`)
  }

  // Ensure exactly 3 pills
  const finalPills: [string, string, string] = [
    pills[0] || "professional",
    pills[1] || "reliable",
    pills[2] || "collaborative",
  ]

  console.log(`[v0] ✅ FINAL 3 PILLS: ${finalPills.join(", ")}`)

  return finalPills
}
