export class InvalidParamError extends Error {
  constructor() {
    super('Invalid param provided')
    this.name = 'InvalidParamError'
  }
}
