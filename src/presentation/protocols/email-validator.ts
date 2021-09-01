/* eslint-disable prettier/prettier */
export interface EmailValidator {
  isValid(email: string): Promise<Boolean>
}
