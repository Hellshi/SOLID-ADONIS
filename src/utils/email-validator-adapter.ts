import { EmailValidator } from '../presentation/protocols/email-validator'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid(email: string): boolean {
    const isValid = validator.isEmail(email)
    return isValid
  }
}
