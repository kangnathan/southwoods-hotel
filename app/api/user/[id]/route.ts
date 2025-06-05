import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/app/lib/prisma" // Adjust import to match your project structure

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop()
  const userId = parseInt(id ?? "", 10)

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json(
      { error: "Error retrieving user data" },
      { status: 500 }
    )
  }
}
