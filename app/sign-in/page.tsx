"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material"
import { useAuth } from "@/app/context/AuthContext" // 👈 import this
import { UserRole } from "@prisma/client"
import Navbar from "../components/Navbar"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth() // 👈 grab setUser from context

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Login failed")
      return
    }

    // 👇 Update the AuthContext
    setUser({
      id: data.user.id, // make sure your API response returns this
      role: data.user.role,
    })

    if (data.user.role === UserRole.ADMIN) {
      router.push("/admin")
    } else {
      router.push("/guest")
    }
  }

  return (
    <Container maxWidth="xs">
      <Navbar />
      <Typography variant="h3" component="h1" align="center" mt={8}>
        Southwoods Hotel
      </Typography>
      <Box sx={{ p: 4, mt: 2 }}>
        <Typography variant="h5" align="center">
          Hi, welcome back!
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
