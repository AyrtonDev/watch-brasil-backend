import type { AccountModel } from "../../domain/model/account";

export interface GetAccountByEmailRepository {
  get: (email: string) => Promise<AccountModel | null>
}