export const favoriteRoomsFindMany = async () => {
  const res = await fetch("/api/favorites")
  if (!res.ok) throw new Error("Failed to fetch favorite rooms")
  return res.json()
}
