#!/usr/bin/env node

import migrateSchemas from '../schema/migrate.js'

await migrateSchemas()
