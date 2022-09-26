import { fileURLToPath } from 'url'
import Path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

dotenv.config()

for (const prop of [
  'NODE_ENV',
  'PORT',
  'HOST',
  'APP_ORIGIN',
  'SESSION_SECRET',
  'VAULTS_PATH',
  'DATABASE_URL',
  'IPFS_API_URL',
  'CERAMIC_API_URL',
  'CERAMIC_NODE_SECRET',
]){
  if (!process.env[prop]) {
    console.error(`process.env.${prop} is missing!`)
    process.exit(1)
  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const env = {
  APP_ROOT: __dirname,
  BUILD_PATH: Path.join(__dirname, 'client', 'build'),
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  APP_ORIGIN: process.env.APP_ORIGIN,
  SESSION_SECRET: process.env.SESSION_SECRET,
  VAULTS_PATH: process.env.VAULTS_PATH,
  DATABASE_URL: process.env.DATABASE_URL,
  IPFS_API_URL: process.env.IPFS_API_URL,
  CERAMIC_API_URL: process.env.CERAMIC_API_URL,
  CERAMIC_NODE_SECRET: process.env.CERAMIC_NODE_SECRET,
}

console.log({ env })

export default env
