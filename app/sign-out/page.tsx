"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { Box, Typography, CircularProgress } from "@mui/material"

export default function LogoutPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/signout", {
        method: "POST",
      })
      setUser(null)
      router.push("/")
    }

    logout()
  }, [router, setUser])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      gap={2}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" color="text.secondary">
        Signing you out...
      </Typography>
    </Box>
  )
}
