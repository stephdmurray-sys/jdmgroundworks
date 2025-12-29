import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { generateText } from "ai"
import { LOCKED_TRAITS } from "@/lib/imported-feedback-traits"
import { redactSensitiveData } from "@/lib/redact-sensitive-data"

async function extractFeedbackFromImage(imageUrl: string): Promise<{
  excerpt: string | null
  giverName: string
  giverCompany: string | null
  giverRole: string | null
  sourceType: string | null
  approxDate: string | null
  traits: string[]
  rawExtractedText: string
  confidence: {
    overall: number
    giverName: number
    excerpt: number
    source: number
  }
}> {
  try {
    console.log("[SCREENSHOT_EXTRACTION] Starting vision-based extraction for:", imageUrl)

    const systemPrompt = `You are a feedback extraction assistant. Extract structured data from this screenshot.

LOCKED TRAITS (select UP TO 3 that apply): ${LOCKED_TRAITS.join(", ")}

Return ONLY valid JSON with this exact structure:
{
  "excerpt": "1-2 sentence verbatim positive quote from the feedback, or null if not found",
  "giverName": "Full name of person who wrote this, or 'Unknown' if not clear",
  "giverCompany": "Company/organization name, or null",
  "giverRole": "Job title/role, or null",
  "sourceType": "One of: LinkedIn, Email, Slack, Text, DM, Teams, Other, or null",
  "approxDate": "YYYY-MM-DD format if visible, or null",
  "traits": ["trait1", "trait2"],
  "rawExtractedText": "All visible text from the image for debugging",
  "confidence": {
    "overall": 0.85,
    "giverName": 0.9,
    "excerpt": 0.8,
    "source": 0.7
  }
}

RULES:
- Extract verbatim, don't rewrite
- Only use traits from the LOCKED list
- Confidence 0-1 scale (1 = very confident)
- If you can see clear positive feedback, set overall confidence >= 0.7
- If screenshot is unclear/not feedback, set overall < 0.5`

    const { text } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imageUrl,
            },
            {
              type: "text",
              text: systemPrompt,
            },
          ],
        },
      ],
    })

    console.log("[SCREENSHOT_EXTRACTION] Raw AI response:", text)

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("AI did not return valid JSON")
    }

    const extracted = JSON.parse(jsonMatch[0])

    // Validate and clean data
    const validTraits = (extracted.traits || []).filter((t: string) => LOCKED_TRAITS.includes(t as any)).slice(0, 3)

    const result = {
      excerpt: extracted.excerpt || null,
      giverName: extracted.giverName || "Unknown",
      giverCompany: extracted.giverCompany || null,
      giverRole: extracted.giverRole || null,
      sourceType: extracted.sourceType || null,
      approxDate: extracted.approxDate || null,
      traits: validTraits,
      rawExtractedText: extracted.rawExtractedText || "",
      confidence: {
        overall: Math.max(0, Math.min(1, Number(extracted.confidence?.overall || 0))),
        giverName: Math.max(0, Math.min(1, Number(extracted.confidence?.giverName || 0))),
        excerpt: Math.max(0, Math.min(1, Number(extracted.confidence?.excerpt || 0))),
        source: Math.max(0, Math.min(1, Number(extracted.confidence?.source || 0))),
      },
    }

    console.log("[SCREENSHOT_EXTRACTION] Extracted data:", {
      hasExcerpt: !!result.excerpt,
      giverName: result.giverName,
      traits: result.traits,
      overallConfidence: result.confidence.overall,
    })

    return result
  } catch (error) {
    console.error("[SCREENSHOT_EXTRACTION] Extraction error:", error)
    throw new Error(`Failed to extract: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    const { imageUrl, profileId, recordId } = await request.json()

    console.log("[SCREENSHOT_EXTRACTION] Processing request:", { imageUrl, profileId, recordId })

    if (!imageUrl || !profileId || !recordId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify profile exists
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", profileId).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 403 })
    }

    try {
      // Extract feedback using vision model
      const extracted = await extractFeedbackFromImage(imageUrl)

      // Redact sensitive data from raw text
      const redactedText = redactSensitiveData(extracted.rawExtractedText)

      // Determine if this should be included in analysis
      // Include if: confidence >= 0.5 AND has excerpt OR has giver name
      const shouldIncludeInAnalysis =
        extracted.confidence.overall >= 0.5 && (extracted.excerpt !== null || extracted.giverName !== "Unknown")

      console.log("[SCREENSHOT_EXTRACTION] Processing complete:", {
        recordId,
        shouldIncludeInAnalysis,
        overallConfidence: extracted.confidence.overall,
      })

      // Update database with extracted data
      const { error } = await supabase
        .from("imported_feedback")
        .update({
          ocr_text: redactedText,
          ocr_confidence: extracted.confidence.overall,
          included_in_analysis: shouldIncludeInAnalysis,
          ai_extracted_excerpt: extracted.excerpt,
          giver_name: extracted.giverName,
          giver_company: extracted.giverCompany,
          giver_role: extracted.giverRole,
          source_type: extracted.sourceType,
          approx_date: extracted.approxDate,
          traits: extracted.traits,
          confidence_score: extracted.confidence.overall,
          confidence_details: extracted.confidence,
        })
        .eq("id", recordId)

      if (error) {
        console.error("[SCREENSHOT_EXTRACTION] Database update error:", error)
        throw new Error("Failed to update database")
      }

      return NextResponse.json({
        id: recordId,
        requiresReview: extracted.confidence.overall < 0.7,
        confidence: extracted.confidence.overall,
        extracted: {
          excerpt: extracted.excerpt,
          giverName: extracted.giverName,
          traits: extracted.traits,
        },
      })
    } catch (processingError) {
      console.error("[SCREENSHOT_EXTRACTION] Processing failed:", processingError)

      await supabase
        .from("imported_feedback")
        .update({
          ai_extracted_excerpt: null,
          giver_name: "Review needed",
          confidence_score: 0,
          ocr_text: `Extraction failed: ${processingError instanceof Error ? processingError.message : "Unknown error"}`,
        })
        .eq("id", recordId)

      return NextResponse.json({
        id: recordId,
        requiresReview: true,
        confidence: 0,
        message: "We couldn't extract details automatically. You can still publish by adding info manually.",
        error: processingError instanceof Error ? processingError.message : "Extraction failed",
      })
    }
  } catch (error) {
    console.error("[SCREENSHOT_EXTRACTION] Request error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Processing failed",
      },
      { status: 500 },
    )
  }
}
