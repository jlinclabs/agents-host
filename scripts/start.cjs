#!/usr/bin/env node

import('../server/index.js').then(module => {
  module.default.start()
})
