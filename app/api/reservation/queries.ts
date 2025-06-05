export const reservationFindMany = async () => {
  const res = await fetch("/api/reservation")
  if (!res.ok) throw new Error("Failed to fetch reservations")
  return res.json()
}
