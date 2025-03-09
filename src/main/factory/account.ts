import { DbGetAccount } from "../../data/usecases/get-account/db-get-account";
import { DbGetProfiles } from "../../data/usecases/get-profile/db-get-profile";
import { AccountPostgreeRepository } from "../../infra/db/postgreedb/account-repository/account";
import { ProfilesPostgreeRepository } from "../../infra/db/postgreedb/profile-repository/profile";
import { AccountController } from "../../presentation/controllers/account/get-account-by-email";
import { JwtAdapter } from "../../utils/jwt-adapter";

export const makeAccountController = ():AccountController => {
  const accountPostgreeRepository = new AccountPostgreeRepository()
  const profilePostgreeRepository = new ProfilesPostgreeRepository()
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(accountPostgreeRepository)
  const dbGetProfiles = new DbGetProfiles(profilePostgreeRepository)
  return new AccountController(dbGetAccount, jwtAdapter, dbGetProfiles)
} 