import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { SignUpFormData } from "../types"

export type SignupError = {
  error?: string
  errors?: Record<string, string | string[]>
}

type SignupResponse = {
  user: { id: number; role: string }

  message: string // adjust based on what your API returns
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

      if (!res.ok) {
        throw result as SignupError
      }

      return result
    },
  })
}
