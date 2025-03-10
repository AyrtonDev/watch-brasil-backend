import type { ProfileModel } from "../../domain/model/profile";

export interface GetProfilesByAccountIdRepository {
  getAll: (account_id: string) => Promise<ProfileModel[] | null>
}