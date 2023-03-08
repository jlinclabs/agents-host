import env from '../../env.js'

export function getIPFSURL(){
  return {
    ipfsUrl: env.IPFS_API_URL,
  }
}
