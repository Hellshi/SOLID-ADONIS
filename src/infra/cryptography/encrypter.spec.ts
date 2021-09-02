import test from 'japa'
import Hash from '@ioc:Adonis/Core/Hash'
import { EncrypterAdapter } from './encrypyer-adapter'

test.group('Encrypter', () => {
  test('should return hash on sucess', async (assert) => {
    const sut = new EncrypterAdapter()
    const hashedPassword = await sut.encrypt('password')
    const hashIsValid = await Hash.verify(hashedPassword, 'password')
    assert.isTrue(hashIsValid)
  })
})
