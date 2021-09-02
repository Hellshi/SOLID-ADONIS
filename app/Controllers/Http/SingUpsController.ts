import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from '../../../src/main/adapter/adonis-routes-adapter'
import { makeSingUpController } from '../../../src/main/factories/sing-up'

export default class SingUpsController {
  public async singUp(ctx: HttpContextContract) {
    await adaptRoute(makeSingUpController())(ctx)
  }
}
