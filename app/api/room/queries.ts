export const roomFindMany = async () => {
  const res = await fetch("/api/room")
  if (!res.ok) throw new Error("Failed to fetch rooms")
  return res.json()
}

export async function roomFindOne(id: string) {
  const res = await fetch(`/api/room/${id}`)
  if (!res.ok) throw new Error("Failed to fetch room")
  return res.json()
}
