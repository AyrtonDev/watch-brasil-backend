import type { Router } from "express"
import type { HttpRequest } from "../../presentation/protocols"
import { makeGetMovieController, makeGetMoviesController } from "../factory/movies"

export default (router: Router): void => {
  router.get('/movies', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    const httpRequest: HttpRequest = {
      body: { token }
    }

    const httpResponse = await makeGetMoviesController().handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  })

  router.get('/movies/:id', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    const movieId = req.params.id

    const httpRequest: HttpRequest = {
      body: {
        token,
        movieId
      }
    }

    const httpResponse = await makeGetMovieController().handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  })
}