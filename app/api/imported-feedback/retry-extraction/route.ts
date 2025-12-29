import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { recordId, profileId } = await request.json()

    console.log("[SCREENSHOT_EXTRACTION] Retry extraction request:", { recordId, profileId })

    if (!recordId || !profileId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify ownership
    const { data: record } = await supabase
      .from("imported_feedback")
      .select("id, raw_image_url, profile_id")
      .eq("id", recordId)
      .eq("profile_id", profileId)
      .single()

    if (!record) {
      return NextResponse.json({ error: "Record not found or access denied" }, { status: 403 })
    }

    // Call the process endpoint to re-extract
    const processUrl = new URL("/api/imported-feedback/process", request.url)
    const processResponse = await fetch(processUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: record.raw_image_url,
        profileId: record.profile_id,
        recordId: record.id,
      }),
    })

    const result = await processResponse.json()

    console.log("[SCREENSHOT_EXTRACTION] Retry extraction complete:", {
      recordId,
      success: processResponse.ok,
      confidence: result.confidence,
    })

    if (!processResponse.ok) {
      return NextResponse.json(
        {
          error: "Retry extraction failed",
          details: result.error,
        },
        { status: processResponse.status },
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[SCREENSHOT_EXTRACTION] Retry request error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Retry failed",
      },
      { status: 500 },
    )
  }
}
