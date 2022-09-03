export default function randomString(length){
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const charLength = chars.length

  let ints = new Uint32Array(length)
  crypto.getRandomValues(ints)
  ints = [...ints]

  let result = ''
  while(ints.length > 0){
    result += chars.charAt(ints.shift() % charLength)
  }
  return result
}
