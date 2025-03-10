import { DbGetCategory } from "../../data/usecases/get-category/db-get-category-repository"
import { DbGetMovie } from "../../data/usecases/get-movie/db-get-movie"
import { DbGetMovies } from "../../data/usecases/get-movie/db-get-movies"
import { CategoryPostgreeRepository } from "../../infra/db/postgreedb/category-repository/get-category"
import { MoviesPostgreeRepository } from "../../infra/db/postgreedb/movie-repository/get-moveis"
import { MoviePostgreeRepository } from "../../infra/db/postgreedb/movie-repository/get-movie"
import { GetMovieByIdController } from "../../presentation/controllers/movie/get-movie-by-id"
import { GetMoviesController } from "../../presentation/controllers/movie/get-movies"
import { JwtAdapter } from "../../utils/jwt-adapter"

export const makeGetMoviesController = (): GetMoviesController => {
  const moviesPostgreeRepository = new MoviesPostgreeRepository()
  const dbGetMovies = new DbGetMovies(moviesPostgreeRepository)
  const jwtAdapter = new JwtAdapter()
  return new GetMoviesController(dbGetMovies, jwtAdapter)
}

export const makeGetMovieController = (): GetMovieByIdController => {
  const moviePostgreeRepository = new MoviePostgreeRepository()
  const categoryPostgreeRepository = new CategoryPostgreeRepository()
  const dbGetMovie = new DbGetMovie(moviePostgreeRepository)
  const dbGetCategory = new DbGetCategory(categoryPostgreeRepository)
  const jwtAdapter = new JwtAdapter()
  return new GetMovieByIdController(dbGetMovie, jwtAdapter, dbGetCategory)
}