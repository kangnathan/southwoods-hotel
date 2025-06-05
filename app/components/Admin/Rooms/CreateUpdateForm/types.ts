import { RoomCreateSchema, RoomUpdateSchema } from "@/app/api/room/schema"
import { z } from "zod"

export type RoomCreateForm = z.infer<typeof RoomCreateSchema>
export type RoomUpdateForm = z.infer<typeof RoomUpdateSchema>
export type RoomFormData = RoomCreateForm | RoomUpdateForm
