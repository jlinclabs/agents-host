#!/usr/bin/env node
import { fileURLToPath } from 'url'
import Path from 'path'
import findPort from 'find-open-port'
import concurrently from 'concurrently'

const APP_PATH = Path.resolve(Path.dirname(fileURLToPath(import.meta.url)), '..')
console.log({ APP_PATH })

const { default: servers } = await import("../dev/servers.json", { assert: { type: "json" } })

const processes = []

for (const server of servers){
  const apiServerPort = await findPort()
  const prismaStudioPort = await findPort()
  const apiServerUrl = `http://localhost:${apiServerPort}`

  processes.push({
    name: `${server.APP_NAME} server`,
    command: `./scripts/dev-server.js`,
    env: {
      ...server,
      PORT: apiServerPort
    },
  })
  processes.push({
    name: `${server.APP_NAME} client`,
    command: `./scripts/dev-client.js`,
    env: {
      ...server,
      API_SERVER: apiServerUrl,
    },
  })
  processes.push({
    name: `${server.APP_NAME} prisma`,
    command: `./scripts/prisma studio -p 5001`,
    env: {
      ...server,
      BROWSER: 'none',
      PORT: prismaStudioPort,
    },
  })
}

await concurrently(processes, {
  killOthers: ['failure', 'success'],
  cwd: APP_PATH,
})



// await concurrently(
//   [
//     {
//       name: 'server',
//       command: `./scripts/dev-server.js`,
//       env: {
//         PORT: serverPort
//       },
//     },
//     {
//       name: 'client',
//       command: `./scripts/dev-client.js`,
//       env: {
//         API_SERVER: apiServerUrl,
//       },
//     },
//     {
//       name: 'prisma',
//       command: `./scripts/prisma studio -p 5001`,
//       env: {
//         BROWSER: 'none',
//       },
//     },
//   ],
//   {
//     killOthers: ['failure', 'success'],
//     cwd: process.env.APP_PATH,
//   }
// )
