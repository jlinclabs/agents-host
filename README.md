# agents.jlinx.io

## Features

- download and move your account to another instance
  - [x] encrypted leveldb for account data
  - [x] store vault secret in postgres
  - [x] Vault viewer
  - LATER: make it exportable and importable to a new account

- [x] switch to one DID for your agent
  - [x] users can just have more than one

- [x] multiparty text agreements
- [x] change apis to JSON RPC
- [ ] IDX ID:3 auth
  - NEXT !!!
    - use the `selfID.get` and `set` to store a jlinx agent RPC endpoint
- [ ] encrypted agreements 
- [ ] did@origin 
  - `did:3:kjzl6cwe1jw147mtuuzu92zngrnnt2ewnfcvze4cx8u2s4v3e27vjxo38a0ps8r@agents.jlinx.test`
- [ ] HOW CAN WE DO AUTH??
  -  SEE OTHER IDEAS BELOW 
- [ ] contacts
- [ ] message passing agreements
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


### Other Ideas

#### Login with {did}@{federationOrigin}

paste in some garbage like this

`did:3:kjzl6cwe1jw148pweqxffz9uxn01f4b739b4l7collcusm9pvtm3zkclisquam0@agents.jlinx.io`

which assumes a which set of DID API stuffs.

if all it did was asyncronous signing we'd be golden.

**this can also work with a didDocument.services entry for dids that support that**

#### loging with jlinx button
  - give federated id {username}@{federation}
  - federation is an https json rpc api
  - signup where you pick a federation always sucks

#### global cookie with JWT

you have a did
you sign a JWT into a global cookie
that JWT also contains a JSON RPC endpoint at a domain
the rpc has a public key at some endpoint
the rpc domain and also signed the JWT (or a JWT is nested)

when you visit a site
it sees this cookie
it verifies and decodes the jwt
it gets the rpc server (your federation's public key)
it checks that inner JWT
then maybe it
  …redirects you to some "magic" TBD login redirect process
  … or hits the rpc api and logs you in that way

#### did login endpoint

you have and app or website managing your dids

you put in the website you wanna login to
you select the did you want to use
it hits the website's did-login api 
sucess gives you a url to start your session




#### Problem

a did isnt enough
you need an endpoint the app can talk to


