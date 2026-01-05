// lib/supabase/properties.ts
import { createClient } from "@/lib/supabase/server"; // keep this; swap to client if you need on the client side
import type { Property } from "@/lib/types";

// Keep a single source of truth for selected columns
const BASE_COLUMNS =
  "id,title,description,price,location,city,type,transaction_type,bedrooms,bathrooms,area_sqft,image_url,brochure_path,builder_name,created_at,updated_at,created_by";

/**
 * Get all properties
 */
export async function listProperties(): Promise<Property[]> {
  const supabase = await createClient(); // <-- await the client
  const { data, error } = await supabase
    .from("properties")
    .select(BASE_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Property[];
}

/**
 * Get one property by ID
 */
export async function getPropertyById(id: string): Promise<Property> {
  const supabase = await createClient(); // <-- await
  const { data, error } = await supabase
    .from("properties")
    .select(BASE_COLUMNS)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Property;
}

/**
 * Get images for a property
 */
export async function getPropertyImages(propertyId: string) {
  const supabase = await createClient(); // <-- await
  const { data, error } = await supabase
    .from("property_images")
    .select("id,property_id,file_path,position,created_at")
    .eq("property_id", propertyId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
}
