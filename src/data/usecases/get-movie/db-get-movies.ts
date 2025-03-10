import type { GetMovies, GetMoviesModel, GetMoviesRepository } from "./db-get-movie.protocols"


export class DbGetMovies implements GetMovies {
  private readonly getMoviesRepository: GetMoviesRepository

  constructor (getMovies: GetMoviesRepository) {
    this.getMoviesRepository = getMovies
  }
  async get (): Promise<GetMoviesModel[] | []> {
    const movies = await this.getMoviesRepository.get()
    return movies
  }
}