import { MissingParamError } from './error/missing-param-error'
import { badRequest } from './helpers/http-helper'
import { Controller } from './protocols/controller'
import { HttpResponse, HttRequest } from './protocols/htpp'

export class SingUpController implements Controller {
  public handle = (httpResquest: HttRequest): HttpResponse => {
    const requiredFields = ['name', 'email', 'passwordConfirmation', 'password']

    for (const field of requiredFields) {
      if (!httpResquest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      statusCode: 200,
      body: '',
    }
  }
}
