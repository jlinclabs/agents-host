export default function expressErrorHandler(error, req, res, next) {
  console.error('EXPRESS ERROR', error)
  if (req.xhr) return renderErrorAsJSON(res, error)
  if (!res.headersSent) {
    res.status(500)
    if (req.accepts('json')){
      res.json({ error: { message: 'Something unexpected has happened :/' } })
    }else {
      res.send('Something unexpected has happened :/')
    }
  }else{
    console.error('UNREPORTED ERROR (headers already sent)', error)
  }
}