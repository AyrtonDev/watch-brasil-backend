import type { GetMoviesModel } from "../../domain/usecases/get-movies";

export interface GetMoviesRepository {
  get: () => Promise<GetMoviesModel[] | []>
}