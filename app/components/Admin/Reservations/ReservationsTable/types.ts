import { User, Room, ReservationStatus } from "@prisma/client"

export interface Reservation {
  id: number
  rowId: string
  user: User
  room: Room
  checkInDate: string
  checkOutDate: string
  status: ReservationStatus
  totalAmount: number
}
