import type { Router } from "express"
import type { HttpRequest } from "../../presentation/protocols"
import { makeGetCategoriesController } from "../factory/category"

export default (router: Router): void => {
  router.get('/categories', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    const httpRequest: HttpRequest = {
      body: { token }
    }

    const httpResponse = await makeGetCategoriesController().handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  })
}