// app/admin/layout.tsx
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { AdminNavbar } from "@/app/components/Admin/Navbar"
import { getUser } from "@/app/lib/auth"
import { UserRole } from "@prisma/client"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUser()

  if (!user || user.role !== UserRole.ADMIN) {
    redirect("/unauthorized")
  }

  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  )
}
