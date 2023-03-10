#!/usr/bin/env node

import { fileURLToPath } from 'url'
import Path from 'path'
import findPort from 'find-open-port'
import concurrently from 'concurrently'
import dotenv from 'dotenv'


const envFile = process.argv[2] || '.env'
dotenv.config({ path: envFile })
const { default: env } = await import('../env.js')

const clientServerPort = await findPort()

await concurrently(
  [
    {
      name: `client`,
      command: `./scripts/dev-client.js`,
      env: {
        PORT: clientServerPort,
      },
    },
    {
      name: `server`,
      command: `./scripts/dev-server.js`,
      env: {
        CLIENT_SERVER_PORT: clientServerPort,
      },
    },
    // {
    //   name: `${process.env.APP_NAME} prisma`,
    //   command: `./scripts/prisma studio`,
    //   env: {
    //     BROWSER: 'none',
    //     PORT: await findPort(),
    //   },
    // },
  ],
  {
    // killOthers: ['failure', 'success'],
    cwd: process.env.APP_ROOT,
  }
)
