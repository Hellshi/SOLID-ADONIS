/* eslint-disable prettier/prettier */
import { InvalidParamError } from './error/invalid-param-error'
import { MissingParamError } from './error/missing-param-error'
import { badRequest } from './helpers'
import { HttpResponse, HttRequest, Controller, EmailValidator } from './protocols'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  public async handle(httpResquest: HttRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'passwordConfirmation', 'password'];

      for (const field of requiredFields) {
        if (!httpResquest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { name, email, passwordConfirm, password } = httpResquest.body;

      if (password !== passwordConfirm) {
        return badRequest(new InvalidParamError());
      }
      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError());
      }

    return {
      statusCode: 200,
      body: '',
    }
  } catch(err){
    return badRequest(new InvalidParamError());
  }
}}
