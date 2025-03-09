export class WrongParamError extends Error {
  constructor (paramName: string) {
    super(`Access unauthorized because wrong param: ${paramName}`)
    this.name = 'WrongParamError'
  }
}