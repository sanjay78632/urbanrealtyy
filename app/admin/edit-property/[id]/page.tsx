"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PropertyForm } from "@/components/admin/property-form"
import type { Property } from "@/lib/types"
import { Loader } from "lucide-react"

export default function EditPropertyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [property, setProperty] = useState<Property | null>(null)
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      if (authError || !user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      const { data: propertyData, error: fetchError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single()

      if (fetchError || !propertyData || propertyData.created_by !== user.id) {
        router.push("/admin")
        return
      }

      setProperty(propertyData as Property)
      setIsLoading(false)
    }

    loadData()
  }, [router, supabase, propertyId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin w-8 h-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            RealEstate<span className="text-primary">Pro</span> Admin
          </h1>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Property</h1>
          <p className="text-muted-foreground">Update the property details</p>
        </div>
        {property && <PropertyForm userId={user?.id} property={property} />}
      </main>
    </div>
  )
}
