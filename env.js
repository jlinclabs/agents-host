import { fileURLToPath, URL } from 'url'
import Path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

dotenv.config()

process.env.NODE_ENV ??= "development"

for (const prop of [
  'NODE_ENV',
  'PORT',
  'ORIGIN',
  'APP_COLOR',
  'SESSION_SECRET',
  'UPLOADS_PATH',
  'VAULTS_PATH',
  // 'DATABASE_URL',
  'IPFS_API_URL',
  // 'CERAMIC_API_URL',
  // 'CERAMIC_NODE_SECRET',
]){
  if (!process.env[prop]) {
    console.error(`process.env.${prop} is missing!`)
    process.exit(1)
  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const origin = new URL(process.env.ORIGIN)

const env = {
  APP_ROOT: __dirname,
  BUILD_PATH: Path.join(__dirname, 'client-build'),
  NODE_ENV: process.env.NODE_ENV,
  HOST: `${origin.host}`,
  PORT: process.env.PORT,
  ORIGIN: `${origin}`,
  APP_COLOR: process.env.APP_COLOR,
  SESSION_SECRET: process.env.SESSION_SECRET,
  UPLOADS_PATH: process.env.UPLOADS_PATH,
  VAULTS_PATH: process.env.VAULTS_PATH,
  DATABASE_URL: process.env.DATABASE_URL,
  IPFS_API_URL: process.env.IPFS_API_URL,
  // CERAMIC_API_URL: process.env.CERAMIC_API_URL,
  // CERAMIC_NODE_SECRET: process.env.CERAMIC_NODE_SECRET,
  // COMPOSEDB_ADMIN_DID: process.env.COMPOSEDB_ADMIN_DID,
  // COMPOSEDB_PRIVATE_KEY: process.env.COMPOSEDB_PRIVATE_KEY,
}

console.log({ env })

export default env
