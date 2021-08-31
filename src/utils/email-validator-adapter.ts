import { EmailValidator } from '../presentation/protocols/email-validator'
import { validator, schema } from '@ioc:Adonis/Core/Validator'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid(_email: string): boolean {
    const validate = async () => {
      const validater = validator.validate({
        schema: schema.create({
          // ... define schema
        }),
        data: {
          email: 'virk@adonisjs.com',
          password: 'secret',
        },
      })
      console.log(validater)
      console.log(validate)
    }
    return false
  }
}
