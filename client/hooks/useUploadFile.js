import useAsync from './useAsync.js'
import { uploadFile } from '../lib/uploads.js'

export function useUploadFile(config){
  return useAsync(uploadFile, config)
}
