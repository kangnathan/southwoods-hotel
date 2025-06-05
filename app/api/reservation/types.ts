import { ReservationCreateSchema, ReservationUpdateSchema } from "./schemas"
import { Reservation } from "@prisma/client"
import { z } from "zod"

export type ReservationCreateInput = z.infer<typeof ReservationCreateSchema>
export type ReservationUpdateInput = z.infer<typeof ReservationUpdateSchema>
export type ReservationResult = Reservation
