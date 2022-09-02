import { fileURLToPath } from 'url'
import Path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

dotenv.config()

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

// for (const prop of [
//   'NODE_ENV',
//   // 'REACT_APP_NAME',
//   // 'REACT_APP_COLOR',
//   // 'PORT',
//   // 'HOST',
//   // 'URL',
//   // 'SESSION_SECRET',
//   // 'DATABASE_URL',
//   // 'CERAMIC_API_URL',
//   // 'CERAMIC_NODE_SECRET',
// ]){
//   if (!process.env[prop]) {
//     console.error(`process.env.${prop} is missing!`)
//     process.exit(1)
//   }
// }




const env = {
  // NODE_ENV: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  APP_ROOT: __dirname,
  BUILD_PATH: Path.join(__dirname, 'client', 'build'),

  // NODE_ENV: process.env.NODE_ENV,
  // APP_NAME: process.env.REACT_APP_NAME,
  // APP_COLOR: process.env.REACT_APP_COLOR,
  // URL: process.env.URL,
  // SESSION_SECRET: process.env.SESSION_SECRET,
  // DATABASE_URL: process.env.DATABASE_URL,
  // CERAMIC_API_URL: process.env.CERAMIC_API_URL,
  // CERAMIC_NODE_SECRET: process.env.CERAMIC_NODE_SECRET,
}

// if (process.env.NODE_ENV === 'production') {

// }
// if (process.env.NODE_ENV === 'development') {
//   env.CLIENT_PORT = process.env.CLIENT_PORT
// }

console.log(env)

export default env
