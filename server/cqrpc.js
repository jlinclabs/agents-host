import CQRPC, { importActions } from 'cqrpc'

const cqrpc = new CQRPC({
  actions: await importActions({
    // 'actions/*/*.js'
    // 'actions/:namepsace/:action.js")
    glob: 'server/mod/*/actions/*.js',
    match: 'server/mod/:namespace/actions/:name.js',
  }),
})

console.log('Actions:')
for (const modName in cqrpc.actions){
  console.log(`  ${modName}:`)
  for (const actionName in cqrpc.actions[modName])
    console.log(`    ${actionName}`)
}
const routes = cqrpc.routes
export { routes }






/*

CQRPC - ideas


- how commands can report views as stale?
- if a user subscribes to say `/posts.popular` and
a command changes a popular post how will the command
know to emit a change event to the view? they would
have to have code like
this.makeViewsAsStale(`posts.all`)
this.makeViewsAsStale(`posts.${id}`)

every view has a uniq key (no options)
every command has a unique name (yes options)

*/




// import Router from 'express-promise-router'

// import env from '../env.js'
// import { isPrivateAction } from './actions.js'
// import { renderErrorAsJSON, renderUnauthorized } from './render.js'

// const routes = new Router()

// // CQRPC Command. Query. Remote. Procedure. Call
// routes.use('/api/v1/:action', async function(req, res, next) {
//   const { action } = req.params

//   let isQuery, options, methodName
//   if (req.method === 'GET'){
//     isQuery = true
//     options = JSON.parse(req.query.o || '{}')
//   }else if (req.method === 'POST'){
//     isQuery = false
//     options = req.body
//   }else{
//     return next()
//   }
//   const desc = (
//     // req.context.actorType + '.' +
//     // (isQuery ? 'queries' : 'commands') + '.' +
//     action + `(${JSON.stringify(options)})`
//   )

//   req.log('CQRPC: Start', desc)
//   try{
//     res.setHeader("Cache-Control", "no-cache, must-revalidate")
//     if (isPrivateAction(action)) return renderUnauthorized(res)
//     const methodName = isQuery ? 'get' : 'do'
//     const result = await req.context[methodName](action, options)

//     req.log(`CQRPC: Success`, desc)
//     if (!res.headersSent) res.status(200).json({ result })
//   }catch(error){
//     req.logError(`CQRPC: Error`, desc, error)
//     renderErrorAsJSON(res, error)
//   }
// })

// export { routes }
