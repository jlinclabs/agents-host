#!/usr/bin/env node

// import { fileURLToPath } from 'url'
// import Path from 'path'
// import findPort from 'find-open-port'
// import concurrently from 'concurrently'

// const APP_ROOT = Path.resolve(Path.dirname(fileURLToPath(import.meta.url)), '..')
// process.cwd(APP_ROOT)

// const { default: servers } = await import("../dev/servers.json", { assert: { type: "json" } })

// const processes = []

// for (const server of servers){
//   const clientServerPort = await findPort()
//   processes.push({
//     name: `${server.APP_NAME} client`,
//     command: `./scripts/dev-client.js`,
//     env: {
//       ...server,
//       PORT: clientServerPort,
//     },
//   })
//   processes.push({
//     name: `${server.APP_NAME} server`,
//     command: `./scripts/dev-server.js`,
//     env: {
//       ...server,
//       CLIENT_SERVER_PORT: clientServerPort,
//     },
//   })
//   processes.push({
//     name: `${server.APP_NAME} prisma`,
//     command: `./scripts/prisma studio`,
//     env: {
//       ...server,
//       BROWSER: 'none',
//       PORT: await findPort(),
//     },
//   })
// }

// await concurrently(processes, {
//   // killOthers: ['failure', 'success'],
//   cwd: APP_ROOT,
// })
