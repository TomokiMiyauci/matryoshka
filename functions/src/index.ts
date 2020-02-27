import * as functions from 'firebase-functions'
import nuxtServer from './nuxt-server'

exports.nuxtServer = functions
  .runWith({ memory: '2GB' })
  .https.onRequest(nuxtServer)
