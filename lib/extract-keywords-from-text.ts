import type { HighlightPattern } from "./extract-highlight-patterns"

/**
 * MANDATORY PER-CARD EXTRACTION - ZERO EXCEPTIONS
 * This function MUST ALWAYS return 2-5 keywords for EVERY card
 * Extracts exact words/phrases from THIS CARD'S text only
 * NO GLOBAL PATTERN ANALYSIS - process each card independently
 */
export function extractKeywordsFromText(text: string, traits: string[] = []): HighlightPattern[] {
  console.log("[v0] extractKeywordsFromText called with text length:", text?.length || 0)
  console.log("[v0] Traits provided:", traits)

  if (!text || text.trim().length === 0) {
    // FAIL-SAFE: Even with no text, return minimum 2 keywords
    console.warn("[v0] WARNING: Empty text provided, returning fallback keywords")
    return [
      { phrase: "professional", tier: "contextual", frequency: 1 },
      { phrase: "reliable", tier: "contextual", frequency: 1 },
    ]
  }

  const keywords: HighlightPattern[] = []
  const textLower = text.toLowerCase()

  // PRIORITY 1: Extract traits that appear in THIS card's text
  if (traits.length > 0) {
    traits.forEach((trait) => {
      if (keywords.length >= 5) return
      const traitLower = trait.toLowerCase()
      // Check if trait appears in text (exact match or as part of phrase)
      if (textLower.includes(traitLower)) {
        keywords.push({
          phrase: traitLower,
          tier: "theme",
          frequency: 1,
        })
        console.log("[v0] ✓ Extracted trait:", traitLower)
      }
    })
  }

  // PRIORITY 2: Extract experiential/descriptive keywords that exist in THIS text
  const experientialKeywords = [
    // Single-word descriptors
    "thoughtful",
    "calm",
    "strategic",
    "creative",
    "genuine",
    "authentic",
    "inspiring",
    "encouraging",
    "supportive",
    "energizing",
    "grounded",
    "warm",
    "approachable",
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
    // Two-word phrases
    "high standards",
    "calm presence",
    "always available",
    "thinks ahead",
    "stays cool",
    "brings clarity",
    "drives results",
    "builds trust",
    "asks questions",
    "clear communicator",
    "team player",
    "problem solver",
    "strategic thinker",
    "detail oriented",
    "results focused",
    "takes initiative",
    "level headed",
  ]

  experientialKeywords.forEach((keyword) => {
    if (keywords.length >= 5) return
    if (textLower.includes(keyword.toLowerCase()) && !keywords.find((k) => k.phrase === keyword.toLowerCase())) {
      keywords.push({
        phrase: keyword.toLowerCase(),
        tier: "working-style",
        frequency: 1,
      })
      console.log("[v0] ✓ Extracted experiential keyword:", keyword)
    }
  })

  // PRIORITY 3: Extract adjective+noun patterns from THIS text
  if (keywords.length < 5) {
    const nounPattern =
      /\b([a-z]+)\s+(leader|partner|communicator|thinker|person|colleague|manager|professional|approach|style|mindset|attitude)\b/gi
    let match
    while ((match = nounPattern.exec(text)) !== null && keywords.length < 5) {
      const adjective = match[1].toLowerCase()
      if (adjective.length > 3 && !keywords.find((k) => k.phrase === adjective)) {
        keywords.push({
          phrase: adjective,
          tier: "contextual",
          frequency: 1,
        })
        console.log("[v0] ✓ Extracted adjective from pattern:", adjective)
      }
    }
  }

  // PRIORITY 4: Extract standalone meaningful adjectives (minimum 4 letters)
  if (keywords.length < 2) {
    console.log("[v0] Only", keywords.length, "keywords so far, extracting standalone adjectives...")
    const words = text.match(/\b[a-z]{4,}\b/gi) || []
    const stopWords = new Set([
      "about",
      "after",
      "again",
      "always",
      "another",
      "before",
      "being",
      "between",
      "could",
      "during",
      "every",
      "first",
      "going",
      "great",
      "having",
      "however",
      "really",
      "should",
      "their",
      "there",
      "these",
      "think",
      "those",
      "through",
      "under",
      "using",
      "where",
      "which",
      "while",
      "would",
      "these",
      "then",
      "when",
      "what",
      "with",
      "have",
      "been",
      "that",
      "this",
      "from",
      "they",
      "were",
      "work",
      "very",
      "more",
      "some",
      "time",
    ])

    const meaningfulWords = words
      .filter((w) => !stopWords.has(w.toLowerCase()) && !keywords.find((k) => k.phrase === w.toLowerCase()))
      .slice(0, 5 - keywords.length)

    meaningfulWords.forEach((word) => {
      keywords.push({
        phrase: word.toLowerCase(),
        tier: "contextual",
        frequency: 1,
      })
      console.log("[v0] ✓ Extracted standalone adjective:", word)
    })
  }

  // ABSOLUTE FAIL-SAFE: If still less than 2, force-extract ANY words (minimum 3 letters)
  if (keywords.length < 2) {
    console.warn("[v0] FAIL-SAFE TRIGGERED: Only", keywords.length, "keywords, force-extracting...")
    const allWords = text.match(/\b[a-z]{3,}\b/gi) || []
    const uniqueWords = [...new Set(allWords.map((w) => w.toLowerCase()))]
      .filter((w) => !keywords.find((k) => k.phrase === w))
      .slice(0, 2 - keywords.length)

    uniqueWords.forEach((word) => {
      keywords.push({
        phrase: word,
        tier: "contextual",
        frequency: 1,
      })
      console.log("[v0] ✓ FAIL-SAFE extracted:", word)
    })
  }

  // Cap at 5, ensure minimum 2
  const result = keywords.slice(0, 5)

  // CATASTROPHIC FAILURE PREVENTION - should NEVER happen
  if (result.length < 2) {
    console.error("[v0] CATASTROPHIC FAILURE: Could not extract 2 keywords from text:", text.substring(0, 100))
    return [
      { phrase: "professional", tier: "contextual", frequency: 1 },
      { phrase: "experience", tier: "contextual", frequency: 1 },
    ]
  }

  console.log(
    "[v0] ✅ Final extraction result:",
    result.length,
    "keywords:",
    result.map((k) => k.phrase),
  )
  return result
}
