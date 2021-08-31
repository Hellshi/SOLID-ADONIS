export class SingUpController {
  public handle = (body?: any) => {
    if (!body.name) {
      return {
        body: 'Missing name',
        statusCode: 400,
      }
    }
    if (!body.email) {
      return {
        body: 'missing email',
        statusCode: 400,
      }
    }
  }
}
