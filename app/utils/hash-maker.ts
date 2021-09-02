import Hash from '@ioc:Adonis/Core/Hash'

export const makeHash = async (password: string): Promise<string> => await Hash.make(password)
