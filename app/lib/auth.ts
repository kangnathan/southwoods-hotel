import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("southwoods-hotel")?.value

  if (!token) return null

  try {
    const payload = await verifyToken(token)
    return {
      id: payload.userId, // ✅ Correct key
      role: payload.role,
    }
  } catch {
    return null
  }
}
