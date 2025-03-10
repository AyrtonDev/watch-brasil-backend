import type { GetCategory } from "../../../domain/usecases/get-category"
import { NotFoundError } from "../../errors"
import { notAuthorized, notFound, ok, serverError } from "../../helpers/http-helper"
import type { JWT } from "../../protocols/jwt"
import type { Controller, GetMovieById, HttpRequest, HttpResponse } from "./movies-protocols"

export class GetMovieByIdController implements Controller {
  private readonly getMovieById: GetMovieById
  private readonly getCategory: GetCategory
  private readonly jwt: JWT

  constructor (getMoviesById: GetMovieById, jwt: JWT, getCategory: GetCategory) {
    this.getMovieById = getMoviesById
    this.getCategory = getCategory
    this.jwt = jwt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token, movieId } = httpRequest.body

      const isValid = this.jwt.isValid(token)

      if (!token || !isValid) {
        return notAuthorized()
      }

      const movie = await this.getMovieById.get(movieId)

      console.log(movie)

      if (!movie) return notFound(new NotFoundError('movie'))

      const category = await this.getCategory.get(movie.category_id)

      console.log(category)

      if (!category) return notFound(new NotFoundError('category'))

      return ok({
        id: movie.id,
        title: movie.title,
        describe: movie.description,
        img: movie.img,
        year: movie.released_year,
        category: category.name
      })
    } catch(error) {
      return serverError()
    }
  }
}