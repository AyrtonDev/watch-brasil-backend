import type { MovieModel } from "../model/movie";

export interface GetMovieById {
  get: (movieId: string) => Promise<MovieModel | null> 
}