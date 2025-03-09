import bcrypt from 'bcrypt'
import type { Encrypter } from '../../data/protocols/encrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
 }

 async compare (value: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(value, hash)
 }
}