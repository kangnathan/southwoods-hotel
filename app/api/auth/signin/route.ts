import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import JWTService from "@/app/lib/jwtService"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required.", success: false },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password.", success: false },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password.", success: false },
        { status: 401 }
      )
    }

    const token = JWTService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
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
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json(
      { error: "Internal server error.", success: false },
      { status: 500 }
    )
  }
}
