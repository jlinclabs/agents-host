import { ComposeClient } from '@composedb/client'

import { definition } from './__generated__/definition.js'

export const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })