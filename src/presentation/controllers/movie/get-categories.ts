import type { GetCategories } from "../../../domain/usecases/get-categories"
import { notAuthorized, ok, serverError } from "../../helpers/http-helper"
import type { JWT } from "../../protocols/jwt"
import type { Controller, HttpRequest, HttpResponse } from "./movies-protocols"

export class GetCategoriesController implements Controller {
  private readonly getCategories: GetCategories
  private readonly jwt: JWT

  constructor (getCategories: GetCategories, jwt: JWT, ) {
    this.getCategories = getCategories
    this.jwt = jwt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.body

      const isValid = this.jwt.isValid(token)

      if (!token || !isValid) {
        return notAuthorized()
      }

      const categories = await this.getCategories.get()

      return ok(categories)
    } catch(error) {
      return serverError()
    }
  }
}