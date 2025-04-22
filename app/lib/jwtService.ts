import jwt, {
  JwtPayload,
  SignOptions,
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET as string // assert it's defined after runtime check

if (!jwtSecret) {
  throw new Error("JWT Secret is not defined")
}

export interface TokenInfo extends JwtPayload {
  id: number
  email: string
  role?: string
}

class JWTService {
  static sign(tokenInfo: TokenInfo): string {
    const options: SignOptions = { expiresIn: "1h" }
    return jwt.sign(tokenInfo, jwtSecret, options)
  }

  static verify(token: string): TokenInfo {
    try {
      const decoded = jwt.verify(token, jwtSecret)

      if (typeof decoded !== "object" || decoded === null) {
        throw new Error("Invalid token payload")
      }

      // Type narrowing using a type guard
      if (!("id" in decoded) || !("email" in decoded)) {
        throw new Error("Malformed token payload")
      }

      return decoded as TokenInfo
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error("Token has expired")
      } else if (
        error instanceof JsonWebTokenError ||
        error instanceof NotBeforeError
      ) {
        throw new Error("Invalid token")
      }

      throw new Error("Token verification failed")
    }
  }
}

export default JWTService
