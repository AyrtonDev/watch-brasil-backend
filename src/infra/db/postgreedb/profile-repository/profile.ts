import type { GetProfilesByAccountIdRepository } from "../../../../data/protocols/get-profle-by-account-id-respository";
import type { ProfileModel } from "../../../../domain/model/profile";
import { PostgreeHelper } from "../helpers/postgree-helper";

export class ProfilesPostgreeRepository implements GetProfilesByAccountIdRepository{
  async getAll (accountId: string): Promise<ProfileModel[] | null> {
    const query = 'SELECT * FROM profiles WHERE account_id = $1;';
    const result = await PostgreeHelper.client?.query(query, [accountId])

    if (result === undefined || result.rows.length === 0) {
      return null
    }

    return result.rows
  }
}