import * as express from 'express'
const app = express()

const { Nuxt, Builder } = require('nuxt')
const port = process.env.PORT || 3000

const config = {
  dev: false
}
config.dev = process.env.NODE_ENV === 'development'
const nuxt = new Nuxt()

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
})

if (config.dev) {
  new Builder(nuxt)
    .build()
    .then(listen)
    .catch((error: any) => {
      console.error(error)
      process.exit(1)
    })
}

function listen() {
  console.log('=== listen ===')
  // Listen the server
  app.listen(port)
  console.log('Server listening on `localhost:' + port + '`.')
}

export default app
