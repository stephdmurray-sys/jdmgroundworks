-- Add comprehensive extraction tracking columns to imported_feedback
ALTER TABLE imported_feedback
ADD COLUMN IF NOT EXISTS extraction_status text DEFAULT 'queued' CHECK (extraction_status IN ('queued', 'processing', 'success', 'failed')),
ADD COLUMN IF NOT EXISTS extraction_error text,
ADD COLUMN IF NOT EXISTS raw_transcription_text text,
ADD COLUMN IF NOT EXISTS raw_model_response jsonb,
ADD COLUMN IF NOT EXISTS extraction_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS extracted_at timestamptz;

-- Create index for querying by status
CREATE INDEX IF NOT EXISTS idx_imported_feedback_extraction_status ON imported_feedback(extraction_status);

COMMENT ON COLUMN imported_feedback.extraction_status IS 'Current extraction status: queued (not started), processing (in progress), success (completed), failed (error occurred)';
COMMENT ON COLUMN imported_feedback.extraction_error IS 'Error message if extraction failed';
COMMENT ON COLUMN imported_feedback.raw_transcription_text IS 'Verbatim text extracted from screenshot for debugging';
COMMENT ON COLUMN imported_feedback.raw_model_response IS 'Full JSON response from AI model for debugging';
COMMENT ON COLUMN imported_feedback.extraction_attempts IS 'Number of extraction attempts made';
COMMENT ON COLUMN imported_feedback.extracted_at IS 'Timestamp of last extraction attempt';
