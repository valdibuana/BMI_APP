import type React from "react"
export const dynamic = 'force-dynamic';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted">{children}</div>
}
