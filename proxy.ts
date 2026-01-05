// proxy.ts — Next.js 16 compatible version

import { updateSession } from "@/lib/supabase/proxy"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function proxy(request: NextRequest) {
  // Call your Supabase session updater
  const response = await updateSession(request)
  return response ?? NextResponse.next()
}

// Optional config (same matcher as before)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
