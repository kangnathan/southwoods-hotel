import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { SignUpFormData } from "../types"

export type SignupError = {
  error?: string
  errors?: Record<string, string | string[]>
}

type SignupResponse = {
  user: { id: number; role: string }
  success: boolean
}

export function useSignup(): UseMutationResult<
  SignupResponse,
  SignupError,
  SignUpFormData
> {
  return useMutation<SignupResponse, SignupError, SignUpFormData>({
    mutationFn: async (data) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      console.log("Signup result:", result)

      if (!res.ok) {
        throw result as SignupError
      }

      return result
    },
  })
}
