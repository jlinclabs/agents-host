import * as React from 'react'
import { useState, useEffect } from 'react'
import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'

import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper'
// import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import ErrorMessage from '../components/ErrorMessage'

async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return new EthereumAuthProvider(window.ethereum, addresses[0])
}

export default function LoginWithEthereum({...props}) {
  // if (!('ethereum' in window)) return
  const [error, setError] = useState()
  const [connection, connect, disconnect] = useViewerConnection()

  useEffect(
    () => {
      setError(undefined)
      if (connection.status === 'idle') {
        console.log('DONT DO THIS TWICE!')
        createAuthProvider().then(connect).catch(setError)
      } else if (connection.status === 'connecting') {
        if (props.onConnecting) props.onConnecting()
      } else if (connection.status === 'connected') {
        global.selfID = connection.selfID
        if (props.onConnect) props.onConnect(connection.selfID)
      }
    },
    [connection.status]
  )
  console.log('connection', connection)
  if (error) return <ErrorMessage {...{error}}/>
  return <Box>
    {connection.selfID
      ? <>
        connected as <Box>{connection.selfID.id}</Box>
      </>
      : <Box>{connection.status}</Box>
    }
  </Box>

  // if (connection.status === 'connected') {
  //   return <>
  //     <p>CONNECTED: ({connection.selfID.id})</p>
  //     <Button
  //       {...props}
  //       onClick={() => {
  //         disconnect()
  //       }}>
  //       disconnect
  //     </Button>
  //   </>
  // }

  // return <Button
  //   variant="contained"
  //   {...props}
  //   disabled={connection.status === 'connecting'}
  //   onClick={() => {
  //     createAuthProvider().then(connect)
  //   }}>
  //   Login with Ethereum
  // </Button>
}


// async function connect(setState){
//   setState('requesting ethereum accounts')
//   const [address] = await window.ethereum.request({
//     method: 'eth_requestAccounts'
//   })
//   setState(`looking up DID for ${address}`)
//   // console.log({ addresses })
//   // return addresses
//   const data = await idx.get(
//     'basicProfile',
//     `${address}@eip155:1`
//   )
//   console.log({data})
//   // if (data.name) setName(data.name)
//   // if (data.avatar) setImage(data.avatar)
// }
