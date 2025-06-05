import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { ReservationCreateSchema } from "../schemas"
import { handleMutationError } from "@/app/utils/handleMutationError"

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() // safely extract ID from the path
    const numericId = parseInt(id ?? "", 10)

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid reservation ID" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const validatedData = ReservationCreateSchema.strict().parse(body)

    const updatedReservation = await prisma.reservation.update({
      where: { id: numericId },
      data: {
        userId: validatedData.userId,
        roomId: validatedData.roomId,
        status: validatedData.status,
        checkInDate: validatedData.checkInDate,
        checkOutDate: validatedData.checkOutDate,
        totalAmount: validatedData.totalAmount,
      },
    })

    return NextResponse.json(updatedReservation, { status: 200 })
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
