import { SingUpController } from './sing-up'

describe('', () => {
  it('SingUp should return 400 when no name is provided', async () => {
    const singUp = new SingUpController()
    const body = {
      email: 'from@hell.com',
      password: '123456',
      passwordConfirmation: '123456',
    }
    const httpResponse = await singUp.handle(body)
    expect(httpResponse.statusCode).toBe(400)
  })
})
