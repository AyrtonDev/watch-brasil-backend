import jwt, { type JwtPayload } from 'jsonwebtoken'
import { JwtAdapter } from "./jwt-adapter"

const VALID_TIME = 90

jest.mock('jsonwebtoken', () => ({
  verify (): JwtPayload {
    return { id: 'valid_id', exp: VALID_TIME }
  },
  sign (id: string): string {
    return 'valid_token'
  },
}))

const makeSut = (): JwtAdapter => new JwtAdapter()

describe('JWT adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockReturnValueOnce()
    const isValid = sut.isValid('token_invalid')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('token_valid')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct token', () => {
    const sut = makeSut()
    const isJwtSpy = jest.spyOn(jwt, 'verify')
    sut.isValid('any_token')
    expect(isJwtSpy).toHaveBeenCalledWith('any_token', 'test_watch_brasil')
  })

  test('Should return null if refresh give a error', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockReturnValueOnce()
    const refresh = sut.refresh('invalid_token')
    expect(refresh).toBeNull()
  })

  test('Should create new token if generate its calls', () => {
    const sut = makeSut()
    const refresh = sut.refresh('old_token')
    expect(refresh).toBe('valid_token')
  })
})