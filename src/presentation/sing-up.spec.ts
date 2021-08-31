import { SingUpController } from './sing-up'

describe('', () => {
  const makeSut = () => {
    return new SingUpController()
  }
  it('SingUp should return 400 when no name is provided', async () => {
    const singUp = makeSut()
    const body = {
      email: 'from@hell.com',
      password: '123456',
      passwordConfirmation: '123456',
    }
    const httpResponse = await singUp.handle(body)
    expect(httpResponse!.statusCode).toBe(400)
  })

  it('SingUp should return 400 when no email is provided', async () => {
    const singUp = makeSut()
    const body = {
      name: 'hell',
      password: '123456',
      passwordConfirmation: '123456',
    }
    const httpResponse = await singUp.handle(body)
    expect(httpResponse!.statusCode).toBe(400)
  })
})
