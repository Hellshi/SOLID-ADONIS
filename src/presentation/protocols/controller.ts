import { HttpResponse, HttRequest } from './htpp'

export interface Controller {
  handle(httpRequest: HttRequest): HttpResponse
}
