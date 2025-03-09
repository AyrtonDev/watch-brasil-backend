import type { AccountModel, GetAccount, GetAccountByEmailRepository} from "./db-get-account.protocol"

export class DbGetAccount implements GetAccount {
  private readonly getAccountRepository: GetAccountByEmailRepository

  constructor (getAccountRepository: GetAccountByEmailRepository) {
    this.getAccountRepository = getAccountRepository
  }
  async get (email: string): Promise<AccountModel | null> {
    const account = await this.getAccountRepository.get(email)
    return account
  }
}