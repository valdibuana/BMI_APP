import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">{children}</div>
}
