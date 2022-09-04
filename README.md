# agents.jlinx.io

## Features

- download and move your account to another instance
  - encrypted leveldb for account data
  - make login secret a valid keypair seed

- auth
  - login with wallet
    - id3
    - idx
  - grant agent DID access to act as your wallet DID
  - did document service for signing
    - json rpc endpoint
  - one-click-auth to participating sites

- issue UCAN JWTs
  - cocoa
  - ucan.xyz

- data sharing agreements
  - create a data shring agreements
  - sign an instance of that agreement with another did
  - share data over that agreement

- notifications & real-time changes
  - not worker process (thread?)
  - ¿can this be a "subscribe to changes" http "server sent events" endpoint?
  - watching ceramic streams
  

- data explorer
  - explore your personal leveldb database
  - explore ceramic tiles we're tracking


## Development

```bash
npm i
(cd client && npm i)
```


```
npm run dev
```


## Authentication

options: 
- passphrase
- email (magic links)
- wallet browser extension

- we need the vault key to act for you when youre not around
- we create a vault and a key and we hold that key for you
- we will give you the key and let you backup your database
