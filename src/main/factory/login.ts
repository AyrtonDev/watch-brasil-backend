import { DbGetAccount } from "../../data/usecases/get-account/db-get-account";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt-adapter";
import { AccountPostgreeRepository } from "../../infra/db/postgreedb/account-repository/account";
import { LoginController } from "../../presentation/controllers/auth/login";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { JwtAdapter } from "../../utils/jwt-adapter";

export const makeLoginController = (): LoginController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgreeRepository = new AccountPostgreeRepository()
  const dbGetAccount = new DbGetAccount(accountPostgreeRepository)
  return new LoginController(emailValidatorAdapter, dbGetAccount, jwtAdapter, bcryptAdapter)
}