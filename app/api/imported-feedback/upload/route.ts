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

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, and PDF are allowed" }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB" }, { status: 400 })
    }

    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const fileBuffer = await file.arrayBuffer()

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("imported-feedback")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("[v0] Supabase storage upload error:", uploadError)
      return NextResponse.json({ error: "Upload to storage failed" }, { status: 500 })
    }

    // Get public URL for preview (won't work for private buckets, but stored for reference)
    const { data: urlData } = supabase.storage.from("imported-feedback").getPublicUrl(fileName)

    console.log("[v0] File uploaded successfully to Supabase Storage:", fileName)

    // Return both path (for SDK downloads) and URL (for backwards compatibility)
    return NextResponse.json({
      path: fileName,
      url: urlData.publicUrl,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
