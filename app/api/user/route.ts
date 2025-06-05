import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { getUser } from "@/app/lib/auth"

export async function GET() {
  const authUser = await getUser()

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(authUser.id) },
    select: {
      firstName: true,
      lastName: true,
      id: true,
      email: true,
      image: true,
      role: true,
      phone: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function POST(request: Request) {
  const authUser = await getUser()

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { firstName, lastName, email, phone } = await request.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(authUser.id) },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
        email: true,
        image: true,
        role: true,
        phone: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 400 }
    )
  }
}
