// app/api/auth/signout/route.ts
import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully.",
  })

  response.cookies.set("southwoods-hotel", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0), // expires immediately
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })

  return response
}
