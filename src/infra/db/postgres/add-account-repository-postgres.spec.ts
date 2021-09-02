import test from 'japa'
import { AddAccountRepositoryPostgres } from './add-account-repository-postgres'

test.group('Add account Repository', () => {
  test('Should return an account on sucess', async (assert) => {
    const sut = new AddAccountRepositoryPostgres()
    const account = await sut.add({
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
    })
    assert.exists(account)
    assert.exists(account.id)
    assert.equal(account.name, 'any_name')
    assert.equal(account.password, 'any_password')
    assert.equal(account.email, 'any_email@mail.com')
  })
})
