import { notAuthorized, ok, serverError } from "../../helpers/http-helper"
import type { JWT } from "../../protocols/jwt"
import type { Controller, GetMovies, HttpRequest, HttpResponse } from "./movies-protocols"

export class GetMoviesController implements Controller {
  private readonly getMovies: GetMovies
  private readonly jwt: JWT

  constructor (getMovies: GetMovies, jwt: JWT, ) {
    this.getMovies = getMovies
    this.jwt = jwt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.body

      const isValid = this.jwt.isValid(token)

      if (!token || !isValid) {
        return notAuthorized()
      }

      const movies = await this.getMovies.get()

      return ok(movies.map(movie => ({
          id: movie.id,
          title: movie.title,
          img: movie.img
        }))
      )
    } catch(error) {
      return serverError()
    }
  }
}