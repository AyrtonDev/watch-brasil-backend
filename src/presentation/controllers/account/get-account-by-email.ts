import type { GetProfiles } from "../../../domain/usecases/get-profiles";
import { NotFoundError } from "../../errors";
import { ok, serverError, notFound, notAuthorized } from "../../helpers/http-helper";
import type { JWT } from "../../protocols/jwt";
import type { Controller, HttpRequest, HttpResponse, GetAccount } from "./account-protocols";

export class AccountController implements Controller {
  private readonly getAccount: GetAccount
  private readonly jwt: JWT
  private readonly getProfiles: GetProfiles

  constructor (getAccount: GetAccount, jwt: JWT, getProfiles: GetProfiles) {
    this.getAccount = getAccount
    this.getProfiles = getProfiles
    this.jwt = jwt
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.body

      if (!token) {
        return notAuthorized()
      }

      const { email } = this.jwt.decoded(token)

      const account = await this.getAccount.get(email)

      if (!account) return notFound(new NotFoundError('account'))

      const profiles = await this.getProfiles.get(account.id)

      console.log(profiles)

      return ok('tudo certo')
    } catch(error) {
      return serverError()
    }
  }
}