#!/usr/bin/env node

import('../server/create.js').then(async module => {
  console.log({ module })
  const server = await module.default()
  await server.start()
})
