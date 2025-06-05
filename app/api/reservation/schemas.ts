import { z } from "zod"
import { ReservationStatus } from "@prisma/client"

export const ReservationCreateSchema = z.object({
  userId: z.number().int().positive(),
  roomId: z.number().int().positive(),
  status: z.nativeEnum(ReservationStatus).default(ReservationStatus.PENDING),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  totalAmount: z.number().positive(),
})

export const ReservationPatchSchema = z.object({
  id: z.number(),
  userId: z.number().int().positive(),
  roomId: z.number().int().positive(),
  status: z.nativeEnum(ReservationStatus).default(ReservationStatus.PENDING),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  totalAmount: z.number().positive(),
})

export const ReservationUpdateSchema = z.object({
  id: z.number(),
})
