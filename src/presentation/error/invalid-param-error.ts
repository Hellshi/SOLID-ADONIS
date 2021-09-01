export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`Invalid ${param}`)
    this.name = 'InvalidParamError'
  }
}
