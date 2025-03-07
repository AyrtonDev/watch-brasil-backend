import type { EmailValidator } from '../presentation/protocols/email-validator'
import { validate } from 'email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validate(email)
  }
}