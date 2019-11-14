import { firestoreAction } from 'vuexfire'
import { SUBSCRIBE, CREATE } from './mutation-types'
import firebase, { firestore } from '~/plugins/firebase'

const collectionName = 'playrooms'
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

function collectionRef() {
  return firestore.collection(collectionName)
}

export default {
  bindPlayroomsRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef(collectionName, collectionRef())
  }),

  [SUBSCRIBE]({ dispatch }) {
    dispatch('bindPlayroomsRef')
  },

  async [CREATE]() {
    const docRef = await collectionRef()
      .add({ timestamp })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    return docRef
  }
}
