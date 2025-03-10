export interface GetMoviesModel {
  id: string
  title: string
  img: string
}

export interface GetMovies {
  get: () => Promise<GetMoviesModel[] | []>
}