// app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import JWTService from "@/app/lib/jwtService"
import { SignUpCreateSchema } from "@/app/api/schemas/signup"
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

    const { name, email, phone, password } = parsed.data

    const customErrors = await validateSignup({ name, email, phone, password })

    if (Object.keys(customErrors).length > 0) {
      return NextResponse.json(
        { errors: customErrors, success: false },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: UserRole.GUEST,
      },
    })

    const token = JWTService.sign({
      id: newUser.id, // ✅ changed from userId to id
      email: newUser.email,
      role: newUser.role,
    })

    const user = await prisma.user.findUnique({
      where: { email },
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user?.id,
        role: user?.role,
      },
    })

    response.cookies.set("southwoods-hotel", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
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
