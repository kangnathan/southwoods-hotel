import { z } from "zod"
import { SignUpCreateSchema } from "../api/signup/schema"

export type SignUpCreateForm = z.infer<typeof SignUpCreateSchema>
export type SignUpFormData = SignUpCreateForm
