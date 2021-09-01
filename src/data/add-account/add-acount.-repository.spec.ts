import test from 'japa'
import { AddAccountRepository } from './add-account-repository'

test.group('Add account', () => {
  const makeEncrypter = () => {
    class EncrypterStub {
      public async encrypt(value: string): Promise<string> {
        return new Promise((resolve, reject) => reject(new Error()))
      }
    }
    return new EncrypterStub()
  }
  const makeSut = () => {
    const encrypterStub = makeEncrypter()
    return new AddAccountRepository(encrypterStub)
  }
  test('ensure it throws if encrypter trows', async (assert) => {
    const sut = makeSut()
    const fakeUser = {
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: '123456',
    }
    const promise = await sut.add(fakeUser)
    assert.fail(promise)
  })
})
