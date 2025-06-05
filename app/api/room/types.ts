import { RoomCreateSchema, RoomUpdateSchema } from "./schema"
import { Room } from "@prisma/client"
import { z } from "zod"

export type RoomCreateInput = z.infer<typeof RoomCreateSchema>
export type RoomUpdateInput = z.infer<typeof RoomUpdateSchema>
export type RoomResult = Room
