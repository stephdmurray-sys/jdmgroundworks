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

    console.log("[CREATE_RECORD] Received request:", {
      hasImageUrl: !!imageUrl,
      hasImagePath: !!imagePath,
      profileId,
      sourceType,
      userId: user.id,
    })

    if (!imageUrl || !profileId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!sourceType) {
      return NextResponse.json({ error: "Source type is required" }, { status: 400 })
    }

    const validSourceTypes = ["Email", "LinkedIn", "DM", "Review", "Other"]
    if (!validSourceTypes.includes(sourceType)) {
      console.error("[CREATE_RECORD] Invalid source type:", { sourceType, validTypes: validSourceTypes })
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_SOURCE_TYPE",
          message: "Invalid source selected",
          details: `Source type "${sourceType}" is not valid`,
          hint: `Must be one of: ${validSourceTypes.join(", ")}`,
        },
        { status: 400 },
      )
    }

    console.log("[CREATE_RECORD] Validating profile ownership...")

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", profileId)
      .eq("user_id", user.id)
      .single()

    if (!profile) {
      console.error("[CREATE_RECORD] Profile not found or unauthorized:", { profileId, userId: user.id })
      return NextResponse.json(
        {
          ok: false,
          code: "PROFILE_NOT_FOUND",
          message: "Profile not found",
          details: "The profile ID is invalid or you don't have access",
          hint: "Make sure you're uploading to your own profile",
        },
        { status: 403 },
      )
    }

    console.log("[CREATE_RECORD] Profile validated, inserting record...")

    const insertPayload = {
      profile_id: profileId,
      raw_image_url: imageUrl,
      raw_image_path: imagePath || null,
      source_type: sourceType,
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
    }

    console.log("[CREATE_RECORD] Insert payload:", insertPayload)

    const { data: importedFeedback, error } = await supabase
      .from("imported_feedback")
      .insert(insertPayload)
      .select()
      .single()

    if (error) {
      console.error("[CREATE_RECORD] Database insert failed:", {
        error: error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })

      return NextResponse.json(
        {
          ok: false,
          code: "DB_INSERT_FAILED",
          message: "We couldn't save this file yet",
          details: error.message,
          hint: error.hint || "Check if required fields are missing or if there's a database constraint issue",
        },
        { status: 500 },
      )
    }

    console.log("[CREATE_RECORD] Successfully created record:", {
      id: importedFeedback.id,
      sourceType: importedFeedback.source_type,
      profileId: importedFeedback.profile_id,
    })

    return NextResponse.json({
      id: importedFeedback.id,
      status: "pending_processing",
    })
  } catch (error) {
    console.error("[CREATE_RECORD] Unexpected error:", error)

    return NextResponse.json(
      {
        ok: false,
        code: "UNEXPECTED_ERROR",
        message: "We couldn't save this file yet",
        details: error instanceof Error ? error.message : "Unknown error",
        hint: "Please try again or contact support if the issue persists",
      },
      { status: 500 },
    )
  }
}
