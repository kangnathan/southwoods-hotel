import { RoomType, RoomStatus } from "@prisma/client"

export interface Room {
  id: number
  rowId: string
  name: string
  price: string
  number: string
  status: RoomStatus
  type: RoomType
}
