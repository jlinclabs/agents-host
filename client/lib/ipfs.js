import { create, urlSource } from 'ipfs-http-client'
import { rpc  } from './rpc'

let ipfs

let ready = async () => {
  const promise = (async () => {
    const { ipfsUrl } = await rpc('env.getIPFSURL')
    console.log({ ipfsUrl })
    ipfs = create({ url: ipfsUrl })
  })()
  ready = () => promise
}

export async function addFromUrl(...args){
  await ready()
  return await ipfs.add(urlSource(...args))
}

export async function uploadFile(file){
  await ready()
  // ipfs.ipfs.add('hello world')
}


window.ipfs = {
  get ipfs(){ return ipfs },
  ready,
}
