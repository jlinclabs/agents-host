#!/usr/bin/env node

import { glob } from 'glob'
import concurrently from 'concurrently'

const servers = await glob('dev/servers/*/env')
console.log({ servers })

const processes = []

for (const envPath of servers){
  processes.push({
    name: envPath.split('/')[2],
    command: `./scripts/dev.js "${envPath}"`,
  })
}

await concurrently(processes)
