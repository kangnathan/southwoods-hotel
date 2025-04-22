import { z } from "zod"

export const SignUpCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(7, "Phone number must be at least 7 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type SignupInput = z.infer<typeof SignUpCreateSchema>
