// This script manually triggers extraction for records stuck at "Processing..."
// Run this once to fix existing broken records

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function fixStuckRecords() {
  console.log("[FIX] Finding stuck records...")

  const { data: stuckRecords, error } = await supabase
    .from("imported_feedback")
    .select("id, raw_image_url, profile_id")
    .eq("giver_name", "Processing...")
    .eq("ai_extracted_excerpt", "Processing...")

  if (error) {
    console.error("[FIX] Error finding stuck records:", error)
    return
  }

  console.log(`[FIX] Found ${stuckRecords?.length || 0} stuck records`)

  for (const record of stuckRecords || []) {
    console.log(`[FIX] Reprocessing record ${record.id}...`)

    try {
      const response = await fetch("http://localhost:3000/api/imported-feedback/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: record.raw_image_url,
          profileId: record.profile_id,
          recordId: record.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`[FIX] Failed to process ${record.id}:`, errorData)
      } else {
        const result = await response.json()
        console.log(`[FIX] Successfully processed ${record.id}:`, result)
      }
    } catch (error) {
      console.error(`[FIX] Error processing ${record.id}:`, error)
    }
  }

  console.log("[FIX] Done!")
}

fixStuckRecords()
