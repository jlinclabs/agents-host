#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import childProcess from 'child-process-promise'

import env from '../env.js'

if (env.NODE_ENV && env.NODE_ENV !== "development")
  throw new Error('dev-client.js only works with NODE_ENV=development')

if (!process.env.API_SERVER)
  throw new Error('$API_SERVER is not set')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const proxyrc = {
  '/.well-known': { target: process.env.API_SERVER },
  '/api': { target: process.env.API_SERVER },
}

await writeFile(
  `${env.APP_ROOT}/.proxyrc`,
  JSON.stringify(proxyrc, null, 2)
)

await childProcess.spawn(
  'npx',
  [
    'nodemon',
    '-w', `${env.APP_ROOT}/package.json`,
    '-w', `${env.APP_ROOT}/pnpm-lock.yaml`,
    '--exec',
    'npx',
    'parcel',
    'serve',
    '--port', `${env.PORT}`,
    '--no-cache',
    '--dist-dir', `${env.APP_ROOT}/client-build`,
    `${env.APP_ROOT}/client/index.html`,
  ],
  {
    stdio: ['ignore', 'inherit', 'inherit'],
  }
)
