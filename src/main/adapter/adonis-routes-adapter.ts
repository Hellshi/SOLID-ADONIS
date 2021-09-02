/* eslint-disable prettier/prettier */
import { Controller, HttpResponse, HttRequest } from '../../../src/presentation/protocols'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const adaptRoute = (controller: Controller) => async ({ request, response }: HttpContextContract) => {
    const httpRequest: HttRequest = { body: request.body() }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
