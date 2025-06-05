// For app router (app/api/comments/route.ts)
import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma" // Adjust path based on your structure

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get("roomId")

  if (!roomId) {
    return NextResponse.json({ error: "Missing roomId" }, { status: 400 })
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        roomId: parseInt(roomId),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const formatted = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      firstName: c.user.firstName,
      lastName: c.user.lastName,
      image: c.user.image,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content, userId, roomId } = body

    // Basic validation
    if (!content || !userId || !roomId) {
      return NextResponse.json(
        { error: "Missing content, userId, or roomId" },
        { status: 400 }
      )
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        roomId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      id: newComment.id,
      content: newComment.content,
      createdAt: newComment.createdAt,
      firstName: newComment.user.firstName,
      lastName: newComment.user.lastName,
      image: newComment.user.image,
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
