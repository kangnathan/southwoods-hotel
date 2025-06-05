"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpCreateSchema } from "@/app/api/signup/schema"
import { z } from "zod"
import { useSignup, SignupError } from "./hooks/useSignup"
import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material"
import { useAuth } from "@/app/context/AuthContext"
import { UserRole } from "@prisma/client"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

type SignupFormData = z.infer<typeof SignUpCreateSchema>

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignUpCreateSchema),
  })

  const signupMutation = useSignup()
  const router = useRouter()
  const { setUser } = useAuth()

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signupMutation.mutateAsync(data)

      if (response?.user) {
        setUser({ id: response.user.id, role: response.user.role })
        router.push(response.user.role === UserRole.ADMIN ? "/admin" : "/guest")
      }
    } catch (error: unknown) {
      const err = error as SignupError
      if (err?.errors) {
        Object.entries(err.errors).forEach(([key, value]) => {
          setError(key as keyof SignupFormData, {
            message: Array.isArray(value) ? value[0] : value,
          })
        })
      } else {
        console.error(error)
      }
    }
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
          marginTop: "50px",
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
            Create Account
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ color: "#666" }}
          >
            Join Southwoods Hotel
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <TextField
              label="First Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              InputProps={{
                sx: { borderRadius: "0.75rem", bgcolor: "#fff" },
              }}
            />
            <TextField
              label="Last Name"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              InputProps={{
                sx: { borderRadius: "0.75rem", bgcolor: "#fff" },
              }}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                sx: { borderRadius: "0.75rem", bgcolor: "#fff" },
              }}
            />
            <TextField
              label="Phone"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                sx: { borderRadius: "0.75rem", bgcolor: "#fff" },
              }}
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                sx: { borderRadius: "0.75rem", bgcolor: "#fff" },
              }}
            />

            {signupMutation.isError && signupMutation.error?.error && (
              <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
                {signupMutation.error.error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={signupMutation.isPending}
              sx={{
                mt: 1,
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
              {signupMutation.isPending ? "Signing Up..." : "Sign Up"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
