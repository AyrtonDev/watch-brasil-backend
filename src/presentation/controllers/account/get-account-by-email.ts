import { NotFoundError } from "../../errors";
import { ok, serverError, notFound } from "../../helpers/http-helper";
import type { JWT } from "../../protocols/jwt";
import type { Controller, HttpRequest, HttpResponse, EmailValidator, GetAccount } from "./account-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly getAccount: GetAccount
  private readonly jwt: JWT

  constructor (emailValidator: EmailValidator, getAccount: GetAccount, jwt: JWT) {
    this.emailValidator = emailValidator
    this.getAccount = getAccount
    this.jwt = jwt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body

      const account = await this.getAccount.get(email)

      if (!account) return notFound(new NotFoundError('account'))

      return ok({
        name: account.name,
        profiles: account.profiles
      })
    } catch(error) {
      return serverError()
    }
  }
}