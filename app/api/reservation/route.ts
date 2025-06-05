import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { ReservationCreateSchema } from "./schemas"
import { handleMutationError } from "@/app/utils/handleMutationError"

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        room: true,
      },
    })

    return NextResponse.json(reservations, { status: 200 })
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
    const validatedData = ReservationCreateSchema.strict().parse(body)

    // Check for overlapping reservations with PENDING or CONFIRMED status
    const overlappingReservations = await prisma.reservation.findMany({
      where: {
        roomId: validatedData.roomId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        OR: [
          // New reservation starts during existing reservation
          {
            AND: [
              { checkInDate: { lte: validatedData.checkInDate } },
              { checkOutDate: { gt: validatedData.checkInDate } },
            ],
          },
          // New reservation ends during existing reservation
          {
            AND: [
              { checkInDate: { lt: validatedData.checkOutDate } },
              { checkOutDate: { gte: validatedData.checkOutDate } },
            ],
          },
          // New reservation completely contains existing reservation
          {
            AND: [
              { checkInDate: { gte: validatedData.checkInDate } },
              { checkOutDate: { lte: validatedData.checkOutDate } },
            ],
          },
          // Existing reservation completely contains new reservation
          {
            AND: [
              { checkInDate: { lte: validatedData.checkInDate } },
              { checkOutDate: { gte: validatedData.checkOutDate } },
            ],
          },
        ],
      },
    })

    if (overlappingReservations.length > 0) {
      return NextResponse.json(
        {
          error:
            "Room is not available for the selected dates. There are conflicting reservations.",
          conflictingReservations: overlappingReservations.map((r) => ({
            id: r.id,
            checkInDate: r.checkInDate,
            checkOutDate: r.checkOutDate,
            status: r.status,
          })),
        },
        { status: 409 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: validatedData.userId,
        roomId: validatedData.roomId,
        status: validatedData.status,
        checkInDate: validatedData.checkInDate,
        checkOutDate: validatedData.checkOutDate,
        totalAmount: validatedData.totalAmount,
      },
    })

    return NextResponse.json(reservation, { status: 201 })
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
