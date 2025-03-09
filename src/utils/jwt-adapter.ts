import type { JWT } from "../presentation/protocols/jwt";
import { sign, verify, type SignOptions} from 'jsonwebtoken'

export class JwtAdapter implements JWT {
  private readonly expire: SignOptions["expiresIn"] = "1h"
  private readonly secret = process.env.JWT_SECRET ?? "test_watch_brasil"
  private readonly timeRange = 900
  private readonly timeTransform = 1000

  generate (value: any): string {
    const token = sign(value, this.secret, { expiresIn: this.expire })

    return token
  }

  isValid (token: string): boolean {
    try {
      return !!verify(token, this.secret)
    } catch {
      return false
    }
  }

  refresh (token: string): string | null {
    try {
      const decoded = verify(token, this.secret, { ignoreExpiration: true })

      if (typeof decoded !== 'object' || !decoded.exp || !decoded.id) {
        return null;
      }

      const currentTime = Math.floor(Date.now() / this.timeTransform)
      const timeLeft = decoded.exp - currentTime;

      if (timeLeft < this.timeRange) {
          return this.generate(decoded.id);
      }

      return null
    } catch {
      return null
    }
  }

  decoded (token: string): any {
    return verify(token, this.secret, { ignoreExpiration: true })
  }
}