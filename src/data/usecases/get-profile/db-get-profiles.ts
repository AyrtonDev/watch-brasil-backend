import type { GetProfiles, GetProfilesByAccountIdRepository, ProfileModel } from "./db-get-profiles.protocols"

export class DbGetProfiles implements GetProfiles {
  private readonly getProfilesByAccountIdRepository: GetProfilesByAccountIdRepository

  constructor (getProfilesByAccountId: GetProfilesByAccountIdRepository) {
    this.getProfilesByAccountIdRepository = getProfilesByAccountId
  }
  async get (accountId: string): Promise<ProfileModel[] | null> {
    const profiles = await this.getProfilesByAccountIdRepository.getAll(accountId)
    return profiles
  }
}