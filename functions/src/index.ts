import * as functions from 'firebase-functions'
import nuxtServer from './nuxt-server'

exports.nuxtServer = functions
  .region('asia-northeast1')
  .https.onRequest(nuxtServer)
