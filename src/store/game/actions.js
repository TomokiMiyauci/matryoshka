import { firestoreAction } from 'vuexfire'
import {
  ADD_WINNER,
  RESTART,
  ASSESS_STATUS,
  END_OF_GAME,
  TIME_UP
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

// const timestamp = firebase.firestore.FieldValue.serverTimestamp()

// function generateInitValue(rows, cols) {
//   return {
//     history: [
//       {
//         squares: generateShallowMatrix(rows, cols)
//       }
//     ],
//     rows,
//     cols,
//     timestamp,
//     readyPlayers: ['PLAYER_1']
//   }
// }

// function generateShallowMatrix(row, col) {
//   const matrix = []
//   for (let r = 0; r < row; r++) {
//     for (let c = 0; c < col; c++) {
//       matrix.push({ row: r, col: c, value: null })
//     }
//   }
//   return matrix
// }

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
    const latestBoard = getters.willBeNextShallowBoard(payload)
    // console.log(' latestBoard', latestBoard)

    await dispatch('addHistoryRecord', latestBoard)
    await dispatch('TAKE_HOLDING_PIECE')
    dispatch('TAKE_SELECTING_PIECE')
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

  [ADD_WINNER]({ getters }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        winner: getters.latestPlayer
      })
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
      .set({ ...getters.generateInitValue })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  },

  SURRENDER({ commit, dispatch, getters, rootGetters }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        winner: rootGetters['player/opponent'],
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: getters.latestBoard,
          player: rootGetters['player/name']
        })
      })
    commit(ADD_WINNER, rootGetters['player/opponent'])
    dispatch('modal/SHOW', 1, { root: true })
  },

  async RANDOM_ACTION({ getters, dispatch }) {
    if (getters.cannotPlace) {
      return
    }
    const canPlacePeices = getters.canPlacePeices
    const index =
      canPlacePeices[Math.floor(Math.random() * canPlacePeices.length)]
    const latestBoard = getters.willBeNextBoard(index)
    await dispatch('addHistoryRecord', latestBoard)
  },

  [TIME_UP]({ dispatch }) {
    dispatch('RANDOM_ACTION')
  },

  ADD_SELECTING_PIECE({ commit }, payload) {
    commit('ADD_SELECTING_PIECE', payload)
  },

  TAKE_SELECTING_PIECE({ commit }) {
    commit('TAKE_SELECTING_PIECE')
  },

  TAKE_HOLDING_PIECE({ commit, getters }) {
    commit('TAKE_HOLDING_PIECE', getters.selectingPiece)
  }
}
