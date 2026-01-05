"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PropertyList } from "@/components/admin/property-list"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/auth/login")
        return
      }
      setUser(data.user)
      setLoading(false)
    }
    checkAuth()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Your Listings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your properties
          </p>
        </div>

        <Link href="/admin/add-property">
          <Button className="bg-rose-600 hover:bg-rose-700">
            + Add Property
          </Button>
        </Link>
      </div>

      <PropertyList userId={user.id} />
    </main>
  )
}
