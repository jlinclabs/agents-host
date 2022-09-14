import * as React from 'react'
import { useState, useEffect } from 'react'
import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'

// import { CeramicClient } from '@ceramicnetwork/http-client'
// import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
// import { DID } from 'dids'
// import { IDX } from '@ceramicstudio/idx'

import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper'
// import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import ErrorMessage from './ErrorMessage'

// // const ceramic = new CeramicClient('http://ipfs.jlinx.io:7007')
// const ceramic = new CeramicClient(location.origin)
// const idx = new IDX({ ceramic })

// ceramic.did = new DID({
//   resolver: {
//     // A Ceramic client instance is needed by the 3ID DID resolver to load DID documents
//     ...get3IDResolver(ceramic),
//     // `did:key` DIDs are used internally by 3ID DIDs, therefore the DID instance must be able to resolve them
//     ...getKeyResolver(),
//   },
// })


// global.ceramic = ceramic
// global.idx = idx


async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return new EthereumAuthProvider(window.ethereum, addresses[0])
}


export default function LoginWithEthereum({...props}) {
  if (!('ethereum' in window)) return
  const [connection, connect, disconnect] = useViewerConnection()
  console.log({ connection })
  if (connection.status === 'connected') {
    return <Button
      {...props}
      onClick={() => {
        disconnect()
      }}>
      Disconnect ({connection.selfID.id})
    </Button>
  }


  return <Button
    {...props}
    disabled={connection.status === 'connecting'}
    onClick={() => {
      createAuthProvider().then(connect)
    }}>
    Login with Ethereum
  </Button>
}


async function connect(setState){
  setState('requesting ethereum accounts')
  const [address] = await window.ethereum.request({
    method: 'eth_requestAccounts'
  })
  setState(`looking up DID for ${address}`)
  // console.log({ addresses })
  // return addresses
  const data = await idx.get(
    'basicProfile',
    `${address}@eip155:1`
  )
  console.log({data})
  // if (data.name) setName(data.name)
  // if (data.avatar) setImage(data.avatar)
}
