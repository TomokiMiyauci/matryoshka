import { firestoreAction } from 'vuexfire'
import {
  ADD_WINNER,
  PASS_THE_TURN,
  ADVANCE_TURN,
  CHANGE_TURN_PLAYER,
  REGISTER_AS_PLAYER,
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // console.log(a, b, c)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true
    }
  }
}

// isSettled({ commit }, squares) {
//   lines.forEach((line) => {
//     const [a, b, c] = line
//     console.log(a, b, c)
//     if (
//       squares[a] &&
//       squares[a] === squares[b] &&
//       squares[a] === squares[c]
//     ) {
//       return true
//     }
//   })
// },

export default {
  // bindPlayroomRef: firestoreAction(
  //   async ({ bindFirestoreRef, rootGetters }) => {
  //     await bindFirestoreRef(
  //       'game',
  //       firestore.collection('playrooms').doc(rootGetters['playroom/id'])
  //     )
  //   }
  // ),

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
      dispatch(END_OF_GAME)
    }
  },

  async turnAction({ dispatch, getters }, payload) {
    const latestBoard = getters.willBeNextBoard(payload)

    await dispatch('addHistoryRecord', latestBoard)
    if (!calculateWinner(latestBoard)) {
      // dispatch(ADVANCE_TURN)
      dispatch(CHANGE_TURN_PLAYER)
    }
  },

  [ADVANCE_TURN]({ state, commit }) {
    commit(PASS_THE_TURN, state.game.games.rounds[0].history.length - 1)
  },

  [END_OF_GAME]({ dispatch }) {
    dispatch(ADD_WINNER)
    dispatch('modal/SHOW', 1, { root: true })
  },

  [RESTART]({ commit, dispatch }) {
    commit('INITIALIZE')
    dispatch('modal/HIDE', 1, { root: true })
  },

  addHistoryRecord({ getters }, payload) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: payload
        })
      })
  },

  [ADD_WINNER]({ commit, getters }) {
    commit(ADD_WINNER, getters.turnPlayer)
  },

  [CHANGE_TURN_PLAYER]({ commit, getters }) {
    commit(CHANGE_TURN_PLAYER, getters.nextTurnPlayer)
  },

  [REGISTER_AS_PLAYER]({ commit }, payload) {
    commit('ADD_PLAYER', payload)
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
