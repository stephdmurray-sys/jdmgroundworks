-- Reset all failed extractions so they can be retried with the fixed code
UPDATE public.imported_feedback
SET 
  extraction_status = 'queued',
  extraction_attempts = 0,
  extraction_error = NULL
WHERE extraction_status IN ('failed', 'processing')
  AND profile_id = (SELECT id FROM profiles WHERE slug = 'steph-olsen');

-- Verify the cleanup
SELECT 
  extraction_status,
  COUNT(*) as count
FROM public.imported_feedback
WHERE profile_id = (SELECT id FROM profiles WHERE slug = 'steph-olsen')
GROUP BY extraction_status;
