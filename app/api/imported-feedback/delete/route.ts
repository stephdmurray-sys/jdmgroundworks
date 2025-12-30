import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    console.log("[v0] Delete: Checking auth")
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error("[v0] Delete: Auth failed:", authError)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("[v0] Delete: User authenticated:", user.id)

    const { feedbackId } = await request.json()

    if (!feedbackId) {
      return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 })
    }

    const { data: feedback, error: fetchError } = await supabase
      .from("imported_feedback")
      .select("profile_id, raw_image_path, raw_image_url")
      .eq("id", feedbackId)
      .single()

    if (fetchError) {
      console.error("[v0] Delete: Fetch error:", fetchError)
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 })
    }

    if (!feedback || feedback.profile_id !== user.id) {
      console.error("[v0] Delete: Ownership mismatch")
      return NextResponse.json({ error: "You don't have permission to delete this feedback" }, { status: 403 })
    }

    let imagePath = feedback.raw_image_path

    // Backwards compatibility: parse path from URL if raw_image_path is missing
    if (!imagePath && feedback.raw_image_url) {
      const urlParts = feedback.raw_image_url.split("/object/imported-feedback/")
      if (urlParts[1]) {
        imagePath = decodeURIComponent(urlParts[1])
      }
    }

    if (imagePath) {
      try {
        const adminClient = createAdminClient()
        const { error: storageError } = await adminClient.storage.from("imported-feedback").remove([imagePath])

        if (storageError) {
          console.error("[v0] Storage delete error:", storageError)
          // Continue with DB deletion even if storage delete fails
        } else {
          console.log("[v0] Storage file deleted:", imagePath)
        }
      } catch (storageError) {
        console.error("[v0] Storage delete exception:", storageError)
        // Continue with DB deletion even if storage delete fails
      }
    }

    // Delete database record
    const { error: deleteError } = await supabase.from("imported_feedback").delete().eq("id", feedbackId)

    if (deleteError) {
      console.error("[v0] Delete error:", deleteError)
      return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 })
    }

    console.log("[v0] Delete: Success")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete: Exception:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Delete failed",
      },
      { status: 500 },
    )
  }
}
