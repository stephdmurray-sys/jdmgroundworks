-- Create nomee-audio storage bucket for voice recordings
-- This bucket stores optional voice note recordings from contributors

INSERT INTO storage.buckets (id, name, public)
VALUES ('nomee-audio', 'nomee-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated and anon users to upload audio
CREATE POLICY "Allow uploads to nomee-audio"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'nomee-audio');

-- Allow public read access to audio files
CREATE POLICY "Allow public read access to nomee-audio"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'nomee-audio');

-- Allow users to delete their own uploads (optional, for re-recording)
CREATE POLICY "Allow delete own audio"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'nomee-audio');

COMMENT ON TABLE storage.buckets IS 'Storage buckets including nomee-audio for voice recordings';
