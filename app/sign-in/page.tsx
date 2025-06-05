"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link as MuiLink,
} from "@mui/material"
import { useAuth } from "@/app/context/AuthContext"
import { UserRole } from "@prisma/client"
import Navbar from "../components/Navbar"
import { toast } from "../components/_common/Toast"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Login failed")
      return
    }
    toast.success("Login successful!")
    setUser({ id: data.user.id, role: data.user.role })
    router.push(data.user.role === UserRole.ADMIN ? "/admin/rooms" : "/guest")
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "125px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "1.5rem",
            width: "100%",
            maxWidth: 420,
            bgcolor: "#f9f9f9",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            Southwoods Hotel
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ color: "#666" }}
          >
            Hi, welcome back
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: "0.5rem" }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "0.75rem",
                  bgcolor: "#fff",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "0.75rem",
                  bgcolor: "#fff",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "0.75rem",
                backgroundColor: "#111",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "#555" }}
          >
            Don’t have an account?{" "}
            <MuiLink
              component={Link}
              href="/sign-up"
              underline="hover"
              sx={{ fontWeight: 500, color: "#1976d2" }}
            >
              Sign up here
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  )
}
