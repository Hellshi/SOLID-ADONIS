import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/use-cases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  private readonly addAccountRepository: AddAccountRepository

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  public async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    console.log(hashedPassword)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    })
    return account
  }
}
