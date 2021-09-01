import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/use-cases/add-account'
import { Encrypter } from '../protocols/encrypter'

export class AddAccountRepository implements AddAccount {
  private readonly encrypter: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  public async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    return {
      id: 'valid_id',
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: '123456',
    }
  }
}
