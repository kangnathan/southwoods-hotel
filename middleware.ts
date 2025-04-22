import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as jose from "jose"

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET!)

const protectedRoutes: Record<"ADMIN" | "GUEST", string[]> = {
  ADMIN: ["/dashboard"],
  GUEST: ["/dashboard"],
}

export async function middleware(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("southwoods-hotel")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    const { payload } = await jose.jwtVerify(token, jwtSecret)

    const userId = payload.userId
    const role = payload.role as "ADMIN" | "GUEST"
    const pathname = new URL(request.url).pathname

    if (!userId || !role) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    const allowedPaths = protectedRoutes[role] || []
    const isAuthorized = allowedPaths.some((route) =>
      pathname.startsWith(route)
    )

    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  } catch {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard"],
}
