#!/usr/bin/env node

import { fileURLToPath } from 'url'
import Path from 'path'
import findPort from 'find-open-port'
import concurrently from 'concurrently'
import env from '../env.js'

// const APP_ROOT = Path.resolve(Path.dirname(fileURLToPath(import.meta.url)), '..')
// process.cwd(APP_ROOT)

const clientServerPort = await findPort()

await concurrently(
  [
    {
      name: `${process.env.APP_NAME} client`,
      command: `./scripts/dev-client.js`,
      env: {
        PORT: clientServerPort,
      },
    },
    {
      name: `${process.env.APP_NAME} server`,
      command: `./scripts/dev-server.js`,
      env: {
        CLIENT_SERVER_PORT: clientServerPort,
      },
    },
    {
      name: `${process.env.APP_NAME} prisma`,
      command: `./scripts/prisma studio`,
      env: {
        BROWSER: 'none',
        PORT: await findPort(),
      },
    },
  ],
  {
    // killOthers: ['failure', 'success'],
    cwd: process.env.APP_ROOT,
  }
)
