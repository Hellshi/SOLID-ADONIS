import { MissingParamError } from './error/missing-param-error'
import { SingUpController } from './sing-up'
import { EmailValidator } from './protocols'
import { InvalidParamError } from './error/invalid-param-error'
import test from 'japa'
interface Sut {
  sut: SingUpController
  emailValidatorStub: EmailValidator
}
const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    public async isValid(_email: string): Promise<Boolean> {
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

test.group('SingUp', () => {
  test('SingUp should return 400 when no name is provided', async (assert) => {
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
    assert.equal(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('SingUp should return 400 when no email is provided', async (assert) => {
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
    assert.equal(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })

  test('SingUp should return 400 when no password is provided', async (assert) => {
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
    console.log({ error, body: httpResponse.body })
    assert.equal(httpResponse.body, error)
    assert.strictEqual(httpResponse.statusCode, 400)
  })
  test('SingUp should return 400 when no passwordConfirmation is provided', async (assert) => {
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
    assert.equal(httpResponse.body, error)
    assert.equal(httpResponse.statusCode, 400)
  })
})
