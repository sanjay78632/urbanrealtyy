-- Add location column to properties table if it doesn't exist
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS location VARCHAR(255) DEFAULT 'Downtown';

-- Create index for location filtering
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
