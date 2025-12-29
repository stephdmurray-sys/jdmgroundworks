-- Add comprehensive extraction tracking columns for proof-based debugging
-- This enables full transparency into what the AI is seeing and extracting

ALTER TABLE imported_feedback
ADD COLUMN IF NOT EXISTS extraction_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS extraction_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS extracted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS bytes_downloaded INTEGER,
ADD COLUMN IF NOT EXISTS transcription_len INTEGER,
ADD COLUMN IF NOT EXISTS raw_transcription_text TEXT,
ADD COLUMN IF NOT EXISTS raw_model_response JSONB,
ADD COLUMN IF NOT EXISTS extraction_error TEXT;

-- Add index for querying by extraction status
CREATE INDEX IF NOT EXISTS idx_imported_feedback_extraction_status 
ON imported_feedback(extraction_status);

-- Add comment explaining the instrumentation
COMMENT ON COLUMN imported_feedback.extraction_status IS 'Status: pending, processing, success, failed';
COMMENT ON COLUMN imported_feedback.bytes_downloaded IS 'Image file size in bytes';
COMMENT ON COLUMN imported_feedback.transcription_len IS 'Length of OCR text extracted';
COMMENT ON COLUMN imported_feedback.raw_transcription_text IS 'Full OCR text from GPT-4o vision';
COMMENT ON COLUMN imported_feedback.raw_model_response IS 'Complete structured JSON response from AI';
COMMENT ON COLUMN imported_feedback.extraction_error IS 'Error message if extraction failed';

-- Additional updates can be inserted here if needed
