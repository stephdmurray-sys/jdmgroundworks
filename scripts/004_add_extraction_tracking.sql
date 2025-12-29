-- Add columns for tracking extraction attempts and missing fields
ALTER TABLE imported_feedback
ADD COLUMN IF NOT EXISTS extraction_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_extraction_error text,
ADD COLUMN IF NOT EXISTS last_extraction_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS ocr_confidence numeric,
ADD COLUMN IF NOT EXISTS included_in_analysis boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS confidence_details jsonb;

-- Add index for faster queries on pending reviews
CREATE INDEX IF NOT EXISTS idx_imported_feedback_approved 
ON imported_feedback(profile_id, approved_by_owner) 
WHERE approved_by_owner = false;

-- Add comments for documentation
COMMENT ON COLUMN imported_feedback.extraction_attempts IS 'Number of times extraction has been attempted';
COMMENT ON COLUMN imported_feedback.last_extraction_error IS 'Most recent extraction error message';
COMMENT ON COLUMN imported_feedback.last_extraction_at IS 'Timestamp of last extraction attempt';
COMMENT ON COLUMN imported_feedback.ocr_confidence IS 'Overall confidence of OCR extraction';
COMMENT ON COLUMN imported_feedback.included_in_analysis IS 'Whether this feedback should be included in profile analysis';
COMMENT ON COLUMN imported_feedback.confidence_details IS 'Detailed confidence scores per field (JSON)';
