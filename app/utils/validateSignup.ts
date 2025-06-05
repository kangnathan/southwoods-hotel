// app/utils/validateSignup.ts
import { SignUpCreateSchema } from "@/app/api/signup/schema"
import { prisma } from "@/app/lib/prisma"
import z from "zod"

interface SignupErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
  general?: string
}

export async function validateSignup(
  input: Partial<z.infer<typeof SignUpCreateSchema>>
): Promise<SignupErrors> {
  const errors: SignupErrors = {}

  const { firstName, lastName, email, phone, password } = input

  if (!firstName && !lastName && !email && !password && !phone) {
    errors.general = "All fields are required"
    return errors
  }

  // 🧼 Name validation
  const firstNameRegex = /^[a-zA-Z0-9]+$/
  if (!firstName || firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters long"
  } else if (!firstNameRegex.test(firstName)) {
    errors.firstName = "First name only contain letters and numbers"
  }
  const lastNameRegex = /^[a-zA-Z0-9]+$/
  if (!lastName || lastName.trim().length < 3) {
    errors.firstName = "Last name must be at least 3 characters long"
  } else if (!lastNameRegex.test(lastName)) {
    errors.lastName = "Last name can only contain letters and numbers"
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
