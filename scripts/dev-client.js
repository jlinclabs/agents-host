#!/usr/bin/env node

import childProcess from 'child-process-promise'

console.log(`starting parcel server on PORT=${process.env.PORT}`)
await childProcess.spawn(
  'npx',
  [
    'nodemon',
    '-w', `./client/package.json`,
    '-w', `./client/pnpm-lock.yaml`,
    '--exec',
    'npx',
    'parcel',
    'serve',
    '--port', `${process.env.PORT}`,
    '--no-cache',
    '--dist-dir', `./tmp/${process.env.APP_NAME}-client-build`, // change to per-app location ?
    '--public-url', `/assets`,
    `./client/index.html`,
  ],
  {
    stdio: ['ignore', 'inherit', 'inherit'],
  }
)
