import type { Router } from 'express'
import type { HttpRequest } from '../../presentation/protocols'
import { makeAccountController } from '../factory/account'

export default (router: Router): void => {
  router.get('/account', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    const httpRequest: HttpRequest = {
      body: { token }
    }

    const httpResponse = await makeAccountController().handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  })
}