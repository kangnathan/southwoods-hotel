import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { RoomCreateSchema } from "@/app/api/room/schema"
import { handleMutationError } from "@/app/utils/handleMutationError"
import { getUser } from "@/app/lib/auth"

export async function GET() {
  const user = await getUser()

  try {
    const rooms = await prisma.room.findMany({
      include: {
        favorites: {
          where: {
            userId: user?.id,
          },
        },
      },
    })

    return NextResponse.json(rooms, { status: 200 })
  } catch (error) {
    try {
      handleMutationError(error)
    } catch (formatted) {
      return NextResponse.json(
        {
          error:
            formatted instanceof Error ? formatted.message : "Unknown error",
        },
        { status: 500 }
      )
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = RoomCreateSchema.strict().parse(body)

    if (validatedData.price < 0) {
      return NextResponse.json(
        { error: "Price cannot be negative" },
        { status: 400 }
      )
    }

    const room = await prisma.room.create({
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

    return NextResponse.json(room, { status: 201 })
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
