import type { MovieModel } from "../../../domain/model/movie"
import type { GetMovieById,  GetMovieRepository} from "./db-get-movie.protocols"


export class DbGetMovie implements GetMovieById {
  private readonly getMovieRepository: GetMovieRepository

  constructor (getMovie: GetMovieRepository) {
    this.getMovieRepository = getMovie
  }
  async get (movieId: string): Promise<MovieModel | null> {
    const movie = await this.getMovieRepository.get(movieId)
    return movie
  }
}