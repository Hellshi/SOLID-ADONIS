import test from 'japa'
import { AccountModel } from 'src/domain/models/account'
import { AddAccountModel } from 'src/domain/use-cases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { DbAddAccount } from './add-account-repository'

test.group('Add account', () => {
  const makeEncrypter = () => {
    class EncrypterStubFalling {
      public async encrypt(value: string): Promise<string> {
        return new Promise((resolve, reject) => reject(new Error()))
      }
    }
    class EncrypterStub {
      public async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_value'))
      }
    }
    return {
      encrypterStubError: new EncrypterStubFalling(),
      encrypterStub: new EncrypterStub(),
    }
  }

  const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      public async add(dataAccount: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_value',
        }
        return new Promise((resolve) => resolve(fakeAccount))
      }
    }
    return new AddAccountRepositoryStub()
  }

  const makeSut = () => {
    const addAccountRepository = makeAddAccountRepository()
    const { encrypterStub, encrypterStubError } = makeEncrypter()
    const sutError = new DbAddAccount(encrypterStubError, addAccountRepository)
    const sut = new DbAddAccount(encrypterStub, addAccountRepository)
    return {
      sut,
      sutError,
    }
  }
  test('ensure it throws if encrypter trows', async (assert) => {
    const { sutError } = makeSut()
    const fakeUser = {
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: '123456',
    }
    try {
      await sutError.add(fakeUser)
    } catch (err) {
      assert.exists(err)
    }
  })

  test('Ensure an account is returned on sucess', async (assert) => {
    const { sut } = makeSut()
    const fakeUser = {
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: '123456',
    }
    const promise = await sut.add(fakeUser)
    assert.include(promise, {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_value',
    })
  })
})
