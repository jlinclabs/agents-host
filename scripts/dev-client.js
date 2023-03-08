#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import childProcess from 'child-process-promise'

import env from '../environment.js'

if (env.NODE_ENV && env.NODE_ENV !== "development")
  throw new Error('dev-client.js only works with NODE_ENV=development')

if (!env.API_SERVER)
  throw new Error('$API_SERVER is not set')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const proxyrc = {
  '/.well-known': { target: env.API_SERVER },
  '/api': { target: env.API_SERVER },
}

await writeFile(
  `${env.APP_PATH}/.proxyrc`,
  JSON.stringify(proxyrc, null, 2)
)

await childProcess.spawn(
  'npx',
  [
    'nodemon',
    '-w', `${env.APP_PATH}/package.json`,
    '-w', `${env.APP_PATH}/pnpm-lock.yaml`,
    '--exec',
    'npx',
    'parcel',
    'serve',
    '--port', `${env.PORT}`,
    '--no-cache',
    '--dist-dir', `${env.APP_PATH}/client-build`,
    `${env.APP_PATH}/client/index.html`,
  ],
  {
    stdio: ['ignore', 'inherit', 'inherit'],
  }
)
