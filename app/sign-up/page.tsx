"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpCreateSchema } from "@/app/api/schemas/signup"
import { z } from "zod"
import { useSignup, SignupError } from ".//hooks/useSignup"
import { Box, Button, TextField, Typography, Alert } from "@mui/material"
import { useAuth } from "@/app/context/AuthContext" // 👈 import this
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

      // Assuming the response includes the created user object
      if (response?.user) {
        setUser({
          id: response.user.id,
          role: response.user.role,
        })
      }
      if (response.user.role === UserRole.ADMIN) {
        router.push("/admin")
      } else {
        router.push("/guest")
      }

      // You can also do any redirect or notification here
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
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={400}
        mx="auto"
        mt={4}
      >
        <Typography variant="h5" textAlign="center">
          Sign Up
        </Typography>

        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {signupMutation.isError && signupMutation.error?.error && (
          <Alert severity="error">{signupMutation.error.error}</Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </Box>
    </>
  )
}
