import { MissingParamError } from './error/missing-param-error'
import { SingUpController } from './sing-up'

describe('', () => {
  const makeSut = () => {
    return new SingUpController()
  }
  it('SingUp should return 400 when no name is provided', async () => {
    const singUp = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await singUp.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
    expect(httpResponse!.statusCode).toBe(400)
  })

  it('SingUp should return 400 when no email is provided', async () => {
    const singUp = makeSut()
    const httpRequest = {
      body: {
        name: 'HELLLLLL',
        password: '123456',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await singUp.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('SingUp should return 400 when no password is provided', async () => {
    const singUp = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        passwordConfirmation: '123456',
      },
    }
    const httpResponse = await singUp.handle(httpRequest)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
    expect(httpResponse.statusCode).toBe(400)
  })
  it('SingUp should return 400 when no passwordConfirmation is provided', async () => {
    const singUp = makeSut()
    const httpRequest = {
      body: {
        email: 'from@hell.com',
        name: 'HELLLLLL',
        password: '123456',
      },
    }
    const httpResponse = await singUp.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
