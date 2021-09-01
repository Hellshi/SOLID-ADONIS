import { EmailValidator } from '../presentation/protocols/email-validator'
import { validateMail } from 'App/Validators/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  public async isValid(email: string) {
    const validate = async (mail: string) => {
      const response = await validateMail(mail)
      return response
    }
    const response = await validate(email)
    return response
  }
}
