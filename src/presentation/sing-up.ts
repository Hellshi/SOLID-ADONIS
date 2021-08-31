import { Controller } from './protocols/controller'
import { HttpResponse, HttRequest } from './protocols/htpp'

export class SingUpController implements Controller {
  public handle = (httpResquest: HttRequest): HttpResponse => {
    const requiredFields = ['name', 'email', 'passwordConfirm', 'password']

    for (const field of requiredFields) {
      if (!httpResquest.body[field]) {
        return {
          statusCode: 400,
          body: '',
        }
      }
    }
    return {
      statusCode: 200,
      body: '',
    }
  }
}
