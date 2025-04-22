"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext" // 👈 import your context hook

export default function LogoutPage() {
  const router = useRouter()
  const { setUser } = useAuth() // 👈 get setUser from AuthContext

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/signout", {
        method: "POST",
      })
      setUser(null) // 👈 clear user from context
      router.push("/") // redirect to home (or login) after logout
    }

    logout()
  }, [router, setUser])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Signing you out...</p>
    </div>
  )
}
