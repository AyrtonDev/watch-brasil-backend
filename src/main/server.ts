import { PostgreeHelper } from '../infra/db/postgreedb/helpers/postgree-helper';
import app from './config/app'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT

PostgreeHelper.connect()
  .then(() => {
    app.listen(port, () => { 
      console.log(`Server running at http://localhost:${port}`); 
      console.log(`📄 Documentação disponível em http://localhost:${port}/api-docs`)
    })
  }).catch(console.error)
