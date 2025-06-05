import { z } from "zod"
import { RoomType } from "@prisma/client"
import { RoomStatus } from "@prisma/client"

export const RoomCreateSchema = z.object({
  number: z.string(),
  name: z.string().min(1, "Room name is required"),
  image: z.string().optional(),
  type: z.nativeEnum(RoomType).default(RoomType.REGULAR),
  status: z.nativeEnum(RoomStatus).default(RoomStatus.AVAILABLE),
  price: z.number().min(500),
  description: z.string().optional(),
  capacity: z.number(),
})

export const RoomPatchSchema = z.object({
  id: z.number(),
  number: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
})

export const RoomUpdateSchema = RoomCreateSchema.extend({
  id: z.number(),
})
