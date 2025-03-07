import type { AccountModel } from "../model/account"

export interface GetAccountModel {
  email: string
  password: string
}

export interface GetAccount {
  get: (account: GetAccountModel) => Promise<AccountModel | undefined>
}