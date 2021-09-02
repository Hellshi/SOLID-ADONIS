import { AddAccountRepository } from 'src/data/protocols/add-account-repository'
import { AccountModel } from 'src/domain/models/account'
import { AddAccountModel } from 'src/domain/use-cases/add-account'
import User from '../../../../app/Models/User'

export class AddAccountRepositoryPostgres implements AddAccountRepository {
  public async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await User.create(accountData)
    const response = { ...account, id: account.id.toString() }
    return response
  }
}
