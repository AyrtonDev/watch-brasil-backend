import type { Router } from 'express'
import type { HttpRequest } from '../../presentation/protocols'
import { makeLoginController } from '../factory/login'
import bcrypt from 'bcrypt'

export default (router: Router): void => {
  /**
   * @swagger
   * /login:
   *   post:
   *     description: Realiza o login de um usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       400:
   *         description: Dados inválidos fornecidos
   *       500:
   *         description: Erro interno do servidor
   */
  router.post('/login', async (req, res) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await makeLoginController().handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  })

  router.get('/test-hash', async (req, res) => {
    const hash = await bcrypt.hash('teste1234', 12)

    res.json({
      hashed_password: hash
    })
  })
}