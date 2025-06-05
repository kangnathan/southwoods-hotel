import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import { generateToken } from "@/app/lib/jwt" // uses jose
import { SignUpCreateSchema } from "@/app/api/signup/schema"
import { validateSignup } from "@/app/utils/validateSignup"
import { UserRole } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const formData = await req.json()

    const parsed = SignUpCreateSchema.safeParse(formData)

    if (!parsed.success) {
      const zodErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { errors: zodErrors, success: false },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, phone, password } = parsed.data

    const customErrors = await validateSignup({
      firstName,
      lastName,
      email,
      phone,
      password,
    })

    if (Object.keys(customErrors).length > 0) {
      return NextResponse.json(
        { errors: customErrors, success: false },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: UserRole.GUEST,
      },
    })

    const token = await generateToken({
      userId: newUser.id,
      role: newUser.role,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        role: newUser.role,
      },
    })

    response.cookies.set("southwoods-hotel", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return response
  } catch (error: unknown) {
    console.error("Signup error:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email is already in use.", success: false },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error.", success: false },
      { status: 500 }
    )
  }
}
