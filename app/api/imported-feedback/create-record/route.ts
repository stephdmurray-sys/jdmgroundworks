import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { imageUrl, imagePath, profileId, sourceType } = await request.json()

    if (!imageUrl || !profileId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!sourceType) {
      return NextResponse.json({ error: "Source type is required" }, { status: 400 })
    }

    const validSourceTypes = ["Email", "LinkedIn", "DM", "Review", "Other"]
    if (!validSourceTypes.includes(sourceType)) {
      console.log("[v0] Invalid source type received:", { sourceType, validTypes: validSourceTypes })
      return NextResponse.json(
        { error: `Invalid source type. Must be one of: ${validSourceTypes.join(", ")}` },
        { status: 400 },
      )
    }

    console.log("[v0] Source type validation passed:", sourceType)

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", profileId)
      .eq("user_id", user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found or unauthorized" }, { status: 403 })
    }

    const { data: importedFeedback, error } = await supabase
      .from("imported_feedback")
      .insert({
        profile_id: profileId,
        raw_image_url: imageUrl,
        raw_image_path: imagePath || null,
        source_type: sourceType, // Validated enum value
        extraction_status: "queued",
        extraction_attempts: 0,
        ocr_text: null,
        ai_extracted_excerpt: "Processing...",
        giver_name: "Processing...",
        giver_company: null,
        giver_role: null,
        approx_date: null,
        traits: [],
        confidence_score: null,
        approved_by_owner: false,
        visibility: "private",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database insert error:", error)
      console.log("[v0] Failed insert details:", { sourceType, profileId, hasImageUrl: !!imageUrl })
      return NextResponse.json({ error: "We couldn't save this file yet. Please try again." }, { status: 500 })
    }

    console.log("[v0] Created imported_feedback record:", importedFeedback.id)
    console.log("[v0] Record details:", { id: importedFeedback.id, sourceType: importedFeedback.source_type })

    return NextResponse.json({
      id: importedFeedback.id,
      status: "pending_processing",
    })
  } catch (error) {
    console.error("[v0] Create record error:", error)
    return NextResponse.json({ error: "We couldn't save this file yet. Please try again." }, { status: 500 })
  }
}
