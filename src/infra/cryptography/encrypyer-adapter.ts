import { makeHash } from 'App/utils/hash-maker'
import { Encrypter } from 'src/data/protocols/encrypter'

export class EncrypterAdapter implements Encrypter {
  public async encrypt(value: string): Promise<string> {
    return await makeHash(value)
  }
}
