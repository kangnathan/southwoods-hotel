import { ReservationStatus } from "@prisma/client"

export interface ReservationCardDisplay {
  id: number
  image: string
  name: string
  price: number
  number: string
  status: ReservationStatus
  description?: string
}
