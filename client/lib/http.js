import wait from 'wait'

export async function fetchJSON(method, url, body, tries = 0){
  const res = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401){
    throw new Error(`Unauthorized`)
  }
  if (res.status === 502){
    if (process.env.NODE_ENV !== 'production'){
      await wait(1000 * tries)
      return fetchJSON(method, url, body, tries + 1)
    }
    throw new Error(`API server looks down or you're offline`)
  }
  if (res.status === 504 && tries < 5) {
    await wait(500)
    return fetchJSON(method, url, body, tries + 1)
  }
  return await res.json()
}

export async function getJSON(url, body, tries = 0){
  return await fetchJSON('GET', url, body, tries)
}

export async function postJSON(url, body, tries = 0){
  return await fetchJSON('POST', url, body, tries)
}

export async function postToURL(url){
  // return await fetchJSON('POST', url, body, tries)
  const form = document.createElement('form')
  form.action = url
  form.method = 'POST'
  document.body.appendChild(form)
  form.submit()
}
