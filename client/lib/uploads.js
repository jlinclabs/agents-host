export async function uploadFile(file){
  const maxFileSize = uploadFile.MAX_FILE_SIZE_IN_MB || 200
  if (!file) throw new Error(`file is required`)
  if (file.size > (maxFileSize  * 1000000))
    throw new Error(
      `"${file.name}" is too big. Please select a file smaller ` +
      `than ${maxFileSize}mb.`
    )
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(
    `/api/uploads`,
    {method: 'POST', body: formData}
  )
  if (!response.ok){
    throw new Error(`file upload failed ${response.statusCode}`)
  }
  const { error, url } = await response.json()
  if (error) throw new Error(error)
  return url
}
uploadFile.MAX_FILE_SIZE_IN_MB = 200