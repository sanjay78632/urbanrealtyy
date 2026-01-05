"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  user: any
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link href="/admin/add-property">
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Property
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
