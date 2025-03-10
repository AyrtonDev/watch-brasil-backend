import { PostgreeHelper } from '../infra/db/postgreedb/helpers/postgree-helper';
import app from './config/app'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

PostgreeHelper.connect()
  .then(() => {
    app.listen(port, () => { 
      console.log(`Server running at http://localhost:${port}`); 
      console.log(`📄 Documentação disponível em http://localhost:${port}/api-docs`)
    })
  }).catch(console.error)
