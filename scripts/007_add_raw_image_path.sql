-- Add raw_image_path column for storing storage paths instead of URLs
-- This fixes the authentication issue when downloading from private buckets

ALTER TABLE public.imported_feedback 
ADD COLUMN IF NOT EXISTS raw_image_path TEXT;

-- Add index for faster path lookups
CREATE INDEX IF NOT EXISTS idx_imported_feedback_raw_image_path 
ON public.imported_feedback(raw_image_path);

-- Add comment for documentation
COMMENT ON COLUMN public.imported_feedback.raw_image_path IS 'Storage path (key) for the uploaded image, used with Storage SDK for authenticated downloads';
