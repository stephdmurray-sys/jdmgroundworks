import { generateText } from "ai"

interface TraitData {
  label: string
  count: number
  weightedCount: number
}

export async function generateInterpretationSentence(
  personName: string,
  topTraits: TraitData[],
  totalVerifiedCount: number,
): Promise<string> {
  if (topTraits.length === 0) {
    return `People describe working with ${personName.split(" ")[0]} as thoughtful and professional.`
  }

  if (topTraits.length === 1) {
    const trait = topTraits[0].label.toLowerCase()
    return `People describe working with ${personName.split(" ")[0]} as ${trait} in day-to-day collaboration.`
  }

  // Use only top 3 traits for the fallback sentence
  const traitsToUse = topTraits.slice(0, 3)
  const topTraitsList = traitsToUse.map((t) => t.label.toLowerCase()).join(", ")
  return `People describe working with ${personName.split(" ")[0]} as ${topTraitsList}.`

  // AI Gateway code disabled to prevent errors in preview environment
  const traitLabels = topTraits
    .slice(0, Math.min(5, topTraits.length))
    .map((t) => t.label)
    .join(", ")

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      temperature: 0.3,
      maxTokens: 100,
      messages: [
        {
          role: "system",
          content: `You are generating a single editorial sentence that summarizes what it feels like to work with a person based on verified feedback traits.

HARD RULES:
- Output exactly ONE sentence
- Maximum 25 words
- Use only provided traits
- Do NOT invent new qualities
- Do NOT exaggerate
- Do NOT use hype words or superlatives
- Do NOT mention AI, models, or analysis
- Do NOT mention counts or numbers
- Do NOT repeat the headline text

FORBIDDEN WORDS:
best, exceptional, world-class, top-tier, outstanding, amazing, incredible, rockstar, superstar, passionate, visionary, thought leader, highly, extremely, very, proven, guaranteed

APPROVED STYLE:
- Editorial, observational, plainspoken, professional
- Use patterns like:
  * "People describe working with X as..."
  * "Those who've worked with X often mention..."
  * "Working with X is frequently described as..."

Return only the sentence. No quotes. No markdown. No explanation.`,
        },
        {
          role: "user",
          content: `Person's name: ${personName}
Top verified traits: ${traitLabels}
Number of verified contributors: ${totalVerifiedCount}

Generate the interpretation sentence now.`,
        },
      ],
    })

    const cleanedText = text
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\*\*/g, "")
      .replace(/\n/g, " ")

    return cleanedText
  } catch (error) {
    console.error("[v0] Error generating interpretation sentence:", error)
    return `People describe working with ${personName.split(" ")[0]} as ${topTraitsList}.`
  }
}
