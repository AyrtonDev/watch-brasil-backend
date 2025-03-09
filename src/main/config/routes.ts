import { Router, type Express } from 'express'
import fs from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const files = fs.async('**/src/main/routes/**-routes.ts')

  files
    .then(resolve => resolve.map(async file => {
      const { default: route } = await import(`../../../${file}`)
      route(router)
    }))
    // eslint-disable-next-line no-console
    .catch((error: unknown) => { console.error(error); })
}