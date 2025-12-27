import { type NextRequest, NextResponse } from "next/server"
import { createPublicServerClient } from "@/lib/supabase/public-server"
import { checkRateLimit } from "@/lib/rate-limiter"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] API - Received identity update request")

    const { contributionId, contributorName, contributorEmail } = body

    if (!contributionId || !contributorName || !contributorEmail) {
      console.log("[v0] API - Missing required fields")
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
          code: "MISSING_FIELDS",
        },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contributorEmail)) {
      console.log("[v0] API - Invalid email format")
      return NextResponse.json(
        { success: false, error: "Invalid email format", code: "INVALID_EMAIL" },
        { status: 400 },
      )
    }

    const supabase = await createPublicServerClient()
    console.log("[v0] API - Supabase client created successfully")

    const normalizedEmail = contributorEmail.toLowerCase().trim()

    // Check rate limit
    const rateLimit = await checkRateLimit(supabase, {
      identifier: normalizedEmail,
      action: "submission",
      maxRequests: 3,
      windowMs: 24 * 60 * 60 * 1000,
    })

    if (!rateLimit.allowed) {
      console.log("[v0] API - Rate limit exceeded for:", normalizedEmail)
      return NextResponse.json(
        {
          success: false,
          error: `The email "${normalizedEmail}" has reached its submission limit. You can only submit 3 times per email within 24 hours.`,
          code: "RATE_LIMIT",
          resetAt: rateLimit.resetAt.toISOString(),
        },
        { status: 429 },
      )
    }

    // Get the contribution to check owner_id
    const { data: contribution, error: fetchError } = await supabase
      .from("contributions")
      .select("owner_id")
      .eq("id", contributionId)
      .single()

    if (fetchError || !contribution) {
      console.log("[v0] API - Contribution not found:", fetchError)
      return NextResponse.json({ success: false, error: "Contribution not found", code: "NOT_FOUND" }, { status: 404 })
    }

    const emailHash = crypto.createHash("sha256").update(normalizedEmail).digest("hex")

    // Check for duplicate submissions from this email to the same profile
    const { data: existing } = await supabase
      .from("contributions")
      .select("id")
      .eq("owner_id", contribution.owner_id)
      .eq("email_hash", emailHash)
      .neq("id", contributionId)
      .in("status", ["pending_confirmation", "confirmed"])
      .maybeSingle()

    if (existing) {
      console.log("[v0] API - Duplicate submission detected")
      return NextResponse.json(
        {
          success: false,
          error: `The email "${normalizedEmail}" has already submitted for this person. Each email can only submit once.`,
          code: "DUPLICATE_SUBMISSION",
        },
        { status: 409 },
      )
    }

    // Update the contribution with identity information
    console.log("[v0] API - Updating contribution with identity")
    const { error: updateError } = await supabase
      .from("contributions")
      .update({
        contributor_name: contributorName,
        contributor_email: normalizedEmail,
        email_hash: emailHash,
      })
      .eq("id", contributionId)

    if (updateError) {
      console.error("[v0] API - Update error:", updateError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update contribution",
          code: "UPDATE_ERROR",
          details: updateError.message,
        },
        { status: 500 },
      )
    }

    console.log("[v0] API - ✅ Identity updated successfully")

    return NextResponse.json(
      {
        success: true,
        message: "Identity updated successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] API - Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again.",
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
