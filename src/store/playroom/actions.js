import { firestoreAction } from 'vuexfire'
import { SUBSCRIBE, CREATE, ADD_ID } from './mutation-types'
import firebase, { firestore } from '~/plugins/firebase'

const collectionName = 'playrooms'
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const INIT_VALUE = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  timestamp
}
const firstGameNum = '1'

function collectionRef() {
  return firestore.collection(collectionName)
}

export default {
  bindPlayroomsRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef(collectionName, collectionRef())
  }),

  bindPlayroomRef: firestoreAction(({ bindFirestoreRef, getters }) => {
    bindFirestoreRef('playroom', collectionRef().doc(getters.id))
  }),

  [SUBSCRIBE]({ dispatch }) {
    dispatch('bindPlayroomsRef')
  },

  async [CREATE]() {
    const docRef = await collectionRef().add({
      timestamp
      // games: {
      //   rounds: [
      //     {
      //       history: [
      //         {
      //           squares: Array(9).fill(null)
      //         }
      //       ]
      //     }
      //   ]
      // }
    })

    docRef
      .collection('games')
      .doc(firstGameNum)
      .set({ ...INIT_VALUE })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    return docRef
  },

  ENTER({ dispatch }, payload) {
    const docId = payload
    dispatch(ADD_ID, docId)
    collectionRef()
      .doc(docId)
      .update({ players: firebase.firestore.FieldValue.increment(1) })
  },

  ADD_ID({ commit }, payload) {
    commit(ADD_ID, payload)
  }
}
