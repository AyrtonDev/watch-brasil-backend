import type { Encrypter } from "../../../data/protocols/encrypt"
import { InvalidParamError, MissingParamError, NotFoundError, ServerError } from "../../errors"
import { CLIENT_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } from "../../helpers/http-helper"
import type { JWT } from "../../protocols/jwt"
import type { EmailValidator, AccountModel, GetAccount } from "./auth-protocols"
import { LoginController } from "./login"

const makeEncrypt = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new EncrypterStub()
}

const makeJwt = (): JWT => {
  class JwtStub implements JWT {
    generate (id: string): string {
      return 'token_valid'
    }

    isValid (token: string): boolean {
      return true
    }

    refresh (token: string): string {
      return "new_token"
    }

    decoded (token: string): any {
      return { email: 'any_email@email.com'}
    }
  }

  return new JwtStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeGetAccount = (): GetAccount => {
  class GetAccountStub implements GetAccount {
    async get (email: string): Promise<AccountModel | null> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password',
        profiles: ['valid_profile_id']
      }

      return await Promise.resolve(fakeAccount)
    }
  }
  return new GetAccountStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  getAccountStub: GetAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const getAccountStub = makeGetAccount()
  const jwtStub = makeJwt()
  const encryptStub = makeEncrypt()
  const sut = new LoginController(emailValidatorStub, getAccountStub, jwtStub, encryptStub)

  return {
    sut,
    emailValidatorStub,
    getAccountStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if email no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password',
      }
    }
  
    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(CLIENT_ERROR)
    expect(httpsResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if password no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      }
    }
  
    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(CLIENT_ERROR)
    expect(httpsResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password'
      }
    }
  
    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(CLIENT_ERROR)
    expect(httpsResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }
    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(SERVER_ERROR)
    expect(httpsResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if GetAccount throws', async () => {
    const { sut, getAccountStub } = makeSut()
    jest.spyOn(getAccountStub, 'get').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }
    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(SERVER_ERROR)
    expect(httpsResponse.body).toEqual(new ServerError())
  })

  test('Should call GetAccount with correct values', async () => {
    const { sut, getAccountStub } = makeSut()
    const addSpy = jest.spyOn(getAccountStub, 'get')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 404 if account not found', async () => {
    const { sut, getAccountStub } = makeSut()
    jest.spyOn(getAccountStub, 'get').mockResolvedValueOnce(null)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }

    const httpsResponse = await sut.handle(httpRequest)
    expect(httpsResponse.statusCode).toBe(NOT_FOUND_ERROR)
    expect(httpsResponse.body).toEqual(new NotFoundError('account'))
  })
})