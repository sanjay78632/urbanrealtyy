-- Migration to add city field if upgrading existing database
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'Ahmedabad';
-- Make city NOT NULL after setting default values
ALTER TABLE properties ALTER COLUMN city SET NOT NULL;
-- Create index for city column
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
