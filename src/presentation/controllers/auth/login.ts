import type { Encrypter } from "../../../data/protocols/encrypt";
import { InvalidParamError, MissingParamError, NotFoundError } from "../../errors";
import { WrongParamError } from "../../errors/wrong-param-error";
import { badRequest, ok, serverError, notFound, notAuthorized } from "../../helpers/http-helper";
import type { JWT } from "../../protocols/jwt";
import type { Controller, HttpRequest, HttpResponse, EmailValidator, GetAccount } from "./auth-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly getAccount: GetAccount
  private readonly jwt: JWT
  private readonly encrypt: Encrypter

  constructor (emailValidator: EmailValidator, getAccount: GetAccount, jwt: JWT, encrypt: Encrypter) {
    this.emailValidator = emailValidator
    this.getAccount = getAccount
    this.jwt = jwt
    this.encrypt = encrypt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const account = await this.getAccount.get(email)

      if (!account) return notFound(new NotFoundError('account'))

      const isCorrectPassword = await this.encrypt.compare(password, account.password)

      if (!isCorrectPassword) return notAuthorized(new WrongParamError('password'))

      const token = this.jwt.generate({ email })

      return ok({ token })
    } catch(error) {
      return serverError()
    }
  }
}