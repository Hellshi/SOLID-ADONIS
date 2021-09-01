/* eslint-disable prettier/prettier */
import { AddAccount } from 'src/domain/use-cases/add-account'
import { ServerError } from './error/internal-server-error'
import { InvalidParamError } from './error/invalid-param-error'
import { MissingParamError } from './error/missing-param-error'
import { badRequest, internalServerError, ok } from './helpers'
import { HttpResponse, HttRequest, Controller, EmailValidator } from './protocols'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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

    const account = await this.addAccount.add({
      name,
      email,
      password
    })

    return ok(account)

  } catch(err){
    return internalServerError(new ServerError())
  }
}}
