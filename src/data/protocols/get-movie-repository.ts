import type { MovieModel } from "../../domain/model/movie";

export interface GetMovieRepository {
  get: (movieId: string) => Promise<MovieModel | null>
}