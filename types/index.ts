/**
 * Written Contribution (from contributions table)
 * Represents direct written feedback from contributors
 */
export interface WrittenContribution {
  id: string
  profile_owner_id: string
  contributor_id?: string | null
  contributor_name: string
  contributor_company?: string | null
  contributor_title?: string | null
  written_note: string

  // Verification
  is_verified: boolean
  verification_method?: "email" | "linkedin" | "manual" | null
  verified_at?: string | null

  // Relationship
  relationship: string
  relationship_category?: "client" | "colleague" | "manager" | "report" | null

  // Traits (JSONB array in DB, string[] in TypeScript)
  themes?: string[] | null
  traits_category1?: string[] | null
  traits_category2?: string[] | null
  traits_category3?: string[] | null
  traits_category4?: string[] | null

  // Display
  is_featured: boolean
  display_order?: number | null

  // Metadata
  created_at: string
  updated_at?: string | null

  // Voice note URL (differentiates voice notes from written)
  voice_note_url?: string | null
  audio_url?: string | null
}

/**
 * Voice Note (from contributions table with voice_note_url)
 * Same table as WrittenContribution, differentiated by presence of voice_note_url
 */
export interface VoiceNote extends WrittenContribution {
  voice_note_url: string // Required for voice notes
  audio_url?: string | null
  transcript?: string | null
}

/**
 * Upload/Screenshot (from saved_feedback table)
 * Represents imported feedback like screenshots, PDFs, etc.
 */
export interface SavedFeedback {
  id: string
  profile_owner_id: string

  // Content
  original_filename?: string | null
  file_url: string
  file_type?: "image" | "pdf" | "text" | null

  // AI extraction
  ai_extracted_excerpt?: string | null
  ai_extracted_context?: string | null
  traits?: string[] | null // JSONB array

  // Source info
  source_platform?: string | null
  source_date?: string | null
  contributor_name?: string | null

  // Display
  is_featured: boolean
  display_order?: number | null

  // Metadata
  created_at: string
  updated_at?: string | null
}

/**
 * Unified Contribution type for components that handle all feedback types
 * This is what most UI components should use
 */
export type Contribution = WrittenContribution | VoiceNote | SavedFeedback

/**
 * Type guard to check if contribution is from contributions table
 */
export function isWrittenOrVoiceContribution(
  contribution: Contribution,
): contribution is WrittenContribution | VoiceNote {
  return "contributor_name" in contribution && "written_note" in contribution
}

/**
 * Type guard to check if contribution is a voice note
 */
export function isVoiceNote(contribution: Contribution): contribution is VoiceNote {
  return isWrittenOrVoiceContribution(contribution) && !!contribution.voice_note_url
}

/**
 * Type guard to check if contribution is saved feedback/upload
 */
export function isSavedFeedback(contribution: Contribution): contribution is SavedFeedback {
  return "file_url" in contribution && !("written_note" in contribution)
}

/**
 * Helper to get display text from any contribution type
 */
export function getContributionText(contribution: Contribution): string {
  if (isSavedFeedback(contribution)) {
    return contribution.ai_extracted_excerpt || ""
  }
  return contribution.written_note || ""
}

/**
 * Helper to get contributor name from any contribution type
 */
export function getContributorName(contribution: Contribution): string {
  if (isSavedFeedback(contribution)) {
    return contribution.contributor_name || "Unknown"
  }
  return contribution.contributor_name || "Anonymous"
}

/**
 * Helper to get all traits from any contribution type
 */
export function getAllTraits(contribution: Contribution): string[] {
  if (isSavedFeedback(contribution)) {
    return contribution.traits || []
  }

  return [
    ...(contribution.themes || []),
    ...(contribution.traits_category1 || []),
    ...(contribution.traits_category2 || []),
    ...(contribution.traits_category3 || []),
    ...(contribution.traits_category4 || []),
  ]
}

/**
 * Helper to check if a contribution is verified
 * A contribution is verified if EITHER linkedin_verified = true OR email_verified = true
 */
export function isContributionVerified(contribution: Contribution): boolean {
  if (isSavedFeedback(contribution)) {
    return false // Uploads don't have verification
  }
  return contribution.is_verified || false
}

/**
 * Helper to format voice note duration from seconds to MM:SS format
 * @param seconds - Duration in seconds (e.g., 63)
 * @returns Formatted duration (e.g., "1:03")
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

/**
 * Helper to format date for display (e.g., "May 2024")
 * @param dateString - ISO date string from database
 * @returns Formatted date (e.g., "May 2024")
 */
export function formatContributionDate(dateString: string): string {
  const date = new Date(dateString)
  const month = date.toLocaleString("en-US", { month: "long" })
  const year = date.getFullYear()
  return `${month} ${year}`
}

/**
 * Helper to get relationship label from contribution
 */
export function getRelationship(contribution: Contribution): string | null {
  if (isSavedFeedback(contribution)) {
    return null // Uploads don't have relationship
  }
  return contribution.relationship || null
}

/**
 * Helper to get company from contribution
 */
export function getCompany(contribution: Contribution): string | null {
  if (isSavedFeedback(contribution)) {
    return null
  }
  return contribution.contributor_company || null
}

/**
 * Helper to get title from contribution
 */
export function getTitle(contribution: Contribution): string | null {
  if (isSavedFeedback(contribution)) {
    return null
  }
  return contribution.contributor_title || null
}

/**
 * Helper to get image URL from saved feedback
 */
export function getImageUrl(contribution: SavedFeedback): string {
  return contribution.file_url
}

/**
 * Helper to get source platform from saved feedback
 */
export function getSourcePlatform(contribution: SavedFeedback): string | null {
  return contribution.source_platform || null
}

/**
 * Profile stats aggregation
 */
export interface ProfileStats {
  totalContributions: number
  writtenCount: number
  voiceNotesCount: number
  uploadsCount: number
  verifiedCount: number
  relationshipBreakdown: Record<string, number>
  uniqueContributors: number
}

/**
 * Trait with computed metadata
 */
export interface TraitWithCount {
  label: string
  count: number
  weightedCount: number
  category: string
  examples: string[]
  contributionIds: string[]
}
