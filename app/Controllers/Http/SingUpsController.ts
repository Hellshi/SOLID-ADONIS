import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpResponse, HttRequest } from '../../../src/presentation/protocols'
import { adaptRoute } from '../../../src/main/adapter/adonis-routes-adapter'
import { makeSingUpController } from '../../../src/main/factories/sing-up'

export default class SingUpsController {
  public async singUp({ request, response }: HttpContextContract) {
    const httpRequest: HttRequest = { body: request.body() }
    console.log(httpRequest)
    const controller = makeSingUpController()
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
