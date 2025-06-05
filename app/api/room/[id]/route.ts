import { NextResponse, NextRequest } from "next/server"
import { RoomUpdateSchema } from "@/app/api/room/schema" // adjust path if needed
import { prisma } from "@/app/lib/prisma" // adjust path if needed
import { handleMutationError } from "@/app/utils/handleMutationError"

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const validatedData = RoomUpdateSchema.strict().parse(body)

    if (validatedData.price < 0) {
      return NextResponse.json(
        { error: "Price cannot be negative" },
        { status: 400 }
      )
    }

    const existingRoom = await prisma.room.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    const updatedRoom = await prisma.room.update({
      where: { id: validatedData.id },
      data: {
        number: validatedData.number,
        name: validatedData.name,
        image: validatedData.image,
        type: validatedData.type,
        status: validatedData.status,
        price: validatedData.price,
      },
    })

    return NextResponse.json(updatedRoom, { status: 200 })
  } catch (error) {
    try {
      handleMutationError(error)
    } catch (formatted) {
      return NextResponse.json(
        {
          error:
            formatted instanceof Error ? formatted.message : "Unknown error",
        },
        { status: 400 }
      )
    }
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    // Allow partial updates (id is still required to locate the room)
    const PartialRoomUpdateSchema = RoomUpdateSchema.partial({
      number: true,
      name: true,
      image: true,
      price: true,
      type: true,
      status: true,
    })

    const validatedData = PartialRoomUpdateSchema.strict().parse(body)

    if (!validatedData.id) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      )
    }

    if (
      validatedData.price !== undefined &&
      typeof validatedData.price === "number" &&
      validatedData.price < 0
    ) {
      return NextResponse.json(
        { error: "Price cannot be negative" },
        { status: 400 }
      )
    }

    const existingRoom = await prisma.room.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    const updatedRoom = await prisma.room.update({
      where: { id: validatedData.id },
      data: {
        number: validatedData.number,
        name: validatedData.name,
        image: validatedData.image,
        type: validatedData.type,
        status: validatedData.status,
        price: validatedData.price,
        description: validatedData.description,
        capacity: validatedData.capacity,
      },
    })

    return NextResponse.json(updatedRoom, { status: 200 })
  } catch (error) {
    try {
      handleMutationError(error)
    } catch (formatted) {
      return NextResponse.json(
        {
          error:
            formatted instanceof Error ? formatted.message : "Unknown error",
        },
        { status: 400 }
      )
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()
    const roomId = parseInt(id ?? "", 10)

    if (isNaN(roomId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 })
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    })

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    return NextResponse.json(room)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
