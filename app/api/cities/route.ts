import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch all unique cities from properties table
    const { data, error } = await supabase.from("properties").select("city").not("city", "is", null)

    if (error) throw error

    // Extract unique cities and sort them
    const uniqueCities = [...new Set(data?.map((p: any) => p.city).filter(Boolean) || [])].sort()

    // Always include default cities
    const defaultCities = ["Ahmedabad", "Gandhinagar"]
    const allCities = [...new Set([...defaultCities, ...uniqueCities])]

    return Response.json({ cities: allCities })
  } catch (error) {
    console.error("[v0] Error fetching cities:", error)
    return Response.json({ cities: ["Ahmedabad", "Gandhinagar"] })
  }
}

export async function POST(request: Request) {
  try {
    const { city } = await request.json()

    if (!city || typeof city !== "string") {
      return Response.json({ error: "Invalid city" }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch all unique cities
    const { data, error } = await supabase.from("properties").select("city").not("city", "is", null)

    if (error) throw error

    const uniqueCities = [...new Set(data?.map((p: any) => p.city).filter(Boolean) || [])].sort()

    const defaultCities = ["Ahmedabad", "Gandhinagar"]
    const allCities = [...new Set([...defaultCities, ...uniqueCities, city])]

    return Response.json({ cities: allCities })
  } catch (error) {
    console.error("[v0] Error adding city:", error)
    return Response.json({ error: "Failed to add city" }, { status: 500 })
  }
}
