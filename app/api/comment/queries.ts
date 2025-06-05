export const fetchComments = async (roomId: number) => {
  const res = await fetch(`/api/comments?roomId=${roomId}`)
  if (!res.ok) throw new Error("Failed to fetch comments")
  return res.json()
}
