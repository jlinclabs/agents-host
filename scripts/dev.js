#!/usr/bin/env node

process.env.NODE_ENV = "development"
import '../environment.js'

const {default: findPort} = await import('find-open-port')
const {default: concurrently} = await import('concurrently')

const serverPort = await findPort()
const apiServerUrl = `http://localhost:${serverPort}`

await concurrently(
  [
    {
      name: 'server',
      command: `./scripts/dev-server.js`,
      env: {
        PORT: serverPort
      },
    },
    {
      name: 'client',
      command: `./scripts/dev-client.js`,
      env: {
        API_SERVER: apiServerUrl,
      },
    },
    {
      name: 'prisma',
      command: `./scripts/prisma studio -p 5001`,
      env: {
        BROWSER: 'none',
      },
    },
  ],
  {
    killOthers: ['failure', 'success'],
    cwd: process.env.APP_PATH,
  }
)
