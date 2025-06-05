import { RoomType, RoomStatus } from "@prisma/client"

export interface RoomCardDisplay {
  id: number
  image: string
  name: string
  price: number
  number: string
  status: RoomStatus
  type: RoomType
  favorites: []
  capacity: number
  description?: string
}
