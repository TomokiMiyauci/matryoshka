import { firestoreAction } from 'vuexfire'
import {
  ADD_WINNER,
  RESTART,
  ASSESS_STATUS,
  END_OF_GAME
} from './mutation-types'
import firebase, { firestore } from '~/plugins/firebase'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const INIT_VALUE = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  timestamp
}

function calculateWinner(squares) {
  return lines.some((line) => {
    const [a, b, c] = line
    return squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  })
}

export default {
  bindGameRef: firestoreAction(async ({ bindFirestoreRef, getters }) => {
    await bindFirestoreRef(
      'game',
      firestore
        .collection('playrooms')
        .doc(getters.playroomId)
        .collection('games')
        .orderBy('timestamp', 'desc')
    )
  }),

  [ASSESS_STATUS]({ getters, dispatch }) {
    const latestBoard = getters.latestBoard
    const isWinner = calculateWinner(latestBoard)

    if (isWinner) {
      dispatch(END_OF_GAME, 'FINISH')
    } else if (getters.cannotPlace) {
      dispatch(END_OF_GAME, 'DRAW')
    }
  },

  async turnAction({ dispatch, getters }, payload) {
    const latestBoard = getters.willBeNextBoard(payload)
    await dispatch('addHistoryRecord', latestBoard)
  },

  [END_OF_GAME]({ dispatch }, payload) {
    switch (payload) {
      case 'FINISH':
        dispatch(ADD_WINNER)
        break
      case 'DRAW':
        dispatch('ADD_DRAW')
        break
    }
    dispatch('modal/SHOW', 1, { root: true })
  },

  [RESTART]({ commit, dispatch }) {
    commit('INITIALIZE')
    dispatch('modal/HIDE', 1, { root: true })
  },

  addHistoryRecord({ getters, rootGetters }, payload) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: payload,
          player: rootGetters['player/name']
        })
      })
  },

  [ADD_WINNER]({ commit, getters }) {
    commit(ADD_WINNER, getters.latestPlayer)
  },

  ADD_DRAW({ commit }) {
    commit(ADD_WINNER, 'DRAW')
  },

  NEXT_GAME({ getters }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.nextRound.toString())
      .set({ ...INIT_VALUE })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }
}
