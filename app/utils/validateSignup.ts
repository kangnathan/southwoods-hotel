// app/utils/validateSignup.ts
import { SignUpCreateSchema } from "@/app/api/schemas/signup"
import prisma from "@/app/lib/prisma"
import z from "zod"

interface SignupErrors {
  name?: string
  email?: string
  phone?: string
  password?: string
  general?: string
}

export async function validateSignup(
  input: Partial<z.infer<typeof SignUpCreateSchema>>
): Promise<SignupErrors> {
  const errors: SignupErrors = {}

  const { name, email, phone, password } = input

  if (!name && !email && !password && !phone) {
    errors.general = "All fields are required"
    return errors
  }

  // 🧼 Name validation
  const nameRegex = /^[a-zA-Z0-9]+$/
  if (!name || name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long"
  } else if (!nameRegex.test(name)) {
    errors.name = "Name can only contain letters and numbers"
  }

  // 📧 Email validation (Zod already checks format)
  if (email) {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        errors.email = "This email is already in use"
      }
    } catch (err: unknown) {
      console.error("Error checking email:", err)

      if (typeof err === "object" && err !== null && "message" in err) {
        const errorObj = err as { message?: string }
        errors.email =
          errorObj.message || "Could not validate email. Please try again later"
      } else {
        errors.email = "Could not validate email. Please try again later"
      }
    }
  }

  // 🔐 Password validation
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long"
  }

  // ☎️ Phone validation
  const phoneRegex = /^[0-9]+$/
  if (!phone || phone.length < 7) {
    errors.phone = "Phone number must be at least 7 digits"
  } else if (!phoneRegex.test(phone)) {
    errors.phone = "Phone number must contain only digits"
  }

  return errors
}
