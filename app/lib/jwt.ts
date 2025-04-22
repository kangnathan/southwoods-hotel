import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function generateToken(payload: {
  userId: number
  role: "ADMIN" | "GUEST"
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload as { userId: number; role: "ADMIN" | "GUEST" }
}
