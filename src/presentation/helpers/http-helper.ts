import { ServerError } from "../errors"
import type { HttpResponse } from "../protocols/http"

export const CLIENT_ERROR = 400
export const SERVER_ERROR = 500
export const STATUS_OK = 200
export const NOT_FOUND_ERROR = 404

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: CLIENT_ERROR,
    body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: SERVER_ERROR,
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: STATUS_OK,
  body: data
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: NOT_FOUND_ERROR,
  body: error
})