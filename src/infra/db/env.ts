export default {
  host: process.env.DB_HOST ?? 'database-projects.cficcmoyiyca.us-east-2.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER ?? 'postuser',
  password: process.env.DB_PASSWORD ?? 'vic2015ayr',
  database: process.env.DB_NAME ?? 'postgres',
  ssl: { rejectUnauthorized: false }
}