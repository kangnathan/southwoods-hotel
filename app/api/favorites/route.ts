import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { getUser } from "@/app/lib/auth"

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, roomId } = body

    if (!userId || !roomId) {
      return NextResponse.json(
        { message: "Missing userId or roomId" },
        { status: 400 }
      )
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    })

    if (existing) {
      await prisma.favorite.delete({
        where: {
          userId_roomId: {
            userId,
            roomId,
          },
        },
      })

      return NextResponse.json({ message: "Unfavorited" }, { status: 200 })
    } else {
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          roomId,
        },
      })

      return NextResponse.json(
        { message: "Favorited", favorite },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("Toggle favorite error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const currentUser = await getUser()
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        room: true,
      },
    })

    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
