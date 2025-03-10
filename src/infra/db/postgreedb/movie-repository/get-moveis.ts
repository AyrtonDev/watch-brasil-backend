import type { GetMoviesRepository } from "../../../../data/protocols/get-movies-repository";
import type { GetMoviesModel } from "../../../../domain/usecases/get-movies";
import { PostgreeHelper } from "../helpers/postgree-helper";


export class MoviesPostgreeRepository implements GetMoviesRepository {
  async get (): Promise<GetMoviesModel[] | []> {
    const query = 'SELECT * FROM movies;';
    const result = await PostgreeHelper.client?.query(query)

    if (result === undefined || result.rows.length === 0) {
      return []
    }

    return result.rows
  }
}