# agents.jlinx.io

## Features

- download and move your account to another instance
  - [x] encrypted leveldb for account data
  - [x] store vault secret in postgres
  - [x] Vault viewer
  - ¿¿ can you scan through the keys of a leveldb ??
  - LATER: make it exportable and importable to a new account

- [x] switch to one DID for your agent
  - [x] users can just have more than one

- [x] multiparty text agreements
- [ ] change apis to JSON RPC
- [ ] setup multiple local agent apps
- [ ] jlinx agent as a did document service
- [ ] deploy two agents instances
- [ ] pin files on ipfs.jlinx.io
- [ ] encrypted agreements 
- [ ] data sharing agreements (with events)

- auth
  - NOTE: implementing idx id3 "ceramic logic" will change how identifirs and profiles work
  - login with wallet
    - https://www.youtube.com/watch?v=t9gWZYJxk7c
    - id3
    - idx
  - grant agent DID access to act as your wallet DID
  - did document service
    - json rpc endpoint
    - for signing
    - authentication
  - one-click-auth to participating sites

- uploading files to IPFS
  - replace uploading files locally with IPFS

- data sharing agreements
  - rename SISAs to "data sharing agreements"
  - create a new agreement "type"
    - user can pick from a list of paragraphs
    - contract is stored on ceramic with schema
  - sign an instance of that agreement with another did
  - share data over that agreement

- notifications & real-time changes
  - worker process (thread?)
  - ¿can this be a "subscribe to changes" http "server sent events" endpoint?
  - watching ceramic streams

- data explorer
  - explore your personal leveldb database
  - explore ceramic tiles we're tracking
  - smart display that can hide secrets and link to places

- issue UCAN JWTs
  - cocoa
  - ucan.xyz


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
