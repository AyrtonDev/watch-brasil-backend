import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const SALT_NUMBER = 12

const makeSut = (): BcryptAdapter => new BcryptAdapter(SALT_NUMBER)

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

describe('Bcrypt adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT_NUMBER)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()) as never)
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})