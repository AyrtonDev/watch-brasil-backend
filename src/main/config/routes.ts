import { Router, type Express } from 'express'
import fs from 'fast-glob'

const isProduction = process.env.NODE_ENV ?? 'production';
const baseDir = isProduction === 'production' ? 'dist' : 'src';
const fileExtension = isProduction === 'production' ? 'js' : 'ts';

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const files = fs.async(`**/${baseDir}/main/routes/**-routes.${fileExtension}`)

  files
    .then(resolve => resolve.map(async file => {
      const { default: route } = await import(`../../../${file}`)
      route(router)
    }))
     
    .catch((error: unknown) => { console.error(error); })
}