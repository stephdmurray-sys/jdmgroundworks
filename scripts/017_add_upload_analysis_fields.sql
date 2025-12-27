-- Add fields to support upload text inclusion in AI analysis

ALTER TABLE imported_feedback 
ADD COLUMN IF NOT EXISTS ocr_confidence DECIMAL(3, 2) CHECK (ocr_confidence >= 0 AND ocr_confidence <= 1),
ADD COLUMN IF NOT EXISTS included_in_analysis BOOLEAN DEFAULT FALSE;

-- Add index for analysis queries
CREATE INDEX IF NOT EXISTS idx_imported_feedback_analysis 
ON imported_feedback(profile_id, included_in_analysis) 
WHERE included_in_analysis = TRUE;

COMMENT ON COLUMN imported_feedback.ocr_confidence IS 'Confidence score from OCR text extraction (0-1)';
COMMENT ON COLUMN imported_feedback.included_in_analysis IS 'Whether this upload text is included in AI summary and pattern recognition';
