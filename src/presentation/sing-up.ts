import { InvalidParamError } from './error/invalid-param-error'
import { MissingParamError } from './error/missing-param-error'
import { badRequest } from './helpers'
import { HttpResponse, HttRequest, Controller, EmailValidator } from './protocols'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  public handle = (httpResquest: HttRequest): HttpResponse => {
    const requiredFields = ['name', 'email', 'passwordConfirmation', 'password']
    const { email } = httpResquest.body
    for (const field of requiredFields) {
      if (!httpResquest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return {
        statusCode: 400,
        body: new InvalidParamError(),
      }
    }

    return {
      statusCode: 200,
      body: '',
    }
  }
}
