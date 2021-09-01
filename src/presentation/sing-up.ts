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
      const { name, email, passwordConfirmation, password } = httpResquest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation'));
      }
      const isValid = await this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

    return {
      statusCode: 200,
      body: {
        id: 'valid_id',
        name: 'any_name',
        email: 'valid_mail@mail.com',
        passwordConfirmation: '123456',
        password: '123456',
      },
    }
  } catch(err){
    console.log('erro??')
    return badRequest(new InvalidParamError(''));
  }
}}
