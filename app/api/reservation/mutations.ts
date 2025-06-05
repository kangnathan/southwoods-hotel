import { ReservationCreateInput } from "./types"

export async function createReservation(data: ReservationCreateInput) {
  const res = await fetch("/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || "Failed to create room")
  }

  return res.json()
}
