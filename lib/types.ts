export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  city: string; // City for filtering
  type: string;
  transaction_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  image_url: string | null; // legacy single image (optional)
  brochure_path: string | null; // path to brochure in Supabase Storage
  builder_name: string; // ✅ NEW FIELD
  created_at: string;
  updated_at: string;
  created_by: string;
  images?: PropertyImage[]; // relation for multiple images
}

export interface PropertyImage {
  id: string;
  property_id: string;
  file_path: string;
  position: number;
  created_at: string;
}

export type PropertyType =
  | "apartment"
  | "office"
  | "house"
  | "land"
  | "commercial"
  | "retail";

export type TransactionType = "rent" | "buy";
