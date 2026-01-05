"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

interface AdminHeaderProps {
  user: any
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Link href="/admin/add-property">
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Property
          </Button>
        </Link>
      </div>
    </div>
  )
}
