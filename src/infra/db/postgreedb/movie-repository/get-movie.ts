import type { GetMovieRepository } from "../../../../data/protocols/get-movie-repository";
import type { MovieModel } from "../../../../domain/model/movie";
import { PostgreeHelper } from "../helpers/postgree-helper";


export class MoviePostgreeRepository implements GetMovieRepository {
  async get (movieId: string): Promise<MovieModel | null> {
    const query = 'SELECT * FROM movies WHERE id = $1';
    const result = await PostgreeHelper.client?.query(query, [movieId])

    if (result === undefined || result.rows.length === 0) {
      return null
    }

    return result.rows[0]
  }
}