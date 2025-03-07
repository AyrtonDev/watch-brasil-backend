import { InvalidParamError, MissingParamError, NotFoundError } from "../../errors";
import { badRequest, ok, serverError, notFound } from "../../helpers/http-helper";
import type { Controller, HttpRequest, HttpResponse, EmailValidator, GetAccount } from "./auth-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly getAccount: GetAccount

  constructor (emailValidator: EmailValidator, getAccount: GetAccount) {
    this.emailValidator = emailValidator
    this.getAccount = getAccount
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

      const account = await this.getAccount.get({
        email,
        password
      })

      if (!account) return notFound(new NotFoundError('account'))

      return ok('token')
    } catch(error) {
      return serverError()
    }
  }
}