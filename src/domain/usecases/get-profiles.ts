import type { ProfileModel } from "../model/profile"

export interface GetProfiles {
  get: (accountId: string) => Promise<ProfileModel[] | null>
}