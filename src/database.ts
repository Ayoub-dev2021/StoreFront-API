import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { POSTGRES_DB, POSTGRES_DB_TEST, PORT, HOST, POSTGRES_USER, POSTGRES_PASSWORD, ENV } =
  process.env

let client = new Pool({})

if (ENV == 'dev') {
  client = new Pool({
    host: HOST,
    port: PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB
  })
} else if (ENV == 'test') {
  client = new Pool({
    host: HOST,
    port: PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_TEST
  })
}

export default client
