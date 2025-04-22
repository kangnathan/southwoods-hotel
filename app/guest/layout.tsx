// app/guest/layout.tsx
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { GuestNavbar } from "@/app/components/Guest/GuestNavbar"
import { getUser } from "@/app/lib/auth"
import { UserRole } from "@prisma/client"

export default async function GuestLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUser()

  if (!user || user.role !== UserRole.GUEST) {
    redirect("/unauthorized")
  }

  return (
    <div className="min-h-screen bg-white">
      <GuestNavbar />
      <main className="p-4">{children}</main>
    </div>
  )
}
