// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./app/lib/jwt"
import { UserRole } from "@prisma/client"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("southwoods-hotel")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/sign-out", req.url))
  }

  try {
    const payload = await verifyToken(token)

    if (payload.role === UserRole.ADMIN) {
      if (!req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
    } else {
      if (!req.nextUrl.pathname.startsWith("/guest")) {
        return NextResponse.redirect(new URL("/guest", req.url))
      }
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/sign-out", req.url))
  }
}

export const config = {
  matcher: ["/guest/:path*", "/admin/:path*"],
}
