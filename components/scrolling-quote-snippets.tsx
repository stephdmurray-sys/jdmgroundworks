"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

function safeArray<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr : []
}

function safeString(str: string | null | undefined): string {
  return typeof str === "string" ? str : ""
}

interface Contribution {
  id: string
  written_note: string
  contributor_name: string
  traits_category1?: string[]
  traits_category2?: string[]
  traits_category3?: string[]
  traits_category4?: string[]
}

interface ScrollingQuoteSnippetsProps {
  contributions: Contribution[]
  tier1Traits?: string[]
  selectedTrait?: string | null
  onSnippetClick?: (contributionId: string) => void
}

export function ScrollingQuoteSnippets({
  contributions,
  tier1Traits = [],
  selectedTrait,
  onSnippetClick,
}: ScrollingQuoteSnippetsProps) {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [isPausedTop, setIsPausedTop] = useState(false)
  const [isPausedBottom, setIsPausedBottom] = useState(false)

  const safeContributions = safeArray(contributions).filter((c) => c != null)
  const safeTier1Traits = safeArray(tier1Traits)

  const extractSnippets = () => {
    const snippets: Array<{ text: string; id: string; color: string; traits: string[] }> = []
    const seenSnippets = new Set<string>()

    const colors = ["bg-neutral-50/50", "bg-orange-50/30", "bg-blue-50/30", "bg-green-50/30", "bg-purple-50/30"]

    const relevantContributions = selectedTrait
      ? safeContributions.filter((c) => {
          if (!c) return false
          const allTraits = [
            ...safeArray(c.traits_category1),
            ...safeArray(c.traits_category2),
            ...safeArray(c.traits_category3),
            ...safeArray(c.traits_category4),
          ]
          return allTraits.includes(selectedTrait)
        })
      : safeContributions

    const prioritized = relevantContributions
      .filter((c) => c != null)
      .map((c) => {
        const allTraits = [
          ...safeArray(c.traits_category1),
          ...safeArray(c.traits_category2),
          ...safeArray(c.traits_category3),
          ...safeArray(c.traits_category4),
        ]
        const tier1Count = safeTier1Traits.filter((t) => allTraits.includes(t)).length
        return { ...c, tier1Count, allTraits }
      })
      .sort((a, b) => b.tier1Count - a.tier1Count)

    for (const contribution of prioritized) {
      if (snippets.length >= 20) break
      if (!contribution || !contribution.written_note) continue

      const sentences = safeString(contribution.written_note).match(/[^.!?]+[.!?]+/g) || []

      for (const sentence of sentences) {
        if (snippets.length >= 20) break

        const words = sentence.trim().split(" ")
        if (words.length >= 6 && words.length <= 12) {
          const snippet = sentence.trim().replace(/[.!?]+$/, "")
          if (!seenSnippets.has(snippet.toLowerCase())) {
            snippets.push({
              text: snippet,
              id: contribution.id,
              color: colors[snippets.length % colors.length],
              traits: contribution.allTraits,
            })
            seenSnippets.add(snippet.toLowerCase())
          }
        } else if (words.length > 12) {
          const snippet = words.slice(0, 10).join(" ") + "..."
          if (!seenSnippets.has(snippet.toLowerCase())) {
            snippets.push({
              text: snippet,
              id: contribution.id,
              color: colors[snippets.length % colors.length],
              traits: contribution.allTraits,
            })
            seenSnippets.add(snippet.toLowerCase())
          }
        }
      }
    }

    const midpoint = Math.ceil(snippets.length / 2)
    return {
      topRow: snippets.slice(0, midpoint),
      bottomRow: snippets.slice(midpoint),
    }
  }

  const { topRow, bottomRow } = extractSnippets()

  useEffect(() => {
    if (!selectedTrait) return

    const timeout = setTimeout(() => {}, 10000)

    return () => clearTimeout(timeout)
  }, [selectedTrait])

  if (topRow.length === 0 && bottomRow.length === 0) return null

  return (
    <section className="w-full py-12 overflow-hidden">
      <div className="space-y-4">
        <div className="relative">
          <motion.div
            className="flex gap-3"
            animate={{
              x: isPausedTop ? undefined : [0, -1000],
            }}
            transition={{
              duration: 50,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
            onHoverStart={() => setIsPausedTop(true)}
            onHoverEnd={() => setIsPausedTop(false)}
          >
            {[...topRow, ...topRow, ...topRow].map((snippet, index) => (
              <motion.button
                key={`top-${index}`}
                onClick={() => onSnippetClick?.(snippet.id)}
                className={`
                  ${snippet.color}
                  px-5 py-2.5
                  rounded-full
                  text-sm font-medium text-neutral-700
                  border border-neutral-200
                  whitespace-nowrap
                  hover:border-neutral-400
                  hover:shadow-md
                  transition-all duration-200
                  cursor-pointer
                `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {snippet.text}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-3"
            animate={{
              x: isPausedBottom ? undefined : [-1000, 0],
            }}
            transition={{
              duration: 50,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
            onHoverStart={() => setIsPausedBottom(true)}
            onHoverEnd={() => setIsPausedBottom(false)}
          >
            {[...bottomRow, ...bottomRow, ...bottomRow].map((snippet, index) => (
              <motion.button
                key={`bottom-${index}`}
                onClick={() => onSnippetClick?.(snippet.id)}
                className={`
                  ${snippet.color}
                  px-5 py-2.5
                  rounded-full
                  text-sm font-medium text-neutral-700
                  border border-neutral-200
                  whitespace-nowrap
                  hover:border-neutral-400
                  hover:shadow-md
                  transition-all duration-200
                  cursor-pointer
                `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {snippet.text}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
