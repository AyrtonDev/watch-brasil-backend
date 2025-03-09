import type { GetAccountByEmailRepository } from "../../../../data/protocols/get-account-by-email-repository";
import type { AccountModel } from "../../../../domain/model/account";
import { PostgreeHelper } from "../helpers/postgree-helper";

export class AccountPostgreeRepository implements GetAccountByEmailRepository {
  async get (email: string): Promise<AccountModel | null> {
    const query = 'SELECT * FROM accounts WHERE email = $1 LIMIT 1;';
    const result = await PostgreeHelper.client?.query(query, [email])

    if (result === undefined || result.rows.length === 0) {
      return null
    }

    return result.rows[0]
  }
}