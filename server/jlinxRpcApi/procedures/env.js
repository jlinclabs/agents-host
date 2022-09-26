import env from '../../../environment.js'

export function getIPFSURL(){
  return {
    ipfsUrl: env.IPFS_API_URL,
  }
}
