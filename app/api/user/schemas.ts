import { z } from "zod"

export const UserUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.number(),
})
