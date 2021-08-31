import { Controller } from './protocols/controller'
import { HttpResponse, HttRequest } from './protocols/htpp'

export class SingUpController implements Controller {
  public handle = (httpResquest: HttRequest): HttpResponse => {
    if (!httpResquest.body.name) {
      return {
        body: 'Missing name',
        statusCode: 400,
      }
    }
    if (!httpResquest.body.email) {
      return {
        body: 'missing email',
        statusCode: 400,
      }
    }
    if (!httpResquest.body.password) {
      return {
        body: 'missing password',
        statusCode: 400,
      }
    }
    if (!httpResquest.body.passwordConfirmation) {
      return {
        body: 'missing confirmation',
        statusCode: 400,
      }
    }
    return {
      statusCode: 200,
      body: '',
    }
  }
}
