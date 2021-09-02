import { DbAddAccount } from '../../../src/data/use-cases/add-account/add-account-repository'
import { EncrypterAdapter } from '../../../src/infra/cryptography/encrypyer-adapter'
import { AddAccountRepositoryPostgres } from '../../../src/infra/db/postgres/add-account-repository-postgres'
import { SingUpController } from '../../../src/presentation/sing-up'
import { EmailValidatorAdapter } from '../../../src/utils/email-validator-adapter'

export const makeSingUpController = (): SingUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountRepository = new AddAccountRepositoryPostgres()
  const encrypterAdapter = new EncrypterAdapter()
  const dbAccount = new DbAddAccount(encrypterAdapter, accountRepository)
  return new SingUpController(emailValidatorAdapter, dbAccount)
}
