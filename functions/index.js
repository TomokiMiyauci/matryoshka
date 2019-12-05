const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   console.log(1)
//   response.send('Hello from Firebase!')
// })

exports.myFunction = functions.firestore
  .document('playrooms/{playroomId}')
  .onUpdate((change) => {
    const data = change.after.data()
    const previousData = change.before.data()

    console.log('start')

    if (data.isClose) return null
    if (data.players === previousData.players) return null
    if ('players' in data && data.players <= 0) {
      console.log('end')
      return change.after.ref.set(
        {
          isClose: true
        },
        { merge: true }
      )
    }
    return null
  })
