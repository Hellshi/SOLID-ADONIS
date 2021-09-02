export class ServerError extends Error {
  constructor() {
    super('Internal server error')
    this.message = `Server error`
    this.name = 'ServerError'
  }
}
