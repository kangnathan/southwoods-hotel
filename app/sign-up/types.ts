import { z } from "zod"
import { SignUpCreateSchema } from "../api/schemas/signup"

export type SignUpCreateForm = z.infer<typeof SignUpCreateSchema>
export type SignUpFormData = SignUpCreateForm
