import { MissingParamError } from './error/missing-param-error'
import { SingUpController } from './sing-up'
import { EmailValidator } from './protocols'
import { InvalidParamError } from './error/invalid-param-error'
interface Sut {
  sut: SingUpController
  emailValidatorStub: EmailValidator
}

describe('', () => {
  const makeEmailValidator = () => {
    class EmailValidatorStub implements EmailValidator {
      public isValid(_email: string): boolean {
        return true
      }
    }
    return new EmailValidatorStub()
  }

  const makeSut = (): Sut => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new SingUpController(emailValidatorStub)
    return {
      sut,
      emailValidatorStub,
    }
  }
  it('SingUp should return 400 when no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
    expect(httpResponse!.statusCode).toBe(400)
  })

  it('SingUp should return 400 when no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'HELLLLLL',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('SingUp should return 400 when no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
    expect(httpResponse.statusCode).toBe(400)
  })
  it('SingUp should return 400 when no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        password: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  it('SingUp should return 400 when a invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid@mail.com',
        name: 'HELLLLLL',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError())
    expect(httpResponse.statusCode).toBe(400)
  })
})
