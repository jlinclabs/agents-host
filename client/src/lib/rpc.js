import jaysonBrowserClient from 'jayson/promise/lib/client/browser'
// import fetch from 'node-fetch'

const callServer = request =>
  fetch('/api/jlinx/v0', {
    method: 'POST',
    body: request,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.text())

const client = new jaysonBrowserClient(callServer, {
  // other options go here
});

export async function rpc(name, options){
  const { result } = await client.request(name, options)
  return result
}

window.rpc = rpc
// client.request('multiply', [5, 5], function(err, error, result) {
//   if(err) throw err;
//   console.log(result); // 25
// });
