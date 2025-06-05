export async function userFindOne(id: string) {
  const res = await fetch(`/api/user/${id}`)
  if (!res.ok) throw new Error("Failed to fetch user")
  return res.json()
}
