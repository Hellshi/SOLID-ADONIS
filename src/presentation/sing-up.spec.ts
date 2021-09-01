import { MissingParamError } from './error/missing-param-error'
import { SingUpController } from './sing-up'
import { EmailValidator } from './protocols'
import { InvalidParamError } from './error/invalid-param-error'
import test from 'japa'
interface Sut {
  sut: SingUpController
  invalidEmailSut: SingUpController
}
const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    public async isValid(_email: string): Promise<Boolean> {
      return true
    }
  }
  class EmailValidatorStubFalse implements EmailValidator {
    public async isValid(_email: string): Promise<Boolean> {
      return false
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const emailValidatorStubFalse = new EmailValidatorStubFalse()
  return {
    emailValidatorStub,
    emailValidatorStubFalse,
  }
}

const makeSut = (): Sut => {
  const { emailValidatorStub, emailValidatorStubFalse } = makeEmailValidator()
  const sut = new SingUpController(emailValidatorStub)
  const invalidEmailSut = new SingUpController(emailValidatorStubFalse)
  return {
    sut,
    invalidEmailSut,
  }
}

test.group('SingUp', () => {
  test('Should return 400 when no name is provided', async (assert) => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    const error = new MissingParamError('name')
    assert.include(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('Should return 400 when no email is provided', async (assert) => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'HELLLLLL',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    const error = new MissingParamError('email')
    assert.include(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('Should return 400 when no password is provided', async (assert) => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    const error = new MissingParamError('password')
    assert.include(httpResponse.body, error)
    assert.strictEqual(httpResponse.statusCode, 400)
  })
  test('Should return 400 when no passwordConfirmation is provided', async (assert) => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        password: '123456',
      },
    }
    const error = new MissingParamError('passwordConfirmation')
    const httpResponse = await sut.handle(httpRequest)
    assert.include(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('Should return 400 when an invalid email is provided', async (assert) => {
    const { invalidEmailSut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'from',
        passwordConfirmation: '123456',
        password: '123456',
      },
    }
    const httpResponse = await invalidEmailSut.handle(httpRequest)
    const error = new InvalidParamError('email')
    assert.include(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('Should return 400 when password confirmation fails', async (assert) => {
    const { invalidEmailSut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'from',
        passwordConfirmation: '123456',
        password: '123456',
      },
    }
    const httpResponse = await invalidEmailSut.handle(httpRequest)
    const error = new InvalidParamError('password confirmation')
    assert.include(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('Should return an account on suceess', async (assert) => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        passwordConfirmation: '123456',
        password: '123456',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    assert.include(httpResponse.body, {
      id: 'valid_id',
      name: 'any_name',
      email: 'valid_mail@mail.com',
      passwordConfirmation: '123456',
      password: '123456',
    })
    assert.equal(httpResponse.statusCode, 200)
  })
})
