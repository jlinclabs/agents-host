#!/usr/bin/env node

import childProcess from 'child-process-promise'

process.env.NODE_ENV = "development"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import '../env.js'

await childProcess.spawn(
  'npx',
  [
    'nodemon',
    '-w', `./scripts/start.js`,
    '-w', `./scripts/dev-server.js`,
    '-w', `./package.json`,
    '-w', `./pnpm-lock.yaml`,
    '-w', `./env.js`,
    '-w', `./lib`,
    '-w', `./server`,
    '--exec',
    `./scripts/start.js`,
  ],
  {
    cwd: process.env.APP_ROOT,
    stdio: ['ignore', 'inherit', 'inherit'],
  }
)
