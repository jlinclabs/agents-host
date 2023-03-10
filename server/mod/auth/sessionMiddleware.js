import expressSession from 'express-session'

import env from '../../../env.js'
import sessionStore from './sessionStore.js'

export default expressSession({
  name: 'SESSION',
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  trustProxy: true,
  cookie: {
    sameSite: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure: false, // true unless behind reverse proxy
    httpOnly: true,
  },
  store: sessionStore,
})