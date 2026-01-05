-- Create tables for the real estate broker platform

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(15, 2) NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL, -- Added city field for city-based filtering
  type TEXT NOT NULL, -- 'apartment', 'office', 'house', etc.
  transaction_type TEXT NOT NULL, -- 'rent' or 'buy'
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqft DECIMAL(10, 2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city); -- Added city index
CREATE INDEX IF NOT EXISTS idx_properties_created_by ON properties(created_by);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties table
-- Everyone can view all properties
CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT
  USING (true);

-- Only the broker who created the property can update/delete it
CREATE POLICY "Users can update their own properties" ON properties
  FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own properties" ON properties
  FOR DELETE
  USING (auth.uid() = created_by);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert properties" ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);
