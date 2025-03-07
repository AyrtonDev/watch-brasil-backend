import type { Express } from 'express'
import { Router } from 'express'

export default (app: Express): void => {
  const router = Router()

  const routeFiles = fg.sync('**/src/main/routes/**-routes.ts')

  routeFiles.map(async file => {
    const route = await import(`../../../${file}`)
    route.default(router)
  })
}