import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool
