import type { HighlightPattern } from "./extract-highlight-patterns"

/**
 * TRAIT-ANCHORED, IMPACT-ONLY INLINE HIGHLIGHTS
 * Extracts 2-4 meaningful keywords per card with strict quality rules
 * Priority: Selected traits > Impactful descriptors > Impact verbs > Safe defaults
 */
export function extractKeywordsFromText(text: string, traits: string[] = []): HighlightPattern[] {
  if (!text || text.trim().length === 0) {
    return [
      { phrase: "reliable", tier: "theme", frequency: 1 },
      { phrase: "thoughtful", tier: "theme", frequency: 1 },
    ]
  }

  const keywords: HighlightPattern[] = []
  const textLower = text.toLowerCase()

  // Skip first 3 words to avoid highlighting sentence stems like "Working with Maya"
  const words = text.split(/\s+/)
  const skipFirstWords = words.slice(0, 3).join(" ").toLowerCase()

  // Exclusion list - NEVER highlight these
  const excludedWords = new Set([
    "working",
    "work",
    "with",
    "maya",
    "stephanie",
    "she",
    "he",
    "they",
    "her",
    "his",
    "their",
    "a",
    "an",
    "the",
    "to",
    "of",
    "in",
    "on",
    "at",
    "for",
    "from",
    "by",
    "about",
    "as",
    "into",
    "was",
    "is",
    "are",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "this",
    "that",
    "these",
    "those",
    "it",
    "its",
    "who",
    "what",
    "when",
    "where",
    "why",
    "how",
  ])

  // TIER 1: Selected Traits (up to 2, must be 1-2 words)
  if (traits.length > 0) {
    traits.slice(0, 2).forEach((trait) => {
      const traitLower = trait.toLowerCase()
      const traitWords = traitLower.split(/\s+/)

      // Only use traits that are 1-2 words
      if (traitWords.length <= 2 && textLower.includes(traitLower)) {
        keywords.push({
          phrase: traitLower,
          tier: "theme",
          frequency: 1,
        })
      }
    })
  }

  // TIER 2: Impactful descriptors (adjectives and adjective+noun phrases)
  if (keywords.length < 4) {
    // Allowed single-word adjectives with impact
    const impactfulAdjectives = [
      "calm",
      "thoughtful",
      "strategic",
      "creative",
      "genuine",
      "authentic",
      "inspiring",
      "encouraging",
      "supportive",
      "energizing",
      "grounded",
      "organized",
      "detailed",
      "thorough",
      "efficient",
      "responsive",
      "proactive",
      "collaborative",
      "flexible",
      "adaptable",
      "reliable",
      "consistent",
      "dependable",
      "clear",
      "articulate",
      "transparent",
      "innovative",
      "patient",
      "empathetic",
      "professional",
      "exceptional",
    ]

    // Allowed adjective+noun patterns
    const impactfulPhrases = [
      "calm confidence",
      "calm presence",
      "safe space",
      "high standards",
      "clear direction",
      "clear communicator",
      "strategic thinking",
      "level headed",
      "detail oriented",
      "results focused",
      "team player",
      "problem solver",
    ]

    // Check for adjective+noun phrases first (2 words)
    impactfulPhrases.forEach((phrase) => {
      if (keywords.length >= 4) return
      if (textLower.includes(phrase) && !skipFirstWords.includes(phrase)) {
        keywords.push({
          phrase,
          tier: "working-style",
          frequency: 1,
        })
      }
    })

    // Then check for single impactful adjectives
    impactfulAdjectives.forEach((adjective) => {
      if (keywords.length >= 4) return
      const regex = new RegExp(`\\b${adjective}\\b`, "i")
      if (regex.test(text) && !skipFirstWords.includes(adjective)) {
        keywords.push({
          phrase: adjective,
          tier: "working-style",
          frequency: 1,
        })
      }
    })
  }

  // TIER 3: Impact verbs (only if still need 1 more, max 1 verb)
  if (keywords.length >= 2 && keywords.length < 4) {
    const impactVerbs = [
      "unblocked",
      "elevated",
      "simplified",
      "delivered",
      "transformed",
      "streamlined",
      "resolved",
      "championed",
      "pioneered",
      "optimized",
    ]

    for (const verb of impactVerbs) {
      if (keywords.length >= 4) break
      const regex = new RegExp(`\\b${verb}\\b`, "i")
      if (regex.test(text) && !skipFirstWords.includes(verb)) {
        keywords.push({
          phrase: verb,
          tier: "contextual",
          frequency: 1,
        })
        break // Only add 1 verb max
      }
    }
  }

  // FINAL GUARANTEE: Ensure 2-4 keywords
  if (keywords.length < 2) {
    // Safe defaults as last resort
    const defaults = ["reliable", "thoughtful", "supportive"]
    defaults.forEach((word) => {
      if (keywords.length >= 2) return
      if (!keywords.find((k) => k.phrase === word)) {
        keywords.push({
          phrase: word,
          tier: "theme",
          frequency: 1,
        })
      }
    })
  }

  // Ensure uniqueness and cap at 4
  const uniqueKeywords = keywords
    .filter((keyword, index, self) => index === self.findIndex((k) => k.phrase === keyword.phrase))
    .slice(0, 4)

  // Remove any excluded words that might have slipped through
  const filtered = uniqueKeywords.filter((k) => {
    const words = k.phrase.toLowerCase().split(/\s+/)
    return !words.some((w) => excludedWords.has(w))
  })

  // If filtering removed too many, add safe defaults
  while (filtered.length < 2) {
    const safeDefaults = ["reliable", "professional", "thoughtful"]
    const nextDefault = safeDefaults.find((d) => !filtered.find((k) => k.phrase === d))
    if (nextDefault) {
      filtered.push({
        phrase: nextDefault,
        tier: "theme",
        frequency: 1,
      })
    } else {
      break
    }
  }

  return filtered.slice(0, 4)
}
