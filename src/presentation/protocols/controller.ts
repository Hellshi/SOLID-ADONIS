import { HttpResponse, HttRequest } from './htpp'

export interface Controller {
  handle(httpResquest: HttRequest): Promise<HttpResponse>
}
