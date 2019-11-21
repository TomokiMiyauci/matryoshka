import { firestoreAction } from 'vuexfire'
import { SUBSCRIBE, CREATE, ADD_ID } from './mutation-types'
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
    const docRef = await collectionRef().add({
      timestamp,
      games: {
        rounds: [
          {
            history: [
              {
                squares: Array(9).fill(null)
              }
            ]
          }
        ]
      }
    })

    docRef
      .collection('history')
      .add({})
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    return docRef
  },

  ENTER({ dispatch }, payload) {
    const docId = payload
    collectionRef()
      .doc(docId)
      .update({ players: firebase.firestore.FieldValue.increment(1) })
    dispatch(ADD_ID, docId)
  },

  ADD_ID({ commit }, payload) {
    commit(ADD_ID, payload)
  }
}
